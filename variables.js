// Stream Fighters Variables
//----------------------------------

// Debug switch
var debug = false; 					// Set this to 'true' if you are testing the game.
var testUnits = false;				// Set this to 'true' to send some bot units at the start of the game. Useful for testing.
var numTestUnits = 5;				// Number of test units to put on each team.
var startWithFullSp = false;		// Start the test units with full SP.

// Streamer IDs
var streamerName = "Fridgecrisis";	// Enter your streamer name here.
var streamerID = 51966011;			// Enter your streamer ID here.
var botName = "RoboFridge";			// Enter your bot name here.
var botID = 188378914;				// Enter your bot ID here.

// Basics
var frameRate = 30; 				// Overall game speed. Expressed as number of frames per second. Default is 30.
var redStartX = 100; 				// Starting position of the red team's castle. Default is 100.
var blueStartX = 399; 				// Starting position of the blue team's castle. Default is 399.
var groundChunkWidth = 10;			// Width of the ground sprite being used. Default is 10.
var baseY = 50;						// Ground level. Default is 50.
var textColor = "#000000";			// Hex color for the game text. Default is "#000000".
var textStrokeColor = "#ffffff";	// Hex color for the outline around the game text. Default is "#ffffff".

// Payouts
var payoutsEnabled = true;			// Set this to 'true' if you want to give stream currency payouts via Streamlabs.
var payoutsVia = "bot whisper";		// How to handle payout commands. Options: "bot whisper" or "chat message". Default is "bot whisper".
var basePayout = 50;				// Basic payout amount before bounties are calculated. Default is 50.
var bountyIncrement = 0.5;			// Amount to increase a player's bounty by when they win. Default is 0.5.
var maxPayout = 100;				// Maximum point payout. Default is 200.
var minPayout = 10;					// Minimum point payout. Default is 10.
var losePayout = true;				// Enables the losing team to still receive a portion of their payouts.
var losePayMultiplier = 0.5;		// Multiplier to use on the losing team's payout. Default is 0.5.
var pointsName = "Tacobux";			// The name of your stream currency.

// Timers
var joinTime = 1000; 				// Number of frames to wait before starting the game. Default is 1000.
var winMessageDelay = 300;			// Number of frames to wait before sending the win message (so it syncs up with what viewers see). Default is 300.
var victoryTime = 500;				// Number of frames to wait after the game ends before it restarts. Default is 500.
var quarterTime = 120;				// Number of seconds in each quarter. Default is 120.

// Battle mechanics
var startCastleHp = 5; 				// Starting health of each team's castle. Default is 5.
var maxUnitsAlivePerTeam = 6;		// Maximum number of living units allowed on each team at once. Any extras will wait for a spot to open before spawning. Default is 6.
var engageFriendDistance = 17;		// Distance at which a unit will recognize a teammate and wait for them. Default is 17.
var engageEnemyDistance = 13;		// Distance at which a unit will recognize an enemy and start melee combat. Doesn't affect ranged combat. Default is 13.

// Respawning
var startRespawnTimer = 500;		// Starting number of frames a player needs to wait after dying before respawning. Default is 500.
var incrementRespawnTimer = 50;		// The number of frames a player's respawn timer will increase by every time they die. Default is 50.
var maxRespawnTimer = 10000;		// The longest a player's respawn timer can ever get. Default is 10000.

// Units, Actions, and Projectiles enabled
// A list of all the units, actions, and projectiles in your game.
var unitsEnabled = ["knight", "viking", "hoplite", "squire", "archer", "cornchip", "lamia", "slimegirl", "arachtaur", "bunny", "witch"];
var actionsEnabled = ["nothing", "castleattack", "attack", "magicattack", "block", "rush", "dodge", "devour"];
var projectilesEnabled = ["arrow", "bullet", "magic"];

