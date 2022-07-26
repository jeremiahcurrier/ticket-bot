module.exports.registerLab = function (app) {

	// Listens to reactions being added to any message, that the bot is invited to
	app.event('reaction_added', async ({ event, ack, client }) => {
		console.log(`lab2 Reaction added: `, event.reaction);

		try {
			if(event.reaction === 'admission_tickets') {
		  		// Post message in thread of the message being reacted to
		  		await client.chat.postMessage({
			        channel: event.item.channel,
			        thread_ts: event.item.ts,
			        text: `<@${event.user}> Thank you for successfully completing *lab 2* :two_hearts:`
	      		});
		  	}
		}
		catch(error) {
			console.log(error);
		}

	});
}
