module.exports.registerLab = function (app) {

    // Listen to the app_home_opened event, and when received, respond with a message including the user being messaged
    app.event('app_home_opened', async ({ event, client }) => {

        const today = new Date(Date.now())
        console.log(`lab6 App Home opened by ${event.user} on ${today.toUTCString()}`)
        console.log(`lab6 Event:`, event)

        const appHomeView = await client.views.publish({
            // User ID that tirggered the event
            user_id: event.user,
            view: {
            type: 'home',
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: ':wave: Hello, App Home !!'
                }
              },
              {
                type: 'context',
                elements: [
                  {
                    type: 'mrkdwn',
                    text: 'Opened on'
                  },
                  {
                    type: 'mrkdwn',
                    text: `*${today.toUTCString()}*`
                  }
                ]
              },
              {
                type: 'image',
                image_url: 'http://disneytimes.com/wp-content/uploads/2014/08/Aladdin-Genie-Applause.jpg',
                alt_text: 'robin-williams-forever'
              }
            ]
            }
        });
    });

}
