module.exports.registerLab = function (app) {

	// Listen to the slash command, and when received, respond with a ephemeral message including the user who tirgerred the command
	app.command('/hello-example', async ({ command, ack, payload, context, respond }) => {
	  // Acknowledge before doing anything
	  ack();
	  console.log(`lab1 Responding to `, payload.user_id);

	  respond(`:wave: Hello <@${payload.user_id}>! Great job completing *lab 1* :thumbsup:`);

	});
}
