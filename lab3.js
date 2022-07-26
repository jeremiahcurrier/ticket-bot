const axios = require('axios');

module.exports.registerLab = function (app) {

    // The echo command simply echoes on command
    app.command('/survey-example', async ({ command, ack, client, respond }) => {
        // Acknowledge command request
        ack();

        if (command.text === '') {
          console.log(`lab3 Missing text after command: `, command);
          respond({ text: 'Oops, you didn\'t provide a sub-command to your Slash command.' });

        } else {
        // Open a modal powered by Block Kit
        client.views.open({
          trigger_id: command.trigger_id,
          view: {
            // let's save response_url so we can call it in a few moments in the view_submission action handler
            private_metadata: command.response_url,
            type: 'modal',
            callback_id: 'survey-modal',
            title: {
              type: 'plain_text',
              text: `Survey ${command.text}`,
              emoji: true
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
                text: {
                  type: 'plain_text',
                  text: ':wave: Hello!\n\nWe\'d love to hear from you how we can make this place the best place you’ve ever worked.',
                  emoji: true
                }
              },
              {
                type: 'divider'
              },
              {
                block_id: 'enjoy_working',
                type: 'input',
                label: {
                  type: 'plain_text',
                  text: 'You enjoy working here at Acme & Co',
                  emoji: true
                },
                element: {
                  action_id: 'enjoy_working_action',
                  type: 'static_select',
                  placeholder: {
                    type: 'plain_text',
                    text: 'Select an item',
                    emoji: true
                  },
                  options: [
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Strongly Agree',
                        emoji: true
                      },
                      value: 'strongly-agree'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Agree',
                        emoji: true
                      },
                      value: 'agree'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Neither agree nor disagree',
                        emoji: true
                      },
                      value: 'neither-agree-nor-disagree'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Disagree',
                        emoji: true
                      },
                      value: 'disagree'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Strongly disagree',
                        emoji: true
                      },
                      value: 'strongly-disgree'
                    }
                  ]
                }
              },
              {
                block_id: 'lunch',
                type: 'input',
                label: {
                  type: 'plain_text',
                  text: 'What do you want for our team weekly lunch?',
                  emoji: true
                },
                element: {
                  action_id: 'lunch_action',
                  type: 'multi_static_select',
                  placeholder: {
                    type: 'plain_text',
                    text: 'Select your favorites',
                    emoji: true
                  },
                  options: [
                    {
                      text: {
                        type: 'plain_text',
                        text: ':pizza: Pizza',
                        emoji: true
                      },
                      value: 'pizza'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':fried_shrimp: Thai food',
                        emoji: true
                      },
                      value: 'thai-food'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':desert_island: Hawaiian',
                        emoji: true
                      },
                      value: 'hawaiian'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':meat_on_bone: Texas BBQ',
                        emoji: true
                      },
                      value: 'texas-bbq'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':hamburger: Burger',
                        emoji: true
                      },
                      value: 'burger'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':taco: Tacos',
                        emoji: true
                      },
                      value: 'tacos'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':green_salad: Salad',
                        emoji: true
                      },
                      value: 'salad'
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: ':stew: Indian',
                        emoji: true
                      },
                      value: 'indian'
                    }
                  ]
                }
              },
              {
                block_id: 'anything_else',
                type: 'input',
                label: {
                  type: 'plain_text',
                  text: 'Anything else you want to tell us?',
                  emoji: true
                },
                element: {
                  action_id: 'anything_else_action',
                  type: 'plain_text_input',
                  multiline: true
                },
                optional: false
              }
            ]
          }
        })
        }
    });

    app.view('survey-modal', async ({ view, ack, body }) => {
        // Acknowledge the view_submission event
        ack();

        // Process input
        console.log('lab3 body', body);
        const userResponsesRaw = view.state.values;

        const userResponses = {
            enjoy_working: userResponsesRaw.enjoy_working.enjoy_working_action.selected_option.value,
            lunch: userResponsesRaw.lunch.lunch_action.selected_options.map((c) => { return c.text.text }),
            anything_else: userResponsesRaw.anything_else.anything_else_action.value
        }
        console.log('lab3 User responses ===>\n', userResponses);

        // Send a message back to the conversation
        const message = `:wave: Thanks for filling out our survey, <@${body.user.id}>!\n:ear: We hear you loud and clear, you're interested in ${userResponses.lunch.join(' / ')} for lunch, OK!`

        // view.metadata has the value of our response_url webhook so that we can respond in the conversation the slash command was initiated in
        axios.post(view.private_metadata, { text: message });
    });
}
