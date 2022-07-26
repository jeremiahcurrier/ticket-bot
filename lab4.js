module.exports.registerLab = function (app) {

    // A slash command that shows an loading modal first
    app.command('/weather-example', async ({ command, ack, client }) => {
        ack();

        try {
            console.log('lab4 loadingModal ', command.user_id);

            // Open a loading modal
            const loadingView = await client.views.open({
              trigger_id: command.trigger_id,
              view: {
                type: 'modal',
                callback_id: 'weather_loading_view',
                private_metadata: '',
                type: 'modal',
                title: {
                  type: 'plain_text',
                  text: 'Loading modal'
                },
                close: {
                  type: 'plain_text',
                  text: 'Cancel',
                  emoji: true
                },
                blocks: [{
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: 'Please wait while we load...'
                }
                }]
              }
            });

            console.log('lab4 waiting 5 seconds');

            // -------------------------------------------------------
            // simulate a delay between views.open and views.update
            await new Promise(resolve => setTimeout(resolve, 2000));
            // -------------------------------------------------------

            console.log('lab4 updated weatherView');

            // Update the loading modal with weather input content
            const weatherView = await client.views.update({
            view_id: loadingView.view.id, // Pass view.id from the views.open response
            view: {
              private_metadata: command.channel_id,
              type: 'modal',
              // View identifier
              callback_id: 'weather_view',
              title: {
                type: 'plain_text',
                text: 'Weather'
              },
              submit: {
                type: 'plain_text',
                text: 'Submit',
                emoji: true
              },
              close: {
                  type: 'plain_text',
                  text: 'Cancel',
                  emoji: true
              },
              blocks: [
                {
                  type: 'section',
                  block_id: 'weather_block',
                  text: {
                    type: 'mrkdwn',
                    text: 'Which city would you like a weather report for? :sunny::snowman_without_snow::umbrella:'
                  },
                  accessory: {
                    type: 'external_select',
                    placeholder: {
                      type: 'plain_text',
                      text: 'Select an item'
                    },
                    action_id: 'choose_city',
                    min_query_length: 3
                  }
                }
              ]
            }
            });

        }
        catch (error) {
          console.error(error);
        }
    });

    // responds with options
    app.options({ action_id: 'choose_city' }, async ({ options, ack }) => {

      console.log('lab4 options value:', options.value);
      const results = [
        { label: 'New York City', value: 'NYC' },
        { label: 'London', value: 'LON' },
        { label: 'San Francisco', value: 'SF' }
      ]

      if (results) {
        const options = []

        // Collect information in options array to send in Slack ack response
        await results.forEach(result => {
          console.log(`lab4 result:`, result.label);

          options.push({
            text: {
              type: 'plain_text',
              text: result.label
            },
            value: result.value
          })
        });

        ack({
          options
        })
      } else {
          ack()
      }
    });

    // respond to external_select action
    app.action('choose_city', async ({ action, ack}) => {
        ack();
        console.log('lab4 action:', action);
    });

    // Process the view submission
    app.view('weather_view', async ({ view, ack, client}) => {
        ack();

        // Process input
        const selectedCity = view.state.values.weather_block.choose_city.selected_option.value
        console.log('lab4 User response ===> ', selectedCity);
        console.log('lab4 Posting in channel ===> ', view.private_metadata);

        if (selectedCity === 'NYC') {
        var responseText = `You selected the option *${view.state.values.weather_block.choose_city.selected_option.text.text}* --> _It's 80 degrees right now in New York!_`
        }
        else if (selectedCity === 'LON') {
        var responseText = `You selected the option *${view.state.values.weather_block.choose_city.selected_option.text.text}* --> _It's 60 degrees right now in London!_`
        }
        else if (selectedCity === 'SF') {
        var responseText = `You selected the option *${view.state.values.weather_block.choose_city.selected_option.text.text}* --> _It's 70 degrees right now in San Francisco!_`
        }

        try {
            await client.chat.postMessage({
              channel: view.private_metadata,
              text: responseText
            });
        }
        catch (error) {
            console.log(error);
        }

    });

}
