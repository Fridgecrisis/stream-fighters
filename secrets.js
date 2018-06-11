window.botClient = new chatClient({
	channel: '#' + streamerName.toLowerCase(),
	username: botName.toLowerCase(),
	password: "oauth:abc123", // Insert your BOT oauth token here.
	bot: true,
});

window.chatClient = new chatClient({
	channel: '#' + streamerName.toLowerCase(),
	username: streamerName.toLowerCase(),
	password: "oauth:def456", // Insert your STREAMER oauth token here.
	bot: false,
});