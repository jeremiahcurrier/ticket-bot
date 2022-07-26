module.exports.registerLab = function (app) {

    // Global Shortcut
    app.shortcut('global-shortcut-example', async ({ shortcut, ack, client }) => {
        ack()

        try {
            console.log(`lab5 Global shortcut:`, shortcut)

            // Open a modal
            const globalShortcutView = await client.views.open({
              trigger_id: shortcut.trigger_id,
              view: {
                type: 'modal',
                callback_id: 'global-shortcut-example',
                private_metadata: '',
                type: 'modal',
                title: {
                  type: 'plain_text',
                  text: 'Global Shortcut'
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
                    text: `<@${shortcut.user.id}> you have successfully completed *lab5* global shortcut :tada:`
                }
              }]
              }
            });

        }
        catch (error) {
            console.log(error)
        }
    });

    // Message Shortcut
    app.shortcut('message-shortcut-example', async ({ shortcut, ack, client }) => {
        ack()

        try {
            console.log(`lab5 Message shortcut:`, shortcut)

            // Open a modal, with the message text
            const messageShortcutView = await client.views.open({
              trigger_id: shortcut.trigger_id,
              view: {
                type: 'modal',
                callback_id: 'global-shortcut-example',
                private_metadata: '',
                type: 'modal',
                title: {
                  type: 'plain_text',
                  text: 'Message Shortcut'
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
                    text: `<@${shortcut.message.user}> said: ${shortcut.message.text} \n \n <@${shortcut.user.id}> you have successfully completed *lab5* message shortcut :tada:`
                }
              }]
              }
            });

        }
        catch (error) {
            console.log(error)
        }
    });

    // send_to_intercom
    // Message Shortcut
    app.shortcut('send_to_intercom', async ({ shortcut, ack, client }) => {
      ack()

      try {
          console.log(`SEND TO INTERCOM:`, shortcut)

          // Open a modal, with the message text
          const messageShortcutView = await client.views.open({
            trigger_id: shortcut.trigger_id,
            view: {
              type: 'modal',
              callback_id: 'send_to_intercom',
              private_metadata: '',
              type: 'modal',
              title: {
                type: 'plain_text',
                text: 'Send to Intercom'
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
                  text: `<@${shortcut.message.user}> said: ${shortcut.message.text} \n \n <@${shortcut.user.id}> you have successfully completed *lab5* message shortcut :tada:\nTEST: 1. MAKE API CALL TO INTERCOM AND THEN 2. EPHEMERAL TO USER WITH CONFIRMATION LINK`
              }
            }]
            }
          });

      }
      catch (error) {
          console.log(error)
      }
    });

    // $ curl https://api.intercom.io/conversations \
    // -X POST \
    // -H 'Authorization:Bearer <Your access token>' \
    // -H 'Accept: application/json' \
    // -H 'Content-Type: application/json' -d

    // {
    //   "from": {
    //     "type": "user",
    //     "id": "536e564f316c83104c000020"
    //   },
    //   "body": "Hey"
    // }

    // https://app.intercom.com/a/apps/dgkjq2bp/developer-hub/app-packages/84953/oauth
    // dG9rOjRjYmI0YThhX2E3NWZfNDk3Zl85YzliXzIyOGNlMTJmNzZkMzoxOjA=

}
