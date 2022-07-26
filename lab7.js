module.exports.registerLab = function (app) {
	// Listens to links being shared in any channel even if bot is not in channel
	
	/* test
	dm with bot; result = pass
	general channel; result = pass
	private channel no bot; result = pass
	private channel bot invited; result = pass; kicked? = pass
	*/
	
	app.event('link_shared', async ({ event, client }) => {
		console.log("got a link share event")
		
		const unfurls = {};
		await event.links.forEach(async (link) => {
		  let customText = `:wave: This is a custom unfurl of 
			 *url*=${link.url} *domain*=${link.domain}`;
		  unfurls[link.url] = {text: customText};
		});
		app.client.chat.unfurl({
		  token: process.env.SLACK_BOT_TOKEN,
		  channel: event.channel,
		  ts: event.message_ts,
		  unfurls: unfurls
		});

	});

}
