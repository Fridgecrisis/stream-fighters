// Stream Fighters! version 0.1
//----------------------------------

// Set up global game variables
var game;

// Start game! This stuff happens when the game is loaded.
function startGame() {
	loadGraphics();
	newGame();
	var frameRateMod = Math.floor(1000 / frameRate);
	var interval = setInterval("updateGame()", frameRateMod);
}

// New game! This sets up a new game.
function newGame() {
	game = new Game();
}

// Load graphics
function loadGraphics() {
	
	var img = document.createElement("img");
	img.id = "ground_center";
	img.src = "ground_center2.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "ground_end";
	img.src = "ground_end.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "shadow";
	img.src = "shadow.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "grass_small1";
	img.src = "grass_small1.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "grass_small2";
	img.src = "grass_small2.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "grass_big1";
	img.src = "grass_big1.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "grass_big2";
	img.src = "grass_big2.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "rock_small1";
	img.src = "rock_small1.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var poses = ["stand", "walk1", "walk2", "attack1", "attack2", "attack3", "attack4", "block1", "block2", "block3", "block4", "rush1", "rush2", "rush3", "rush4", "shoot1", "shoot2", "shoot3", "shoot4", "special1", "special2", "special3", "special4", "cheer1", "cheer2", "hurt"]
	for (var i = 0; i < unitsEnabled.length; i++) {
		for (var j = 0; j < 2; j++) {
			var color = (j == 0) ? "red" : "blue";
			for (var k = 0; k < poses.length; k++) {
				var img = document.createElement("img");
				img.id = unitsEnabled[i] + "_" + color + "_" + poses[k];
				img.src = "units/" + unitsEnabled[i] + "/" + unitsEnabled[i] + "_" + color + "_" + poses[k] + ".png";
				img.style.visibility = "hidden";
				document.body.appendChild(img);
			}
		}
	}
	for (var i = 0; i < projectilesEnabled.length; i++) {
		for (var j = 0; j < 2; j++) {
			var color = (j == 0) ? "red" : "blue";
			for (var k = 1; k < 5; k++) {
				var img = document.createElement("img");
				img.id = color + "_" + projectilesEnabled[i] + k;
				img.src = "projectiles/" + projectilesEnabled[i] + "/" + color + "_" + projectilesEnabled[i] + k + ".png";
				img.style.visibility = "hidden";
				document.body.appendChild(img);
			}
		}
	}
	for (var i = 1; i < 11; i++) {
		for (var j = 0; j < 2; j++) {
			var color = (j == 0) ? "red" : "blue";
			var img = document.createElement("img");
			img.id = color + "_flag" + i;
			img.src = "flags/" + color + "_flag" + i + ".png";
			img.style.visibility = "hidden";
			document.body.appendChild(img);
		}
	}
	
	var img = document.createElement("img");
	img.id = "red_gem";
	img.src = "red_gem.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "blue_gem";
	img.src = "blue_gem.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
	
	var img = document.createElement("img");
	img.id = "empty_gem";
	img.src = "empty_gem.png";
	img.style.visibility = "hidden";
	document.body.appendChild(img);
}

// Update game! This is called every frame.
function updateGame() {
	game.update();
	game.draw();
}

// This is the Game class!
class Game {
	
	constructor() {
		
		// Get the game canvas and the context
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		
		// Create castle variables and arrays for each team
		this.redCastle = new Castle(0);
		this.blueCastle = new Castle(1);
		this.redUnitsAlive = [];
		this.redUnitsTotal = [];
		this.blueUnitsAlive = [];
		this.blueUnitsTotal = [];
		this.effects = [];
		this.projectiles = [];
		this.terrain = [];
		
		// Quarter bonus stuff
		this.quarter = 0;
		this.quarterBonuses = [];
		this.redFlag = new Flag(0);
		this.blueFlag = new Flag(1);
		this.redTeamGround = 0;
		this.blueTeamGround = 0;
		
		// Create timers
		this.joinTimer = 0;
		this.readyTimer = 0;
		this.victoryTimer = 0;
		this.sentVictoryMessage = false;
		
		// Create UI sprites
		this.streamFighters = document.getElementById("streamFighters");
		this.joinTeam = document.getElementById("joinTeam");
		this.joinRed = document.getElementById("joinRed");
		this.joinBlue = document.getElementById("joinBlue");
		this.redWin = document.getElementById("redWin");
		this.blueWin = document.getElementById("blueWin");
		this.ready = document.getElementById("ready");
		this.set = document.getElementById("set");
		this.fight = document.getElementById("fight");
		
		// Unit Data and Action Data
		this.unitData = {};
		this.actionData = {};
		this.projectileData = {};
		var randnum = 15 + Math.floor(Math.random() * 20);
		for (var i = 0; i < randnum; i++) {
			if (Math.floor(Math.random() * 3) == 0) {
				this.terrain.push(new Grass());
			} else if (Math.floor(Math.random() * 3) == 1) {
				this.terrain.push(new Grass());
			} else if (Math.floor(Math.random() * 3) == 2) {
				this.terrain.push(new Rock());
			}
		}
		this.terrain.sort(function(a, b){return a.y - b.y});

		for (var i = 0; i < unitsEnabled.length; i++) {
			var script = document.createElement("script");
			script.src = "units/" + unitsEnabled[i] + "/" + unitsEnabled[i] + "_data.js";
			document.head.appendChild(script);
		}
		
		for (var i = 0; i < actionsEnabled.length; i++) {
			var script = document.createElement("script");
			script.src = "actions/" + actionsEnabled[i] + ".js";
			document.head.appendChild(script);
		}
		
		for (var i = 0; i < projectilesEnabled.length; i++) {
			var script = document.createElement("script");
			script.src = "projectiles/" + projectilesEnabled[i] + "/" + projectilesEnabled[i] + ".js";
			document.head.appendChild(script);
		}
		
	}

	// Updates the game object. Called every frame
	update() {
		
		// Spawn test units at the end of the join timer
		if (this.joinTimer == joinTime) {
			if (testUnits == true) {
				for (var i = 0; i < numTestUnits; i++) {
					this.addPlayer("test" + i, 0, unitsEnabled[Math.floor(Math.random() * unitsEnabled.length)], 1);
					this.addPlayer("test" + numTestUnits + i, 1, unitsEnabled[Math.floor(Math.random() * unitsEnabled.length)], 1);
					this.getUnit("test" + i).bot = true;
					this.getUnit("test" + numTestUnits + i).bot = true;
					if (startWithFullSp == true) {
						this.getUnit("test" + i).sp = 100;
						this.getUnit("test" + numTestUnits + i).sp = 100;
					}
				}
			}
			
			this.joinTimer += 1;
		}
		
		// Wait for join timer to expire
		if (this.joinTimer < joinTime) {
			this.joinTimer += 1;
			
		} else {
			
			// Check for castle death
			if ((this.redCastle.state != "dead") && (this.blueCastle.state != "dead")) {
			
				//Strengthen units over time
				this.elapsedTime = Math.round(new Date().getTime()/1000.0) - this.startTime;
				if (this.elapsedTime < quarterTime) {
					if (this.quarter == 0) {
						// this.enterNewQuarter();   // Doesn't run for first quarter
						this.quarter = 1;
					}
				}
				if ((this.elapsedTime >= quarterTime) && (this.elapsedTime < quarterTime * 2)) {
					if (this.quarter == 1) {
						this.enterNewQuarter();
						this.quarter = 2;
					}
				}
				if ((this.elapsedTime >= quarterTime * 2) && (this.elapsedTime < quarterTime * 3)) {
					if (this.quarter == 2) {
						this.enterNewQuarter();
						this.quarter = 3;
					}
				}
				if ((this.elapsedTime >= quarterTime * 3) && (this.elapsedTime < quarterTime * 4)) {
					if (this.quarter == 3) {
						this.enterNewQuarter();
						this.quarter = 4;
					}
				}
				if (this.elapsedTime >= quarterTime * 4) {
					if (this.quarter == 4) {
						this.enterNewQuarter();
						this.quarter = 5;
					}
				}
			
				// Tell the units to update themselves.
				for (var i = 0; i < this.redUnitsTotal.length; i++) {
					this.redUnitsTotal[i].update();
				}
				for (var i = 0; i < this.blueUnitsTotal.length; i++) {
					this.blueUnitsTotal[i].update();
				}
				
				// Update castles
				this.redCastle.update();
				this.blueCastle.update();
				
				// Update flags
				this.redFlag.update();
				this.blueFlag.update();
			
			} else {
				
				if ((this.victoryTimer == winMessageDelay) && (this.sentVictoryMessage == false)) {
					if (this.winner() == "blue") {
						this.payout(1);
					}
					if (this.winner() == "red") {
						this.payout(0);
					}
					// These two lines shouldn't be necessary, but they may help prevent the win message spam
					this.sentVictoryMessage = true;
					this.victoryTimer += 1;
				}
				
				// Handle victory
				if (this.victoryTimer >= victoryTime) {
					// Restart
					location.reload();
				}
				
				// Increment the victory timer.
				this.victoryTimer += 1;
			}
		}
		
		// Update effects
		for (var i = 0; i < this.effects.length; i++) {
			this.effects[i].update();
		}
		
		// Update projectiles
		for (var i = 0; i < this.projectiles.length; i++) {
			this.projectiles[i].update();
		}
		
		// Update terrain
		for (var i = 0; i < this.terrain.length; i++) {
			this.terrain[i].update();
		}
	}
	
	// Draw the game. Called every frame
	draw() {
		// Clear the canvas
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		
		// Set font
		this.ctx.font = "5px Pixelfriends";
		
		// Draw flags
		this.redFlag.draw();
		this.blueFlag.draw();
		
		// Draw the ground
		//this.ctx.drawImage(document.getElementById("ground"), 0, baseY + 13);
		var castleDistance = blueStartX - redStartX;
		var fieldLength = castleDistance + 60;
		var drawnFromLeft = redStartX - 31;
		this.ctx.drawImage(document.getElementById("ground_end"), drawnFromLeft, baseY + 13);
		drawnFromLeft += 1;
		for (var i = 0; i < fieldLength / groundChunkWidth; i++) {
			this.ctx.drawImage(document.getElementById("ground_center"), drawnFromLeft, baseY + 13);
			drawnFromLeft += document.getElementById("ground_center").width;
		}
		this.ctx.drawImage(document.getElementById("ground_end"), drawnFromLeft, baseY + 13);
		
		// Draw back terrain
		for (var i = 0; i < this.terrain.length; i++) {
			if (this.terrain[i].layer == "back") {
				this.terrain[i].draw();
			}
		}
		
		// Tell castles to draw their tower and back sprites
		this.redCastle.drawTower();
		this.blueCastle.drawTower();
		this.redCastle.drawBack();
		this.blueCastle.drawBack();
		
		// Loop through units and tell each to draw itself
		for (var i = 0; i < this.redUnitsAlive.length; i++) {
			this.redUnitsAlive[i].draw();
		}
		for (var i = 0; i < this.blueUnitsAlive.length; i++) {
			this.blueUnitsAlive[i].draw();
		}
		
		// Tell castles to draw their front sprites
		this.redCastle.drawFront();
		this.blueCastle.drawFront();
		
		// Draw timer
		this.drawTimer();
		
		// Draw UI sprites during the join timer
		if (this.joinTimer < (joinTime - 100)) {
			this.ctx.drawImage(this.streamFighters, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.streamFighters.width / 2)), 15);
			this.ctx.drawImage(this.joinTeam, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.joinTeam.width / 2)), 40);
			this.ctx.drawImage(this.joinRed, (redStartX - (this.joinRed.width / 2)), 40);
			this.ctx.drawImage(this.joinBlue, (blueStartX - (this.joinBlue.width / 2)), 40);
		} else if (this.joinTimer < (joinTime - 66)) {
			this.ctx.drawImage(this.ready, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.ready.width / 2)), 30);
		} else if (this.joinTimer < (joinTime - 33)) {
			this.ctx.drawImage(this.set, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.set.width / 2)), 30);
		} else if (this.joinTimer < (joinTime)) {
			this.ctx.drawImage(this.fight, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.fight.width / 2)), 27);
		}
		
		// Draw victory message if a castle is dead
		if (this.blueCastle.state == "dead") {
			this.ctx.drawImage(this.redWin, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.redWin.width / 2)), 20);
		} else if (this.redCastle.state == "dead") {
			this.ctx.drawImage(this.blueWin, Math.floor(((blueStartX - redStartX) / 2) + redStartX - (this.blueWin.width / 2)), 20);
		}
		
		// Draw payouts
		this.ctx.fillStyle = textColor;
		this.ctx.fillText("Red Team Payout: " + this.determinePayout("red").toString(), redStartX - 45, baseY + 37);
		this.ctx.fillText("Blue Team Payout: " + this.determinePayout("blue").toString(), blueStartX - 35, baseY + 37);
		
		// Draw projectiles
		for (var i = 0; i < this.projectiles.length; i++) {
			this.projectiles[i].draw();
		}
		
		// Draw effects
		for (var i = 0; i < this.effects.length; i++) {
			this.effects[i].draw();
		}
		
		// Draw front terrain
		for (var i = 0; i < this.terrain.length; i++) {
			if (this.terrain[i].layer == "front") {
				this.terrain[i].draw();
			}
		}
	}
	
	// Draws the game timer
	drawTimer() {
		var minutes = Math.floor(this.elapsedTime / 60);
		var seconds = this.elapsedTime % 60;
		if (!minutes) {
			minutes = 0;
		}
		if (!seconds) {
			seconds = 0;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		this.ctx.strokeStyle = textStrokeColor;
		this.ctx.lineWidth = 1;
		this.ctx.strokeText(minutes + ":" + seconds, Math.floor((redStartX + blueStartX) / 2) - 9, baseY - 26);
		this.ctx.fillStyle = textColor;
		this.ctx.strokeStyle = "none";
		this.ctx.lineWidth = 0;
		this.ctx.fillText(minutes + ":" + seconds, Math.floor((redStartX + blueStartX) / 2) - 9, baseY - 26);
	}
	
	// Checks to see if a certain player is already playing
	alreadyPlaying(arg1) {
		// arg1 = username
		for (var i = 0; i < this.redUnitsTotal.length; i++) {
			if (this.redUnitsTotal[i].name == arg1) {
				return true;
			}
		}
		for (var i = 0; i < this.blueUnitsTotal.length; i++) {
			if (this.blueUnitsTotal[i].name == arg1) {
				return true;
			}
		}
		return false;
	}
	
	// Returns a unit object based on a username. Returns false if the player is not playing
	getUnit(arg1) {
		// arg1 = username
		for (var i = 0; i < this.redUnitsTotal.length; i++) {
			if (this.redUnitsTotal[i].name == arg1) {
				return this.redUnitsTotal[i];
			}
		}
		for (var i = 0; i < this.blueUnitsTotal.length; i++) {
			if (this.blueUnitsTotal[i].name == arg1) {
				return this.blueUnitsTotal[i];
			}
		}
		return false;
	}
	
	// Adds a specified player to the game
	addPlayer(arg1, arg2, arg3, arg4) {
		// arg1 = name, arg2 = team, arg3 = unit type, arg4 = bounty
		this.startTimer();
		var unit = new Unit(arg1, arg2, arg3, arg4);
		if (arg2 == 0) {
			this.redUnitsTotal.push(unit);
		} else if (arg2 == 1) {
			this.blueUnitsTotal.push(unit);
		}
	}

	// Start game timer if first player spawns
	startTimer() {
		if (this.redUnitsTotal.length === 0 && this.blueUnitsTotal.length === 0) {
			this.startTime = Math.round(new Date().getTime()/1000.0);
			this.elapsedTime = 0;
		}
	}
	
	// Returns just the human players
	humanPlayers(arg1) {
		// arg1 = team
		var results = [];
		if (arg1 == 0) {
			for (var i = 0; i < this.redUnitsTotal.length; i++) {
				if (this.redUnitsTotal[i].bot == false) {
					results.push(this.redUnitsTotal[i]);
				}
			}
		} else if (arg1 == 1) {
			for (var i = 0; i < this.blueUnitsTotal.length; i++) {
				if (this.blueUnitsTotal[i].bot == false) {
					results.push(this.blueUnitsTotal[i]);
				}
			}
		}
		return results;
	}
	
	// Checks to see if the teams need to be balanced
	teamNeedsHelp(arg1) {
		//arg1 = team to check on
		if (arg1 == 1 && (this.redUnitsTotal.length > (this.blueUnitsTotal.length) + 0)) {
			return true;
		} else if (arg1 == 0 && (this.blueUnitsTotal.length > (this.redUnitsTotal.length) + 0)) {
			return true;
		}
		return false;
	}
	
	// Adds extra bot units if the teams are too unbalanced
	balanceTeams() {
		if (this.teamNeedsHelp(1) == true) {
			var new_unit = new Unit("bot", 1, "squire", 1);
			this.blueUnitsTotal.push(new_unit);
			new_unit.bot = true;
			new_unit.fillerUnit = true;
		} else if (this.teamNeedsHelp(0) == true) {
			var new_unit = new Unit("bot", 0, "squire", 1);
			this.redUnitsTotal.push(new_unit);
			new_unit.bot = true;
			new_unit.fillerUnit = true;
		}
	}
	
	// Spawns a unit onto the map
	spawnPlayer(arg1) {
		// arg1 = unit
		if (arg1.team == 0) {
			arg1.x = redStartX;
			arg1.setStats();
			this.redUnitsAlive.push(arg1);
		} else if (arg1.team == 1) {
			arg1.x = blueStartX;
			arg1.setStats();
			this.blueUnitsAlive.push(arg1);
		}
		this.balanceTeams();
		this.collectStats(arg1, arg1, "spawn", 1);
	}
	
	// Tells a unit if they're going first or not
	determineFirst() {
		for (var i = 0; i < this.redUnitsTotal.length; i++) {
			var unit = this.redUnitsTotal[i];
			var target = unit.target;
			if (unit != undefined && target != undefined) {
				if (unit.nextAction != "nothing" && target.nextAction != "nothing") {
					var unitPriority = this.actionData[unit.nextAction].priority;
					var targetPriority = this.actionData[target.nextAction].priority;
					if (unit.initiative == true) {
						unitPriority += 1;
					}
					if (target.initiative == true) {
						targetPriority += 1;
					}
					if (unitPriority > targetPriority) {
						unit.goFirst = true;
						target.goFirst = false;
					} else if (unitPriority < targetPriority) {
						unit.goFirst = false;
						target.goFirst = true;
					} else if (unitPriority == targetPriority) {
						var unitSpeed = unit.speed;
						var targetSpeed = target.speed;
						if (unitSpeed > targetSpeed) {
							unit.goFirst = true;
							target.goFirst = false;
						} else if (unitSpeed < targetSpeed) {
							unit.goFirst = false;
							target.goFirst = true;
						} else if (unitSpeed == targetSpeed) {
							if (Math.floor(Math.random() + 0.5) == 0) {
								unit.goFirst = true;
								target.goFirst = false;
							} else {
								unit.goFirst = false;
								target.goFirst = true;
							}
						}
					}
					
					if (target.type == "castle") {
						unit.goFirst = false;
					}
				} else {
				}
			}
		}
	}
	
	// Removed a dead player from their team's alive list
	removeDeadPlayer (arg1) {
		// arg1 = unit
		if (arg1.team == 0) {
			var index = this.redUnitsAlive.indexOf(arg1);
			if (index > -1) {
				this.redUnitsAlive.splice(index, 1);
			}
		}
		if (arg1.team == 1) {
			var index = this.blueUnitsAlive.indexOf(arg1);
			if (index > -1) {
				this.blueUnitsAlive.splice(index, 1);
			}
		}
	}
	
	// Remove a dead player from the entire game
	removePlayerFromGame(arg1) {
		// arg1 = unit
		if (arg1.team == 0) {
			var index = this.redUnitsAlive.indexOf(arg1);
			if (index > -1) {
				this.redUnitsAlive.splice(index, 1);
			}
			var index = this.redUnitsTotal.indexOf(arg1);
			if (index > -1) {
				this.redUnitsTotal.splice(index, 1);
			}
		}
		if (arg1.team == 1) {
			var index = this.blueUnitsAlive.indexOf(arg1);
			if (index > -1) {
				this.blueUnitsAlive.splice(index, 1);
			}
			var index = this.blueUnitsTotal.indexOf(arg1);
			if (index > -1) {
				this.blueUnitsTotal.splice(index, 1);
			}
		}
	}
	
	// Determine the winning team (returns "red", "blue", or "none")
	winner() {
		if (this.redCastle.state == "dead") {
			return "blue";
		} else if (this.blueCastle.state == "dead") {
			return "red";
		} else {
			return "none";
		}
	}
	
	// Return the bounty of a specific player. This is for displaying in the !bounty command only, since it's rounded
	getBounty(arg1) {
		//arg1 = player name
		return this.precisionRound(localStorage.getItem(arg1 + '_bounty'), 1);
	}
	
	// A rounding function to use for getBounty
	precisionRound(number, precision) {
		var factor = Math.pow(10, precision);
		return Math.round(number * factor) / factor;
	}
	
	// Determines the payout amount for the specified team
	determinePayout(arg1) {
		//arg1 = winner
		
		var avg_red_bounty = 1;
		var avg_blue_bounty = 1;
		var bounty_difference = 0;
		var result = 0;
		
		for (var i = 0; i < this.humanPlayers(0).length; i++) {
			avg_red_bounty += parseFloat(this.humanPlayers(0)[i].bounty);
		}
		avg_red_bounty /= this.humanPlayers(0).length + 1;
		
		for (var i = 0; i < this.humanPlayers(1).length; i++) {
			avg_blue_bounty += parseFloat(this.humanPlayers(1)[i].bounty);
		}
		avg_blue_bounty /= this.humanPlayers(1).length + 1;
		
		if (arg1 === "red") {
			result = Math.max(Math.min(Math.floor(basePayout * avg_blue_bounty), maxPayout), minPayout);
			if (this.humanPlayers(1).length == 0) {
				result = minPayout;
			}
		} else if (arg1 === "blue") {
			result = Math.max(Math.min(Math.floor(basePayout * avg_red_bounty), maxPayout), minPayout);
			if (this.humanPlayers(0).length == 0) {
				result = minPayout;
			}
		} else {
			result = basePayout;
		}
		
		if (this.winner() == "red" && arg1 == "blue") {
			result = Math.max(Math.min(Math.floor(result * losePayMultiplier), maxPayout), minPayout);
		}
		
		if (this.winner() == "blue" && arg1 == "red") {
			result = Math.max(Math.min(Math.floor(result * losePayMultiplier), maxPayout), minPayout);
		}
		
		if (result.toString() === "NaN") {
			return 10;
		} else {
			return result;
		}
	}
	
	// Pays out stream currency to the winning team
	payout(arg1) {
		//arg1 = winning team
		
		if (arg1 == 0) {
			botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :The blue team\'s castle has been destroyed. Red team wins! Payout: ' + this.determinePayout("red").toString() + ' ' + pointsName);
			for (var i = 0; i < this.redUnitsTotal.length; i++) {
				if (this.redUnitsTotal[i].bot == true) {
				} else {
					if (debug == false && payoutsEnabled == true) {
						if (payoutsVia == "bot whisper") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :/w ' + botName.toLowerCase() + ' !victory ' + this.redUnitsTotal[i].name + ' ' + this.determinePayout("red").toString());
						} else if (payoutsVia == "chat message") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :!victory ' + this.redUnitsTotal[i].name + ' ' + this.determinePayout("red").toString());
						}
					}
					var new_bounty = parseFloat(localStorage.getItem(this.redUnitsTotal[i].name + '_bounty'));
					new_bounty += bountyIncrement;
					localStorage.setItem(this.redUnitsTotal[i].name + '_bounty', new_bounty);
				}
			}
			for (var i = 0; i < this.blueUnitsTotal.length; i++) {
				if (this.blueUnitsTotal[i].bot == true) {
				} else {
					if (debug == false && payoutsEnabled == true && losePayout == true) {
						if (payoutsVia == "bot whisper") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :/w ' + botName.toLowerCase() + ' !victory ' + this.blueUnitsTotal[i].name + ' ' + this.determinePayout("blue").toString());
						} else if (payoutsVia == "chat message") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :!victory ' + this.blueUnitsTotal[i].name + ' ' + this.determinePayout("blue").toString());
						}
					}
					var new_bounty = parseFloat(localStorage.getItem(this.blueUnitsTotal[i].name + '_bounty'));
					new_bounty == 1.0;
					localStorage.setItem(this.blueUnitsTotal[i].name + '_bounty', new_bounty);
				}
			}
		}
		if (arg1 == 1) {
			botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :The red team\'s castle has been destroyed. Blue team wins! Payout: ' + this.determinePayout("blue").toString() + ' ' + pointsName);
			for (var i = 0; i < this.blueUnitsTotal.length; i++) {
				if (this.blueUnitsTotal[i].bot == true) {
				} else {
					if (debug == false && payoutsEnabled == true) {
						if (payoutsVia == "bot whisper") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :/w ' + botName.toLowerCase() + ' !victory ' + this.blueUnitsTotal[i].name + ' ' + this.determinePayout("blue").toString());
						} else if (payoutsVia == "chat message") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :!victory ' + this.blueUnitsTotal[i].name + ' ' + this.determinePayout("blue").toString());
						}
					}
					var new_bounty = parseFloat(localStorage.getItem(this.blueUnitsTotal[i].name + '_bounty'));
					new_bounty += bountyIncrement;
					localStorage.setItem(this.blueUnitsTotal[i].name + '_bounty', new_bounty);
				}
			}
			for (var i = 0; i < this.redUnitsTotal.length; i++) {
				if (this.redUnitsTotal[i].bot == true) {
				} else {
					if (debug == false && payoutsEnabled == true && losePayout == true) {
						if (payoutsVia == "bot whisper") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :/w ' + botName.toLowerCase() + ' !victory ' + this.redUnitsTotal[i].name + ' ' + this.determinePayout("red").toString());
						} else if (payoutsVia == "chat message") {
							chatClient.webSocket.send('@badges=moderator/1;color=;display-name=' + streamerName.toLowerCase() + ';emotes=;id=' + this.uuidv4() + ';mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + this.startTime + ';turbo=1;user-id=' + streamerID + ';user-type=mod:' + streamerName.toLowerCase() + '!' + streamerName.toLowerCase() + '@' + streamerName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :!victory ' + this.redUnitsTotal[i].name + ' ' + this.determinePayout("red").toString());
						}
					}
					var new_bounty = parseFloat(localStorage.getItem(this.redUnitsTotal[i].name + '_bounty'));
					new_bounty == 1.0;
					localStorage.setItem(this.redUnitsTotal[i].name + '_bounty', new_bounty);
				}
			}
		}
		
		// Shouldn't be necessary, but may help stop the victory spam.
		this.sentVictoryMessage = true;
	}
	
	// Runs at the start of each new quarter
	enterNewQuarter() {
		if (this.redTeamGround > this.blueTeamGround) {
			this.quarterBonuses.push(0);
			this.redFlag.reset();
		} else if (this.blueTeamGround > this.redTeamGround) {
			this.quarterBonuses.push(1);
			this.blueFlag.reset();
		} else if (this.redTeamGround == this.blueTeamGround) {
			var redTeamBonuses = 0;
			var blueTeamBonuses = 0;
			for (var i = 0; i < this.quarterBonuses.length; i++) {
				if (this.quarterBonuses[i] === 0) {
					redTeamBonuses++;
				} else if (this.quarterBonuses[i] === 1) {
					blueTeamBonuses++;
				}
			}
			if (redTeamBonuses > blueTeamBonuses) {
				this.quarterBonuses.push(1);
				this.blueFlag.reset();
			} else if (blueTeamBonuses > redTeamBonuses) {
				this.quarterBonuses.push(0);
				this.redFlag.reset();
			} else if (redTeamBonuses === blueTeamBonuses) {
				var randnum = Math.floor((Math.random()) * 2);
				if (randnum === 0) {				
					this.quarterBonuses.push(0);
					this.redFlag.reset();
				} else {
					this.quarterBonuses.push(1);
					this.blueFlag.reset();
				}
			}
		}
		
		
	}
	
	// Generate unique UUIDs for messages? Is this important???
	uuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	  });
	}
	
	// A debug function that fires on click. Add alerts here
	checkStatus() {
		
	}
	
	collectStats(arg1, arg2, arg3, arg4) {
		// arg1 = unit, arg2 = unit's target, arg3 = stat type, arg4 = stat amount
		var existing_amount = parseInt(localStorage.getItem("STAT_" + arg1.type + "_to_" + arg2.type + "_" + arg3));
		if (existing_amount.toString() === "NaN") {
			existing_amount = 0;
		}
		localStorage.setItem("STAT_" + arg1.type + "_to_" + arg2.type + "_" + arg3, existing_amount + arg4);
	}
	
	resetStats() {
		for (var i = 0; i < unitsEnabled.length; i++) {
			for (var j = 0; j < unitsEnabled.length; j++) {
				localStorage.setItem("STAT_" + unitsEnabled[i] + "_to_" + unitsEnabled[j] + "_damage", 0);
				localStorage.setItem("STAT_" + unitsEnabled[i] + "_to_" + unitsEnabled[j] + "_death", 0);
			}
			localStorage.setItem("STAT_" + unitsEnabled[i] + "_to_" + unitsEnabled[i] + "_spawn", 0);
			localStorage.setItem("STAT_" + unitsEnabled[i] + "_to_castle_damage", 0);
		}
	}
	
}

class Unit {
	
	// arg1 = name, arg2 = team, arg3 = type of unit, arg4 = bounty
	constructor(arg1, arg2, arg3, arg4) {
		
		// Assign variables based on arguments
		this.name = arg1;
		this.team = arg2;
		this.type = arg3;
		this.nextUnitType = arg3;
		this.bounty = arg4;
		
		// Set stats to default values
		this.setStats();
		
		this.nextAction = "nothing";
		this.goFirst = false;
		this.target;
		this.blocking = false;
		this.dodging = false;
		this.timesDied = 0;
		this.respawnTimer = startRespawnTimer;
		this.walkTimer = 0;
		this.animationTimer = 0;
		this.dyingTimer = 0;
		this.superGlowTimer = 0;
		this.superTimer = 0;
		this.rangedAttackTimer = 0;
		this.superOn = false;
		this.knockbackForce = 0;
		this.engaged = false;
		this.damaged_timer = 0;
		this.showDeath = true;
		if (this.team == 0) {
			this.x = redStartX;
		} else if (this.team == 1) {
			this.x = blueStartX;
		}
		this.state = "waiting for spawn";
		this.animationState = "waiting for spawn";
		this.sprite = document.getElementById("knightRedStand");
		this.healthBarSprite = document.getElementById("healthBar");
		this.shadowSprite = document.getElementById("shadow");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.alpha = 1.0;
		this.y = baseY;
		this.bot = false;
		this.fillerUnit = false;
		
		this.speechBubbleActive = false;
		this.speechBubble = new SpeechBubble(this);
		
		this.sp = 0;
	}
	
	// Set stats based on unit type
	setStats() {
		
		if (this.nextUnitType != "same") {
			this.type = this.nextUnitType;
			this.nextUnitType = "same";
		}
		
		this.spriteBase = this.type;
		this.maxHp = game.unitData[this.type].hp;
		this.hp = this.maxHp;
		this.baseRegen = game.unitData[this.type].regen;
		this.baseSpMultiplier = game.unitData[this.type].spMultiplier;
		this.baseMeleePower = game.unitData[this.type].meleePower;
		this.baseRangedPower = game.unitData[this.type].rangedPower;
		this.basePhysicalPower = game.unitData[this.type].physicalPower;
		this.baseMagicPower = game.unitData[this.type].magicPower;
		this.basePierce = game.unitData[this.type].pierce;
		this.baseDrain = game.unitData[this.type].drain;
		this.baseMeleeDefense = game.unitData[this.type].meleeDefense;
		this.baseRangedDefense = game.unitData[this.type].rangedDefense;
		this.basePhysicalDefense = game.unitData[this.type].physicalDefense;
		this.baseMagicDefense = game.unitData[this.type].magicDefense;
		this.baseSpikes = game.unitData[this.type].spikes;
		this.baseSpeed = game.unitData[this.type].speed;
		this.baseForce = game.unitData[this.type].force;
		this.baseWeight = game.unitData[this.type].weight;
		this.baseIntelligence = game.unitData[this.type].intelligence;
		this.baseActions = game.unitData[this.type].actions;
		this.baseActionChances = game.unitData[this.type].actionChances;
		this.attackAction = game.unitData[this.type].attackAction;
		this.baseAttackChance = game.unitData[this.type].attackChance;
		this.blockAction = game.unitData[this.type].blockAction;
		this.baseBlockChance = game.unitData[this.type].blockChance;
		this.rushAction = game.unitData[this.type].rushAction;
		this.baseRushChance = game.unitData[this.type].rushChance;
		this.baseAttackType = game.unitData[this.type].attackType;
		this.baseRangedAttack = game.unitData[this.type].rangedAttack;
		this.baseRangedAttackRate = game.unitData[this.type].rangedAttackRate;
		this.baseRangedActions = game.unitData[this.type].rangedActions;
		this.baseRangedActionChances = game.unitData[this.type].rangedActionChances;
		this.baseWrecker = game.unitData[this.type].wrecker;
		this.baseRaider = game.unitData[this.type].raider;
		this.baseDefender = game.unitData[this.type].defender;
		this.baseInitiative = game.unitData[this.type].initiative;
		this.baseSuperType = game.unitData[this.type].superType;
	}
	
	// Updates unit processing every frame. This is where a lot of the meat goes
	update() {
		
		// Set stats to base values
		this.regen = this.baseRegen;
		this.spMultiplier = this.baseSpMultiplier;
		this.meleePower = this.baseMeleePower;
		this.rangedPower = this.baseRangedPower;
		this.physicalPower = this.basePhysicalPower;
		this.magicPower = this.baseMagicPower;
		this.pierce = this.basePierce;
		this.drain = this.baseDrain;
		this.meleeDefense = this.baseMeleeDefense;
		this.rangedDefense = this.baseRangedDefense;
		this.physicalDefense = this.basePhysicalDefense;
		this.magicDefense = this.baseMagicDefense;
		this.spikes = this.baseSpikes;
		this.speed = this.baseSpeed;
		this.force = this.baseForce;
		this.weight = this.baseWeight;
		this.intelligence = this.baseIntelligence;
		this.actions = this.baseActions;
		this.actionChances = this.baseActionChances;
		this.attackChance = this.baseAttackChance;
		this.blockChance = this.baseBlockChance;
		this.rushChance = this.baseRushChance;
		this.attackType = this.baseAttackType;
		this.rangedAttack = this.baseRangedAttack;
		this.rangedAttackRate = this.baseRangedAttackRate;
		this.rangedActions = this.baseRangedActions;
		this.rangedActionChances = this.baseRangedActionChances;
		this.wrecker = this.baseWrecker;
		this.raider = this.baseRaider;
		this.defender = this.baseDefender;
		this.initiative = this.baseInitiative;
		this.superType = this.baseSuperType;
		
		//Bots use their supers
		if (this.bot == true && this.state != "dead" && this.state != "dying" && this.detectUnit() != false) {
			if (this.detectUnit().team != this.team) {
				this.activateSuper();
			}
		}
		
		// Add super effects if they're active
		if (this.superOn == true) {
			
			// Execute the super code
			game.unitData[this.type].superData(this);
			
			// Increment the super timer
			if (this.superType == "time") {
				this.superTimer += 1;
			}
			
			// Check to see if the super should end
			if (this.superTimer >= game.unitData[this.type].superLength && this.superType == "time") {
				this.deactivateSuper();
			}
		}
		
		// Regenerate HP
		this.healHp(this.regen);
		
		// Check for the Defender trait
		if (this.defender == true) {
			if (this.team == 0){
				if (this.x < ((redStartX + blueStartX) / 2)) {
					this.meleeDefense += 1;
					this.speed += 1;
				}
			} else if (this.team == 1) {
				if (this.x > ((redStartX + blueStartX) / 2)) {
					this.meleeDefense += 1;
					this.speed += 1;
				}
			}
		}
		
		// Check for the Raider trait
		if (this.raider == true) {
			if (this.team == 0){
				if (this.x > ((redStartX + blueStartX) / 2)) {
					this.meleePower += 2;
					this.speed += 1;
				}
			} else if (this.team == 1) {
				if (this.x < ((redStartX + blueStartX) / 2)) {
					this.meleePower += 2;
					this.speed += 1;
				}
			}
		}
		
		// Apply quarter bonuses
		this.applyQuarterBonuses();
		
		// Apply flag bonus
		this.applyFlagBonus();
		
		// Apply extra defense if blocking
		if (this.blocking == true) {
			this.meleeDefense *= 2;
			this.rangedDefense *= 2;
			this.physicalDefense *= 2;
			this.magicDefense *= 2;
		}
		
		// Round up stats
		this.meleePower = Math.ceil(this.meleePower);
		this.rangedPower = Math.ceil(this.rangedPower);
		this.physicalPower = Math.ceil(this.physicalPower);
		this.magicPower = Math.ceil(this.magicPower);
		this.pierce = Math.ceil(this.pierce);
		this.drain = Math.ceil(this.drain);
		this.meleeDefense = Math.ceil(this.meleeDefense);
		this.rangedDefense = Math.ceil(this.rangedDefense);
		this.physicalDefense = Math.ceil(this.physicalDefense);
		this.magicDefense = Math.ceil(this.magicDefense);
		this.spikes = Math.ceil(this.spikes);
		this.speed = Math.ceil(this.speed);
		this.force = Math.ceil(this.force);
		this.weight = Math.ceil(this.weight);
		
		// Unit should be dead if they have 0 HP and they're not already dying
		if (this.hp <= 0 && this.state != "dying") {
			this.setState("dead");
		}
		
		// Detect friends and foes
		if ((this.state != "dead") && (this.state != "waiting for spawn") && (this.state != "fighting")  && (this.state != "knockback") && (this.state != "dying") && (this.state != "special")) {	
			var detectedUnit = this.detectUnit();
			if (detectedUnit != false) {
				if (detectedUnit.team == this.team) {
					// They're my friend.
					if (this.state != "shoot") {
						this.setState("waiting");
					}
				} else if (detectedUnit.team != this.team) {
					// They're an enemy. Fight!
					this.target = detectedUnit;
					this.target.target = this;
					if (this.engaged == false) {
						this.engage();
					}
					if (this.target.engaged == false) {
						this.target.engage();
					}
					this.setState("fighting");
					this.target.setState("fighting");
				}
			} else if (detectedUnit == false) {
				// Set this unit's engaged flag to off if it wasn't already.
				if (this.engaged == true) {
					this.disengage();
				}
				if (this.state == "waiting") {
					this.setState("walking");
				}
			}
			this.pushEnemyFlag();
		}
		
		// Ranged attacks
		if (this.rangedAttack == true) {
			if (this.state == "walking" || this.state == "waiting") {
				if (this.rangedAttackTimer >= this.rangedAttackRate) {
					if (this.team == 0) {
						if (game.blueUnitsAlive.length > 0) {
							this.setState("shoot");
							this.rangedAttackTimer = -1;
							this.animationTimer = -1;
						}
					} else if (this.team == 1) {
						if (game.redUnitsAlive.length > 0) {
							this.setState("shoot");
							this.rangedAttackTimer = -1;
							this.animationTimer = -1;
						}
					}
				}
				this.rangedAttackTimer += 1;
			}
		}
		
		// Do different things based on my current state
		switch (this.state) {
			
			case "walking":
				if (this.team == 0) {
					if (this.walkTimer >= Math.max((13 - this.speed), 3)) {
						this.x += 1;
						this.walkTimer = -1;
					}
				} else if (this.team == 1) {
					if (this.walkTimer >= Math.max((13 - this.speed), 3)) {
						this.x -= 1;
						this.walkTimer = -1;
					}
				}
				this.walkTimer += 1;
				break;
				
			case "dying":
				if (this.dyingTimer >= 44) {
					this.setState("dead");
					this.timesDied += 1;
					game.removeDeadPlayer(this);
					
				}
				this.dyingTimer += 1;
				break;
				
			case "dead":
				if (this.respawnTimer <= 0) {
					this.setState("waiting for spawn");
					this.respawnTimer = startRespawnTimer + (this.timesDied * incrementRespawnTimer) - incrementRespawnTimer;
					if (this.respawnTimer > maxRespawnTimer) {
						this.respawnTimer = maxRespawnTimer;
					}
				} else {
					this.respawnTimer -= 1;
				}
				break;
				
			case "waiting for spawn":
				this.dyingTimer = 0;
				this.alpha = 1.0;
				if (this.team == 0) {
					if (game.redUnitsAlive.length < maxUnitsAlivePerTeam) {
						if (this.fillerUnit == false) {
							game.spawnPlayer(this);
							this.setState("waiting");
						} else if (this.fillerUnit == true) {
							if (game.redUnitsTotal.length <= game.blueUnitsTotal.length) {
								game.spawnPlayer(this);
								this.setState("waiting");
							} else {
								game.removePlayerFromGame(this);
							}
						}
					}
				} else if (this.team == 1) {
					if (game.blueUnitsAlive.length < maxUnitsAlivePerTeam) {
						if (this.fillerUnit == false) {
							game.spawnPlayer(this);
							this.setState("waiting");
						} else if (this.fillerUnit == true) {
							if (game.blueUnitsTotal.length <= game.redUnitsTotal.length) {
								game.spawnPlayer(this);
								this.setState("waiting");
							} else {
								game.removePlayerFromGame(this);
							}
						}
					}
				}
				break;
				
			default:
				break;
				
		}
		
		if (this.damaged_timer > 0) {
			this.damaged_timer -= 1;
		}
		
		// Update animations
		this.updateAnimations();
		
		// Update the speech bubble
		this.speechBubble.update();
		
	}
	
	// Handles updates of the sprites and animations
	updateAnimations() {

		switch (this.animationState) {
			
			case "waiting":
				this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
				this.animationTimer = -1;
				break;
				
			case "walking":
				this.y = baseY;
				if (this.animationTimer == 0) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
				} else if (this.animationTimer == 5) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_walk1" : this.spriteBase + "_blue_walk1");
				} else if (this.animationTimer == 10) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
				} else if (this. animationTimer == 15) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_walk2" : this.spriteBase + "_blue_walk2");
				} else if (this.animationTimer >= 19) {
					this.animationTimer = -1;
				}
				break;
			
			case "dying":
				if (this.showDeath == true) {
					if (this.team == 0) {
						this.x -= 1;
					} else if (this.team == 1) {
						this.x += 1;
					}
					if (this.animationTimer < 8) {
						this.y -= 1;
					} else if (this.animationTimer < 16) {
						if (this.animationTimer % 2 == 0) {
							this.y -= 1;
						}
					} else if (this.animationTimer < 20) {
						// Nothing.
					} else if (this.animationTimer < 24) {
						if (this.animationTimer % 2 == 0) {
							this.alpha = 0.6;
							this.y += 1;
						}
					} else if (this.animationTimer < 36) {
						this.alpha = 0.3;
						this.y += 1;
					}
					if (this.animationTimer == 0) {
						this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_hurt" : this.spriteBase + "_blue_hurt");
						this.y -= 1;
					} else if (this.animationTimer >= 44) {
						this.animationTimer = -1;
						this.disengage();
						this.animationState = "dead";
						this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
						this.showDeath = true;
					}
				} else {
					this.animationTimer = -1;
					this.disengage();
					this.animationState = "dead";
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
					this.showDeath = true;
				}
				break;
			
			case "dead":
				this.animationTimer = -1;
				break;
				
			case "waiting for respawn":
				this.alpha = 1.0;
				this.animationTimer = -1;
				break;
				
			case "knockback":
				if (this.team == 0) {
					this.x -= 1;
				} else if (this.team == 1) {
					this.x += 1;
				}
				
				if (this.animationTimer < this.knockbackForce * 0.15) {
					this.y -= 1;
				} else if (this.animationTimer < this.knockbackForce * 0.325) {
					if (this.animationTimer % 2 == 0) {
						this.y -= 1;
					}
				} else if (this.animationTimer < this.knockbackForce * 0.525) {
					// Nothing.
				} else if (this.animationTimer < this.knockbackForce * 0.7) {
					if (this.animationTimer % 2 == 0) {
						this.y += 1;
					}
				} else if (this.animationTimer < this.knockbackForce * 0.875) {
					this.y += 1;
				} else if (this.animationTimer < this.knockbackForce) {
					this.y = baseY;
					game.effects.push(new DustParticle(this.getEffectX(), baseY + 17));
				}
				
				if (this.animationTimer == 0) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_hurt" : this.spriteBase + "_blue_hurt");
					this.y -= 1;
				} else if (this.animationTimer >= this.knockbackForce) {
					this.animationTimer = -1;
					this.disengage();
					this.setState("waiting");
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
				}
				break;
				
			case "shoot":
				if (this.animationTimer <= 0) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_stand" : this.spriteBase + "_blue_stand");
				}
				if (this.animationTimer == 0) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_shoot1" : this.spriteBase + "_blue_shoot1");
				} else if (this.animationTimer == 10) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_shoot2" : this.spriteBase + "_blue_shoot2");
					this.makeRangedAttack();
				} else if (this.animationTimer == 15) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_shoot3" : this.spriteBase + "_blue_shoot3");
				} else if (this.animationTimer == 20) {
					this.sprite = document.getElementById((this.team == 0) ? this.spriteBase + "_red_shoot4" : this.spriteBase + "_blue_shoot4");
				} else if (this.animationTimer >= 24) {
					this.animationTimer = -1;
					this.setState("waiting");
					this.disengage();
				}
				break;
				
			default:
				if (this.target != undefined) {
					game.actionData[this.nextAction].animation(this, this.target);
					if (this.animationTimer >= Math.max(game.actionData[this.nextAction].animationLength, game.actionData[this.target.nextAction].animationLength)) {
						this.animationTimer = -1;
						this.setState("waiting");
						this.disengage();
					}
				}
				break;
		}
		
		this.animationTimer += 1;
	}
	
	// Draws the unit
	draw() {
		this.ctx.globalAlpha = this.alpha;
		if ((this.team == 0 && this.x > redStartX - 4) || (this.team == 1 && this.x < blueStartX + 4)) {
			this.ctx.drawImage(this.shadowSprite, this.getEffectX() - 2, baseY + 17);
			if (this.damaged_timer > 0) {
				var unitCanvas = document.getElementById("unitCanvas");
				var unitCtx = unitCanvas.getContext("2d");
				unitCtx.clearRect(0, 0, unitCanvas.width, unitCanvas.height);
				unitCtx.drawImage(this.sprite, this.x - Math.floor(this.sprite.width / 2), this.y);
				unitCtx.globalCompositeOperation = "source-atop";
				unitCtx.fillStyle = "#FF0000";
				unitCtx.globalAlpha = Math.min((this.damaged_timer * 0.1), 0.8);
				unitCtx.fillRect(this.x - Math.floor(this.sprite.width / 2), this.y, this.sprite.width, this.sprite.height);
				unitCtx.globalCompositeOperation = "source-over";
				unitCtx.fillStyle = "#000000";
				unitCtx.globalAlpha = 1;
				this.ctx.drawImage(unitCanvas, 0, 0);
			} else {
				this.ctx.drawImage(this.sprite, this.x - Math.floor(this.sprite.width / 2), this.y);
			}
			this.drawHealth();
			this.ctx.strokeStyle = textStrokeColor;
			this.ctx.lineWidth = 1;
			this.ctx.strokeText(this.name.substring(0, 4), this.getEffectX() - 3, this.getEffectY() - 14);
			this.ctx.fillStyle = textColor;
			this.ctx.strokeStyle = "none";
			this.ctx.lineWidth = 0;
			this.ctx.fillText(this.name.substring(0, 4), this.getEffectX() - 3, this.getEffectY() - 14);
			this.speechBubble.draw();
		}
		this.ctx.globalAlpha = 1.0;
	}
	
	// Draws the unit's health bar
	drawHealth() {
		this.ctx.drawImage(this.healthBarSprite, this.getEffectX() - 4, this.getEffectY() - 13);
		if (this.hp > 0) {
			if (this.sp >= 100) {
				if (this.superGlowTimer <= 0) {
					this.ctx.fillStyle = "#00bbff";
				} else if (this.superGlowTimer <= 5) {
					this.ctx.fillStyle = "#22ddff";
				} else if (this.superGlowTimer <= 10) {
					this.ctx.fillStyle = "#44ffff";
				} else if (this.superGlowTimer <= 15) {
					this.ctx.fillStyle = "#22ddff";
				} else if (this.superGlowTimer <= 19) {
					this.ctx.fillStyle = "#22ddff";
					this.superGlowTimer = -1;
				}
				this.superGlowTimer += 1;
			} else if (this.superOn == true) {
				if (this.superGlowTimer <= 0) {
					this.ctx.fillStyle = "#ffbb00";
				} else if (this.superGlowTimer <= 5) {
					this.ctx.fillStyle = "#ffdd22";
				} else if (this.superGlowTimer <= 10) {
					this.ctx.fillStyle = "#ffff44";
				} else if (this.superGlowTimer <= 15) {
					this.ctx.fillStyle = "#ffdd22";
				} else if (this.superGlowTimer <= 19) {
					this.ctx.fillStyle = "#ffdd22";
					this.superGlowTimer = -1;
				}
				this.superGlowTimer += 1;
			} else {
				this.superGlowTimer = 0;
				this.ctx.fillStyle = "#00ff44";
			}
			this.ctx.fillRect(this.getEffectX() - 3, this.getEffectY() - 12, Math.ceil(14 * (this.hp / this.maxHp)), 2);
			this.ctx.fillStyle = "#000000"
		}
	}
	
	// This function sets the game state and animation state of the unit, using the game state as the variable
	setState(arg1) {
		//arg1 = game state
		switch (arg1) {
			case "walking":
				this.state = "walking";
				this.animationState = "walking";
				break;
			case "waiting":
				this.state = "waiting";
				this.animationState = "waiting";
				break;
			case "fighting":
				this.state = "fighting";
				this.animationState = this.nextAction;
				break;
			case "shoot":
				this.state = "shoot";
				this.animationState = "shoot";
				break;
			case "knockback":
				this.disengage();
				this.state = "knockback";
				this.animationState = "knockback";
				break;
			case "dying":
				this.disengage();
				this.state = "dying";
				this.animationState = "dying";
				break;
			case "dead":
				this.disengage();
				this.state = "dead";
				this.animationState = "dead";
				break;
			case "waiting for spawn":
				this.disengage();
				this.setStats();
				this.state = "waiting for spawn";
				this.animationState = "waiting for spawn";
				break;
			case "special":
				this.disengage();
				this.state = "special";
				this.animationState = "special";
				break;
			default:
				break;
		}
	}

	// Unit checks to see if anyone is in front of them and returns the unit
	detectUnit() {
		// Return nothing if dead or waiting to respawn.
		if ((this.state == "dead") || (this.state == "waiting to spawn")) {
			return false;
		}
		
		if (this.team == 0) {
			for (var i = 0; i < game.redUnitsAlive.length; i++) {
				if ((game.redUnitsAlive[i].x <= this.x + engageFriendDistance) && (game.redUnitsAlive[i].x > this.x) && (game.redUnitsAlive[i] != this)) {
					return game.redUnitsAlive[i];
				}
			}
			for (var i = 0; i < game.blueUnitsAlive.length; i++) {
				if (game.blueUnitsAlive[i].x <= this.x + engageEnemyDistance) {
					return game.blueUnitsAlive[i];
				}
			}
			if (game.blueCastle.x <= this.x + engageEnemyDistance) {
				return game.blueCastle;
			}
		}
		if (this.team == 1) {
			for (var i = 0; i < game.blueUnitsAlive.length; i++) {
				if ((game.blueUnitsAlive[i].x >= this.x - engageFriendDistance) && (game.blueUnitsAlive[i].x < this.x) && (game.blueUnitsAlive[i] != this)) {
					return game.blueUnitsAlive[i];
				}
			}
			for (var i = 0; i < game.redUnitsAlive.length; i++) {
				if (game.redUnitsAlive[i].x >= this.x - engageEnemyDistance) {
					return game.redUnitsAlive[i];
				}
			}
			if (game.redCastle.x >= this.x - engageEnemyDistance) {
				return game.redCastle;
			}
		}
		
		return false;
	}
	
	// Detect a faster friend behind you
	detectUnitBehind() {
		if ((this.state == "dead") || (this.state == "waiting to spawn")) {
			return false;
		}
		
		if (this.team == 0) {
			for (var i = 0; i < game.redUnitsAlive.length; i++) {
				if ((game.redUnitsAlive[i].x >= this.x - engageFriendDistance) && (game.redUnitsAlive[i].x < this.x) && (game.redUnitsAlive[i] != this)) {
					return game.redUnitsAlive[i];
				}
			}
		}
		if (this.team == 1) {
			for (var i = 0; i < game.blueUnitsAlive.length; i++) {
				if ((game.blueUnitsAlive[i].x <= this.x + engageFriendDistance) && (game.blueUnitsAlive[i].x > this.x) && (game.blueUnitsAlive[i] != this)) {
					return game.blueUnitsAlive[i];
				}
			}
		}
		
		return false;
	}
	
	// Unit decides what it will do
	decideAction() {
		//Bots use their supers
		if (this.bot == true && this.state != "dead" && this.state != "dying") {
			this.activateSuper();
		}
		var min = Math.ceil(1);
		var max = Math.floor(100);
		var num = Math.floor(Math.random() * (max - min + 1)) + min;
		var chanceTotal = 0;
		for (var i = 0; i < this.actions.length; i++) {
			if (num <= this.actionChances[i] + chanceTotal) {
				this.nextAction = this.actions[i];
				break;
			} else {
				chanceTotal += this.actionChances[i];
			}
		}
		if (this.detectUnit() != false) {
			if (this.detectUnit().constructor.name == "Castle") {
				this.nextAction = "castleattack";
			}
		}
		if (this.superType == "action" && this.superOn == true) {
			this.superTimer += 1;
			if (this.superTimer >= game.unitData[this.type].superLength) {
				this.deactivateSuper();
			}
		}
	}

	// Make a ranged attack
	makeRangedAttack() {
		var min = Math.ceil(1);
		var max = Math.floor(100);
		var num = Math.floor(Math.random() * (max - min + 1)) + min;
		var chanceTotal = 0;
		for (var i = 0; i < this.rangedActions.length; i++) {
			if (num <= this.rangedActionChances[i] + chanceTotal) {
				var projectile = new Projectile(this.rangedActions[i], this);
				game.projectiles.push(projectile);
				if (game.unitData[this.type].superType == "ranged" && this.superOn == true) {
					this.superTimer += 1;
					if (this.superTimer >= game.unitData[this.type].superLength) {
						this.deactivateSuper();
					}
				}
				break;
			} else {
				chanceTotal += this.actionChances[i];
			}
		}
	}
	
	// Check for death
	checkDeath(arg1) {
		// arg1 = attacker
		if ((this.hp <= 0) && (this.state != "dying")) {
			this.die(arg1);
		}
	}
	
	// Actually die
	die(arg1) {
		//arg1 = attacker
		this.setState("dying");
		this.gainSp(20);
		game.collectStats(arg1, this, "death", 1);
	}

	// Calculate damage amount and other effects
	processDamage() {
		var action = this.nextAction;
		var reaction = this.target.nextAction;
		game.actionData[action].actionEffect(this, this.target);
		game.actionData[reaction].reactionEffect(this.target, this);
		this.target.checkDeath(this);
		this.checkDeath(this.target);
	}
	
	// Actually apply damage
	damage(arg1, arg2) {
		//arg1 = damage amount, arg2 = attacker
		if (arg1 < 0) {
			arg1 = 0;
		}
		this.hp -= arg1;
		if (arg1 > 0) {
			for (var i = 0; i < (arg1 * 0.75); i++) {
				game.effects.push(new HitParticle(this.getEffectX(), this.getEffectY(), (this.team==0) ? "left" : "right"));
			}
			this.damaged_timer = Math.floor(arg1 * 1.25);
		}
		game.effects.push(new DamageNumber(this.getEffectX(), this.team, arg1));
		game.collectStats(arg2, this, "damage", arg1);
	}
	
	// Affect a unit's super points
	gainSp(arg1) {
	// arg1 = sp amount
		this.sp += (arg1 * this.spMultiplier);
		if (this.sp > 100) {
			this.sp = 100;
		}
	}

	// Push enemy flag?
	pushEnemyFlag() {
		if (this.team == 0) {
			if (this.x > game.blueFlag.x) {
				game.blueFlag.x = this.x;
			}
		} else if (this.team == 1) {
			if (this.x < game.redFlag.x) {
				game.redFlag.x = this.x;
			}
		}
	}
	
	// Apply bonus power and speed based on elapsed time
	applyQuarterBonuses() {
		for (var i = 0; i < game.quarterBonuses.length; i++) {
			if (this.team == game.quarterBonuses[i]) {
				this.meleePower = this.meleePower + this.baseMeleePower * (0.25 * (i + 1));
				this.rangedPower = this.rangedPower + this.baseRangedPower *(0.25 * (i + 1));
				this.physicalPower = this.physicalPower + this.basePhysicalPower * (0.25 * (i + 1));
				this.magicPower = this.magicPower + this.baseMagicPower * (0.25 * (i + 1));
				this.meleeDefense = this.meleeDefense + this.baseMeleeDefense * (0.1 * (i + 1));
				this.rangedDefense = this.rangedDefense + this.baseRangedDefense * (0.1 * (i + 1));
				this.physicalDefense = this.physicalDefense + this.basePhysicalDefense * (0.1 * (i + 1));
				this.magicDefense = this.magicDefense + this.baseMagicDefense * (0.1 * (i + 1));
				this.speed = this.speed + this.baseSpeed * (0.1 * (i + 1));
				this.force = this.force + this.baseForce * (0.25 * (i + 1));
				this.weight = this.weight + this.baseWeight * (0.1 * (i + 1));
				//this.speed = this.speed + Math.ceil(this.baseSpeed * (0.25 * (i + 1)));
			} else {
				this.spMultiplier = this.spMultiplier + 0.10;
			}
		}
	}
	
	// Apply bonus power and speed based on current flag condition
	applyFlagBonus() {
		if (this.redTeamGround > this.blueTeamGround && this.team == 0) {
			this.meleePower = this.meleePower + this.baseMeleePower * (0.1);
			this.rangedPower = this.rangedPower + this.baseRangedPower * (0.1);
			this.physicalPower = this.physicalPower + this.basePhysicalPower * (0.1);
			this.magicPower = this.magicPower + this.baseMagicPower * (0.1);
			this.force = this.force + this.baseForce * (0.1);
			this.weight = this.weight + this.baseWeight * (0.1);
		}
		if (this.blueTeamGround > this.redTeamGround && this.team == 1) {
			this.meleePower = this.meleePower + this.baseMeleePower * (0.1);
			this.rangedPower = this.rangedPower + this.baseRangedPower * (0.1);
			this.physicalPower = this.physicalPower + this.basePhysicalPower * (0.1);
			this.magicPower = this.magicPower + this.baseMagicPower * (0.1);
			this.force = this.force + this.baseForce * (0.1);
			this.weight = this.weight + this.baseWeight * (0.1);
		}
	}
	
	// Activate the unit's super move
	activateSuper() {
		if (this.sp >= 100) {
			this.superOn = true;
			this.sp = 0;
		}
	}

	// Turn off the unit's super move
	deactivateSuper() {
		this.superTimer = 0;
		this.superOn = false;
	}
	
	// Recover some health
	healHp(arg1) {
		this.hp += arg1;
		if (this.hp > this.maxHp) {
			this.hp = this.maxHp;
		}
	}
	
	getEffectX () {
		if (this.team == 0) {
			return this.x - Math.floor(this.sprite.width / 2) + 4;
		} else if (this.team == 1) {
			return this.x - Math.floor(this.sprite.width / 2) + 9;
		}
	}
	
	getEffectY () {
		if (this.team == 0) {
			return this.y + 10;
		} else if (this.team == 1) {
			return this.y + 10;
		}
	}
	
	engage() {
		this.animationTimer = 0;
		if (this.target != undefined) {
			this.engaged = true;
			if (this.target.team != this.team) {
				if (this.nextAction == "nothing") {
					this.decideAction();
				}
				if (this.target.nextAction == "nothing") {
					this.target.decideAction();
				}
			}
		}
		if (this.team == 0) {
			game.determineFirst();
		}
	}
	
	disengage() {
		this.engaged = false;
		this.animationTimer = -1;
		this.nextAction = "nothing";
		this.goFirst = false;
		this.knockbackForce = 0;
		this.blocking = false;
		this.dodging = false;
		this.target = undefined;
	}
	
}

class Castle {
	
	// new Castle args: team
	constructor(arg1) {
		this.team = arg1;
		if (this.team == 0) {
			this.x = redStartX;
		} else if (this.team == 1) {
			this.x = blueStartX;
		}
		this.hp = startCastleHp;
		this.state = "waiting";
		this.nextAction = "nothing";
		this.winTimer = 0;
		this.type = "castle";
		
		this.spriteFront = document.getElementById((this.team == 0) ? "castleRedFront" : "castleBlueFront");
		this.spriteBack = document.getElementById((this.team == 0) ? "castleRedBack" : "castleBlueBack");
		this.spriteTower = document.getElementById((this.team == 0) ? "castleTower" : "castleTower");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.gems = [false, false, false, false];
	}
	
	update() {
		// This is where a lot of the meat will go.
		
		switch (this.state) {
			case "waiting":
				break;
			case "dead":
				break;
			default:
				break;
		}
		
		for (var i = 0; i < game.quarterBonuses.length; i++) {
			if (game.quarterBonuses[i] == this.team) {
				this.gems[i] = true;
			}
		}
	}
	
	// Set stats
	setStats() {
		this.hp = startCastleHp;
		this.attack = 1000;
	}
	
	drawFront() {
		// animate castle coming out of the ground
		if (game.joinTimer < 100) {
			
		}
		
		if (game.joinTimer < 40) {
			// Nothing
		} else if (game.joinTimer < 50) {
		} else if (game.joinTimer < 60) {
		} else if (game.joinTimer < 70) {
		} else if (game.joinTimer < 80) {
		} else if (game.joinTimer < 90) {
		} else if (game.joinTimer < 100) {
		}
		
		if (this.team == 0) {
			this.ctx.drawImage(this.spriteFront, this.x - Math.floor(this.spriteFront.width / 2), baseY - 32);
		} else if (this.team == 1) {
			this.ctx.drawImage(this.spriteFront, this.x - Math.floor(this.spriteFront.width / 2), baseY - 32);
		}

	}
	
	drawBack() {
		if (this.team == 0) {
			this.ctx.drawImage(this.spriteBack, this.x - Math.floor(this.spriteBack.width / 2), baseY - 32);
		} else if (this.team == 1) {
			this.ctx.drawImage(this.spriteBack, this.x - Math.floor(this.spriteBack.width / 2), baseY - 32);
		}
		
		//Draw gems
		for (var i = 0; i < this.gems.length; i++) {
			if (this.team == 0) {
				if (this.gems[i] == false) {
					this.ctx.drawImage(document.getElementById("empty_gem"), this.x - 19, baseY + 16 - (5 * i));
				} else if (this.gems[i] == true) {
					this.ctx.drawImage(document.getElementById("red_gem"), this.x - 19, baseY + 16 - (5 * i));
				}
			} else if (this.team == 1) {
				if (this.gems[i] == false) {
					this.ctx.drawImage(document.getElementById("empty_gem"), this.x + 16, baseY + 16 - (5 * i));
				} else if (this.gems[i] == true) {
					this.ctx.drawImage(document.getElementById("blue_gem"), this.x + 16, baseY + 16 - (5 * i));
				}
			}
		}
	}
	
	drawTower() {
		if (this.team == 0) {
			this.ctx.drawImage(this.spriteTower, this.x - Math.floor(this.spriteTower.width / 2), (baseY - 21) - (this.hp * 3));
		} else if (this.team == 1) {
			this.ctx.drawImage(this.spriteTower, this.x - Math.floor(this.spriteTower.width / 2), (baseY - 21) - (this.hp * 3));
		}
	}
	
	// Check for death
	checkDeath(arg1) {
		// arg1 = attacker
		if (this.hp <= 0) {
			this.die(arg1);
		}
	}
	
	// Process death
	die(arg1) {
		this.state = "dead";
		game.collectStats(arg1, this, "death", 1);
	}
	
	// Process damage
	// arg1 = damage amount (ignored)
	damage(arg1) {
		this.hp -= arg1;
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
		game.effects.push(new CastleParticle(this.x, this.team));
	}
	
	setState(arg1) {
		// just a dummy function to avoid errors.
	}
	
}

class Flag {
	
	constructor(team) {
		this.team = team;
		this.sprites = [];
		this.currentSprite = 0;
		this.carried = false;
		if (this.team == 0) {
			for (var i = 1; i < 11; i++) {
				this.sprites.push(document.getElementById("red_flag" + i));
			}
			this.x = redStartX + 35;
			this.animationTimer = 0;
		}
		if (this.team == 1) {
			for (var i = 1; i < 11; i++) {
				this.sprites.push(document.getElementById("blue_flag" + i));
			}
			this.x = blueStartX - 35;
			this.animationTimer = 20;
		}
		this.y = baseY - 21;
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
	}
	
	update() {
		var farthestX = 0;
		this.carried = false;
		if (this.team == 0) {
			farthestX = redStartX - this.sprites[0].width;
			for (var i = 0; i < game.redUnitsAlive.length; i++) {
				if ((game.redUnitsAlive[i].x > farthestX) && (game.redUnitsAlive[i].x < this.x + 5)) {
					farthestX = game.redUnitsAlive[i].x;
					this.carried = true;
				}
			}
			if (farthestX > this.x) {
				this.x = farthestX;
			}
			if (this.x > game.blueFlag.x && this.carried == true) {
				game.blueFlag.x = this.x;
			}
		} else if (this.team == 1) {
			farthestX = blueStartX;
			for (var i = 0; i < game.blueUnitsAlive.length; i++) {
				if ((game.blueUnitsAlive[i].x < farthestX) && (game.blueUnitsAlive[i].x > this.x - 5)) {
					farthestX = game.blueUnitsAlive[i].x;
					this.carried = true;
				}
			}
			if (farthestX < this.x) {
				this.x = farthestX;
			}
			if (this.x < game.redFlag.x && this.carried == true) {
				game.redFlag.x = this.x;
			}
		}
		
		if (this.team == 0) {
			game.redTeamGround = this.x - redStartX;
		} else if (this.team == 1) {
			game.blueTeamGround = blueStartX - this.x;
		}
		this.animationTimer += 1;
	}
	
	draw() {
		this.currentSprite = Math.floor(this.animationTimer / 4);
		if (this.currentSprite > 9) {
			this.currentSprite = 0;
			this.animationTimer = 0;
		}
		if (this.team == 0) {
			this.ctx.drawImage(this.sprites[this.currentSprite], this.x - this.sprites[0].width, (game.redTeamGround - 1 > game.blueTeamGround) ? this.y : this.y + 5);
		} else if (this.team == 1) {
			this.ctx.drawImage(this.sprites[this.currentSprite], this.x, (game.blueTeamGround - 1 > game.redTeamGround) ? this.y : this.y + 5);
		}
	}
	
	reset() {
		if (this.team == 0) {
			this.x = redStartX + 35;
		} else if (this.team == 1) {
			this.x = blueStartX - 35;
		}
	}
	
}

class SpeechBubble {
	
	constructor(arg1) {
		//arg1 = unit speaking
		
		this.sprite = document.getElementById("speechBubble");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		
		this.unit = arg1;
		this.timer = 0;
		this.y = -28;
	}
	
	update() {
		if (this.unit.speechBubbleActive == true) {
			if (this.timer == 0) {
				this.y -= 1;
			} else if (this.timer == 5) {
				this.y += 1;
			} else if (this.timer == 10) {
				this.y -= 1;
			} else if (this.timer == 15) {
				this.y += 1;
			} else if (this.timer == 20) {
				this.y -= 1;
			} else if (this.timer == 25) {
				this.y += 1;
			} else if (this.timer == 30) {
				this.y -= 1;
			} else if (this.timer == 35) {
				this.y += 1;
			} else if (this.timer == 40) {
				this.unit.speechBubbleActive = false;
				this.timer = -0;
			}
			this.timer += 1;
		} else {
			this.timer = 0;
		}
	}
	
	draw() {
		if (this.unit.speechBubbleActive == true) {
			this.ctx.drawImage(this.sprite, this.unit.getEffectX(), this.unit.getEffectY() + this.y);
		}
	}
	
}

class DustCloud {
	
	constructor(arg1) {
		// arg1 = x
		this.x = arg1;
		this.sprite1 = document.getElementById("dust1");
		this.sprite2 = document.getElementById("dust2");
		this.sprite3 = document.getElementById("dust3");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer > 90) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.animationTimer < 10) {
			this.ctx.drawImage(this.sprite1, this.x, baseY);
		} else if (this.animationTimer < 20) {
			this.ctx.drawImage(this.sprite2, this.x, baseY);
		} else if (this.animationTimer < 30) {
			this.ctx.drawImage(this.sprite3, this.x, baseY);
		} else if (this.animationTimer < 40) {
			this.ctx.drawImage(this.sprite2, this.x, baseY);
		} else if (this.animationTimer < 50) {
			this.ctx.drawImage(this.sprite3, this.x, baseY);
		} else if (this.animationTimer < 60) {
			this.ctx.drawImage(this.sprite2, this.x, baseY);
		} else if (this.animationTimer < 70) {
			this.ctx.drawImage(this.sprite3, this.x, baseY);
		} else if (this.animationTimer < 80) {
			this.ctx.drawImage(this.sprite1, this.x, baseY);
		}
	}
	
}

class HitParticle {
	
	constructor(arg1, arg2, arg3) {
		// arg1 = x, arg2 = y, arg3 = direction
		this.x = arg1 - 2 + Math.floor(Math.random() * 5);
		this.y_origin = arg2 - 2 - Math.floor(Math.random() * 8);
		this.y = this.y_origin;
		this.direction = arg3;
		this.max_time = 4 + Math.floor(Math.random() * 10);
		this.sprite1 = document.getElementById("hit1");
		this.sprite2 = document.getElementById("hit1");
		this.sprite3 = document.getElementById("hit3");
		this.sprite4 = document.getElementById("hit4");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer >= this.max_time) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		if (this.direction == "left") {
			this.x -= 1;
		} else if (this.direction == "right") {
			this.x += 1;
		}
		if (this.animationTimer < (this.max_time * 0.5)) {
			this.y -= 1;
		} else if (this.animationTimer < (this.max_time)) {
			this.y += 1;
		}
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.animationTimer < (this.max_time * 0.25)) {
			this.ctx.drawImage(this.sprite1, this.x, this.y_origin);
		} else if (this.animationTimer < (this.max_time * 0.5)) {
			this.ctx.drawImage(this.sprite2, this.x, this.y_origin + 2);
		} else if (this.animationTimer < (this.max_time * 0.75)) {
			this.ctx.drawImage(this.sprite3, this.x, this.y_origin + 4);
		} else if (this.animationTimer < this.max_time) {
			this.ctx.drawImage(this.sprite4, this.x, this.y_origin + 2);
		}
	}
	
}

class DamageNumber {
	
	constructor(arg1, arg2, arg3) {
		// arg1 = x, arg2 = team, arg3 = number
		this.xspeed = Math.random() + 0.1;
		this.yspeed = Math.random() + 1.5;
		this.y_origin = baseY - 5 + Math.floor(Math.random() * 3);
		this.y = this.y_origin;
		this.max_time = 20 + Math.floor(Math.random() * 10);
		this.team = arg2;
		if (this.team == 0) {
			this.x = arg1 - 2 + Math.floor(Math.random() * 4);
		} else if (this.team == 1) {
			this.x = arg1 + 2 + Math.floor(Math.random() * 4);
		}
		this.number = arg3;
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer >= this.max_time) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		if (this.team == 0) {
			this.x -= this.xspeed;
		} else if (this.team == 1) {
			this.x += this.xspeed;
		}
		if (this.animationTimer % 5 == 0) {
			this.yspeed -= 0.5;
		}
		this.y -= this.yspeed;
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.number > 0) {
			this.ctx.globalAlpha = 1.0 - (this.animationTimer / (this.max_time));
			this.ctx.strokeStyle = textStrokeColor;
			this.ctx.lineWidth = 1;
			this.ctx.strokeText(this.number, this.x, this.y);
			this.ctx.fillStyle = "#ff0000";
			this.ctx.strokeStyle = "none";
			this.ctx.lineWidth = 0;
			this.ctx.fillText(this.number, this.x, this.y);
			this.ctx.globalAlpha = 1.0;
		}
	}
	
}

class DustParticle {
	
	constructor(arg1, arg2) {
		// arg1 = x, arg2 = y, arg3 = direction
		this.x = arg1 - 2 + Math.floor(Math.random() * 5);
		this.y_origin = arg2;
		this.y = this.y_origin;
		this.max_time = 12 + Math.floor(Math.random() * 6);
		this.sprite1 = document.getElementById("smalldust1");
		this.sprite2 = document.getElementById("smalldust2");
		this.sprite3 = document.getElementById("smalldust3");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer >= this.max_time) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		this.y -= 0.3;
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.animationTimer < (this.max_time * 0.33)) {
			this.ctx.drawImage(this.sprite1, this.x, this.y);
		} else if (this.animationTimer < (this.max_time * 0.66)) {
			this.ctx.drawImage(this.sprite2, this.x, this.y);
		} else if (this.animationTimer < this.max_time) {
			this.ctx.drawImage(this.sprite3, this.x, this.y);
		}
	}
	
}

class CastleParticle {

	constructor(arg1, arg2) {
		// arg1 = x, arg2 = team
		if (Math.floor(Math.random() * 2) == 0) {
			this.size = "small";
		} else {
			this.size = "large";
		}
		switch (Math.floor(Math.random() * 3)) {
			case 0:
				this.xspeed = 1;
				break;
			case 1:
				this.xspeed = 2;
				break;
			case 2:
				this.xspeed = 3;
				break;
		}
		switch (Math.floor(Math.random() * 3)) {
			case 0:
				this.yspeed = 4;
				break;
			case 1:
				this.yspeed = 5;
				break;
			case 2:
				this.yspeed = 6;
				break;
		}
		this.y_origin = baseY - 10 + Math.floor(Math.random() * 15);
		this.y = this.y_origin;
		this.max_time = 25 + Math.floor(Math.random() * 10);
		this.team = arg2;
		if (this.team == 0) {
			this.x = arg1 - 3 + Math.floor(Math.random() * 8);
			if (this.size == "small") {
				this.sprite = document.getElementById("red_block_chunk2");
			} else if (this.size == "large") {
				this.sprite = document.getElementById("red_block_chunk1");
			}
		} else if (this.team == 1) {
			this.x = arg1 + 3 + Math.floor(Math.random() * 8);
			if (this.size == "small") {
				this.sprite = document.getElementById("blue_block_chunk2");
			} else if (this.size == "large") {
				this.sprite = document.getElementById("blue_block_chunk1");
			}
		}
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer >= this.max_time) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		if (this.team == 0) {
			this.x -= this.xspeed;
		} else if (this.team == 1) {
			this.x += this.xspeed;
		}
		if (this.animationTimer % 3 == 0) {
			this.yspeed -= 1;
		}
		this.y -= this.yspeed;
		this.animationTimer += 1;
	}
	
	draw() {
		this.ctx.globalAlpha = 1.0 - (this.animationTimer / (this.max_time * 1.5));
		this.ctx.drawImage(this.sprite, this.x, this.y);
		this.ctx.globalAlpha = 1.0;
	}
}

class FootstepParticle {
	
	constructor(arg1, arg2) {
		// arg1 = x, arg2 = y, arg3 = direction
		this.x = arg1 - 1 + Math.floor(Math.random() * 2);
		this.y_origin = arg2;
		this.y = this.y_origin;
		this.max_time = 8 + Math.floor(Math.random() * 4);
		this.sprite1 = document.getElementById("footstep1");
		this.sprite2 = document.getElementById("footstep2");
		this.sprite3 = document.getElementById("footstep3");
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.animationTimer = 0;
	}
	
	update() {
		if (this.animationTimer >= this.max_time) {
			var index = game.effects.indexOf(this);
			if (index > -1) {
				game.effects.splice(index, 1);
			}
			delete this;
		}
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.animationTimer < (this.max_time * 0.33)) {
			this.ctx.drawImage(this.sprite1, this.x, this.y);
		} else if (this.animationTimer < (this.max_time * 0.66)) {
			this.ctx.drawImage(this.sprite2, this.x, this.y);
		} else if (this.animationTimer < this.max_time) {
			this.ctx.drawImage(this.sprite3, this.x, this.y);
		}
	}
	
}

class Projectile {
	
	constructor(arg1, arg2) {
		//arg1 = type, arg2 = attacker
		
		this.type = arg1;
		this.attacker = arg2;
		this.team = this.attacker.team;
		this.attackType = game.projectileData[this.type].attackType;
		this.rangedPower = game.projectileData[this.type].rangedPower;
		this.physicalPower = game.projectileData[this.type].physicalPower;
		this.magicPower = game.projectileData[this.type].magicPower;
		this.pierce = game.projectileData[this.type].pierce;
		this.speed = game.projectileData[this.type].speed;
		if (this.team == 0) {
			this.sprite1 = document.getElementById("red_" + this.type + "1");
			this.sprite2 = document.getElementById("red_" + this.type + "2");
			this.sprite3 = document.getElementById("red_" + this.type + "3");
			this.sprite4 = document.getElementById("red_" + this.type + "4");
		} else if (this.team == 1) {
			this.sprite1 = document.getElementById("blue_" + this.type + "1");
			this.sprite2 = document.getElementById("blue_" + this.type + "2");
			this.sprite3 = document.getElementById("blue_" + this.type + "3");
			this.sprite4 = document.getElementById("blue_" + this.type + "4");
		}
		
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.x = this.attacker.x;
		this.y = this.attacker.y + 12;
		this.animationTimer = 0;
	}
	
	update() {
		if ((this.x < redStartX) || (this.x > blueStartX)) {
			this.removeFromGame();
			return false;
		}
		if (this.team == 0) {
			this.x += this.speed;
		} else if (this.team == 1) {
			this.x -= this.speed;
		}
		
		if (this.team == 0) {
			for (var i = 0; i < game.blueUnitsAlive.length; i++) {
				if (this.checkForCollision(game.blueUnitsAlive[i]) == true) {
					this.collision(game.blueUnitsAlive[i]);
				}
			}
		} else if (this.team == 1) {
			for (var i = 0; i < game.redUnitsAlive.length; i++) {
				if (this.checkForCollision(game.redUnitsAlive[i]) == true) {
					this.collision(game.redUnitsAlive[i]);
				}
			}
		}
		
		this.animationTimer += 1;
	}
	
	draw() {
		if (this.animationTimer < 10) {
			this.ctx.drawImage(this.sprite1, this.x, this.y);
		} else if (this.animationTimer < 20) {
			this.ctx.drawImage(this.sprite2, this.x, this.y);
		} else if (this.animationTimer < 30) {
			this.ctx.drawImage(this.sprite3, this.x, this.y);
		} else if (this.animationTimer < 40) {
			this.ctx.drawImage(this.sprite4, this.x, this.y);
		} else if (this.animationTimer == 40) {
			this.ctx.drawImage(this.sprite4, this.x, this.y);
			this.animationTimer = 0;
		}
	}
	
	checkForCollision(arg1) {
		//arg1 = unit to check for collision with
		var unit = arg1;
		if (Math.abs(this.x - unit.x) <= (this.speed + 1)) {
			if (unit.state != "dying") {
				return true;
			}
		}
		return false;
	}
	
	collision(arg1) {
		//arg1 = unit it's colliding with
		var target = arg1;
		game.projectileData[this.type].actionEffect(this.attacker, target, this);
		target.checkDeath(this.attacker);
		this.removeFromGame();
	}
	
	removeFromGame() {
		var index = game.projectiles.indexOf(this);
		if (index > -1) {
			game.projectiles.splice(index, 1);
		}
		delete this;
	}
	
}

class Grass {
	
	constructor() {
		if (Math.floor(Math.random() * 2) == 0) {
			this.size = "small";
		} else {
			this.size = "large";
		}
		this.x = redStartX - 15 + Math.floor(Math.random() * (blueStartX - redStartX + 30));
		this.y = baseY + 10 + Math.floor(Math.random() * 11);
		if (this.y < baseY + 16) {
			this.layer = "back";
		} else {
			this.layer = "front";
		}
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.sprite = document.getElementById("grass_small1");
		this.animationTimer = Math.floor(Math.random() * 20) - 1;
	}
	
	update() {
		if (this.size == "small") {
			if (this.animationTimer <= 0) {
				this.sprite = document.getElementById("grass_small1");
			} else if (this.animationTimer > 0 && this.animationTimer < 50) {
				this.sprite = document.getElementById("grass_small1");
			} else if (this.animationTimer >= 50 && this.animationTimer < 60) {
				this.sprite = document.getElementById("grass_small2");
			} else if (this.animationTimer >= 60) {
				this.sprite = document.getElementById("grass_small2");
				this.animationTimer = Math.floor(Math.random() * 10) - 1;
			}
		} else if (this.size == "large") {
			if (this.animationTimer <= 0) {
				this.sprite = document.getElementById("grass_big1");
			} else if (this.animationTimer > 0 && this.animationTimer < 50) {
				this.sprite = document.getElementById("grass_big1");
			} else if (this.animationTimer >= 50 && this.animationTimer < 60) {
				this.sprite = document.getElementById("grass_big2");
			} else if (this.animationTimer >= 60) {
				this.sprite = document.getElementById("grass_big2");
				this.animationTimer = Math.floor(Math.random() * 10) - 1;
			}
		}
		this.animationTimer += 1;
	}
	
	draw() {
		this.ctx.drawImage(this.sprite, this.x, this.y);
	}
	
}

class Rock {
	
	constructor() {
		if (Math.floor(Math.random() * 2) == 0) {
			this.size = "small";
		} else {
			this.size = "large";
		}
		this.x = redStartX - 15 + Math.floor(Math.random() * (blueStartX - redStartX + 30));
		this.y = baseY + 12 + Math.floor(Math.random() * 11);
		if (this.y < baseY + 18) {
			this.layer = "back";
		} else {
			this.layer = "front";
		}
		this.gameCanvas = document.getElementById("game");
		this.ctx = this.gameCanvas.getContext("2d");
		this.sprite = document.getElementById("rock_small1");
	}
	
	update() {
	}
	
	draw() {
		this.ctx.drawImage(this.sprite, this.x, this.y);
	}
	
}

// This has to be here, above the onMessage stuff.
var chatClient = function chatClient(options){
    this.username = options.username;
    this.password = options.password;
    this.channel = options.channel;
	this.bot = options.bot;

    this.server = 'irc-ws.chat.twitch.tv';
    this.port = 443;
}

var botClient = function chatClient(options){
    this.username = options.username;
    this.password = options.password;
    this.channel = options.channel;
	this.bot = options.bot;

    this.server = 'irc-ws.chat.twitch.tv';
    this.port = 443;
}

// This is what happens when a chat message is received.
chatClient.prototype.onMessage = function onMessage(message){
	
	if (this.bot == true) {
		return;
	}
	
    if(message !== null){
        var parsed = this.parseMessage(message.data);
        if(parsed !== null){
			
			// Test
			//alert(message.data);
			
			// Get user data.
			var userTeam = localStorage.getItem(parsed.username + '_team');
			var userUnit = localStorage.getItem(parsed.username + '_unit');
            var userBounty = localStorage.getItem(parsed.username + '_bounty');

			// Unit selection commands
			for (var i = 0; i < unitsEnabled.length; i++) {
				if (parsed.message.trim().toLowerCase() === ("!play" + unitsEnabled[i]) || parsed.message.trim().toLowerCase() === ("!play " + unitsEnabled[i])) {
					if (game.unitData[unitsEnabled[i]].restricted == true) {
						for (var j = 0; j < game.unitData[unitsEnabled[i]].restrictedToUsers.length; j++) {
							if (parsed.username === game.unitData[unitsEnabled[i]].restrictedToUsers[j]) {
								localStorage.setItem(parsed.username + '_unit', unitsEnabled[i]);
								if (game.alreadyPlaying(parsed.username) == true) {
									game.getUnit(parsed.username).nextUnitType = unitsEnabled[i];
								}
								userUnit = localStorage.getItem(parsed.username + '_unit');
							}
						}
					} else {
						localStorage.setItem(parsed.username + '_unit', unitsEnabled[i]);
						if (game.alreadyPlaying(parsed.username) == true) {
							game.getUnit(parsed.username).nextUnitType = unitsEnabled[i];
						}
						userUnit = localStorage.getItem(parsed.username + '_unit');
					}
				}
			}
			
			// Team selection
			if (parsed.message.trim().toLowerCase() === "!joinred" || parsed.message.trim().toLowerCase() === "!join red" || parsed.message.trim().toLowerCase() === "!playred" || parsed.message.trim().toLowerCase() === "!play red") {
				localStorage.setItem(parsed.username + '_team', "0");
				userTeam = localStorage.getItem(parsed.username + '_team');
			}
			if (parsed.message.trim().toLowerCase() === "!joinblue" || parsed.message.trim().toLowerCase() === "!join blue" || parsed.message.trim().toLowerCase() === "!playblue" || parsed.message.trim().toLowerCase() === "!play blue") {
				localStorage.setItem(parsed.username + '_team', "1");
				userTeam = localStorage.getItem(parsed.username + '_team');
			}
			
			// Buying something
			if (parsed.message.trim().toLowerCase().substring(0,7) === "!bought") {
				if (parsed.username.trim().toLowerCase() == botName.toLowerCase()) {
					//alert("Successful buy");
				} else {
					//botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + Math.round(new Date().getTime()/1000.0) + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :' + parsed.username + ' bought something!');
				}
			}
			
			// Checking bounty
			if (parsed.message.trim().toLowerCase() === "!bounty") {
				if (game.getBounty(parsed.username) > 1) {
					botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + game.startTime + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :@' + parsed.username + ': Your current Stream Fighters bounty is ' + game.getBounty(parsed.username).toString() + '. This means you are increasing the other team\'s payout. Watch out!');
				} else if (game.getBounty(parsed.username) < 1) {
					botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + game.startTime + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :@' + parsed.username + ': Your current Stream Fighters bounty is ' + game.getBounty(parsed.username).toString() + '. This means you are decreasing the other team\'s payout.');
				} else if (game.getBounty(parsed.username) == 1) {
					botClient.webSocket.send('@badges=moderator/1;color=;display-name=' + botName.toLowerCase() + ';emotes=;mod=1;room-id=' + streamerID + ';subscriber=0;tmi-sent-ts=' + game.startTime + ';turbo=1;user-id=' + botID + ';user-type=mod:' + botName.toLowerCase() + '!' + botName.toLowerCase() + '@' + botName.toLowerCase() + '.tmi.twitch.tv PRIVMSG #' + streamerName.toLowerCase() + ' :@' + parsed.username + ': Your current Stream Fighters bounty is ' + game.getBounty(parsed.username).toString() + '. This means you are bringing the other team\'s payout closer to average.');
				}
			}
			
			// If they are already in the game
			if (game.alreadyPlaying(parsed.username) == true) {
				game.getUnit(parsed.username).speechBubbleActive = true;
				
				// Super!
				if (parsed.message.trim().toLowerCase() === "!super") {
					game.getUnit(parsed.username).activateSuper();
				}
				
			} else {
				
				// Assign a team at random if no team.
				if (userTeam === null){
					if (game.humanPlayers(0).length < game.humanPlayers(1).length) {
						localStorage.setItem(parsed.username + '_team', 0);
					} else if (game.humanPlayers(0).length > game.humanPlayers(1).length) {
						localStorage.setItem(parsed.username + '_team', 1);
					} else if (game.humanPlayers(0).length == game.humanPlayers(1).length) {
						localStorage.setItem(parsed.username + '_team', Math.floor(Math.random() + 0.5)); // 0 will be red team, 1 will be blue team.
					}
					userTeam = localStorage.getItem(parsed.username + '_team');
				}
				
				// Assign a unit at random if no unit.
				if (userUnit === null){
					switch (Math.floor(Math.random() * 3)) {
						case 0:
							localStorage.setItem(parsed.username + '_unit', "knight");
							break;
						case 1:
							localStorage.setItem(parsed.username + '_unit', "viking");
							break;
						case 2:
							localStorage.setItem(parsed.username + '_unit', "hoplite");
							break;
						default:
							break;
					}
					userUnit = localStorage.getItem(parsed.username + '_unit');
				}
				
				// Set bounty to 1 for new players.
				if(userBounty === null){
					localStorage.setItem(parsed.username + '_bounty', 1);
					userBounty = localStorage.getItem(parsed.username + '_bounty');
				}
				
				// Add to the game!
				game.addPlayer(parsed.username, userTeam, userUnit, userBounty);
			}
			
        }
    }
};









// Stuff I don't understand or need to touch
//--------------------------------------

/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
    
    This file is what connects to chat and parses messages as they come along. The chat client connects via a 
    Web Socket to Twitch chat. The important part events are onopen and onmessage.
*/



chatClient.prototype.open = function open(){
    this.webSocket = new WebSocket('wss://' + this.server + ':' + this.port + '/', 'irc');

    this.webSocket.onmessage = this.onMessage.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onopen = this.onOpen.bind(this);
};

chatClient.prototype.onError = function onError(message){
    console.log('Error: ' + message);
};

/* This is an example of a leaderboard scoring system. When someone sends a message to chat, we store 
   that value in local storage. It will show up when you click Populate Leaderboard in the UI. 
*/

chatClient.prototype.onOpen = function onOpen(){
    var socket = this.webSocket;

    if (socket !== null && socket.readyState === 1) {
        console.log('Connecting and authenticating...');

        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
        socket.send('PASS ' + this.password);
        socket.send('NICK ' + this.username);
        socket.send('JOIN ' + this.channel);
		
		console.log('Success!');
    }
};

chatClient.prototype.onClose = function onClose(){
    console.log('Disconnected from the chat server.');
	this.open();
};

chatClient.prototype.close = function close(){
    if(this.webSocket){
        this.webSocket.close();
    }
};

/* This is an example of an IRC message with tags. I split it across 
multiple lines for readability. The spaces at the beginning of each line are 
intentional to show where each set of information is parsed. */

//@badges=global_mod/1,turbo/1;color=#0D4200;display-name=TWITCH_UserNaME;emotes=25:0-4,12-16/1902:6-10;mod=0;room-id=1337;subscriber=0;turbo=1;user-id=1337;user-type=global_mod
// :twitch_username!twitch_username@twitch_username.tmi.twitch.tv 
// PRIVMSG 
// #channel
// :Kappa Keepo Kappa

chatClient.prototype.parseMessage = function parseMessage(rawMessage) {
	
	//alert("raw message is... " + rawMessage);
	
    var parsedMessage = {
        message: null,
        tags: null,
        command: null,
        original: rawMessage,
        channel: null,
        username: null
    };

    if(rawMessage[0] === '@'){
        var tagIndex = rawMessage.indexOf(' '),
        userIndex = rawMessage.indexOf(' ', tagIndex + 1),
        commandIndex = rawMessage.indexOf(' ', userIndex + 1),
        channelIndex = rawMessage.indexOf(' ', commandIndex + 1),
        messageIndex = rawMessage.indexOf(':', channelIndex + 1);

        parsedMessage.tags = rawMessage.slice(0, tagIndex);
        parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
        parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex);
        parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex);
        parsedMessage.message = rawMessage.slice(messageIndex + 1);
    }

    if(parsedMessage.command !== 'PRIVMSG'){
        parsedMessage = null;
    }

    return parsedMessage;
}

/*  Builds out the top 10 leaderboard in the UI using a jQuery template. 
function buildLeaderboard(){
    var chatKeys = Object.keys(localStorage),
        outputTemplate = $('#entry-template').html(),
        leaderboard = $('.leaderboard-output'),
        sortedData = chatKeys.sort(function(a,b){
            return localStorage[b]-localStorage[a]
        });

    leaderboard.empty();

    for(var i = 0; i < 10; i++){
        var viewerName = sortedData[i],
            template = $(outputTemplate);

        template.find('.rank').text(i + 1);
        template.find('.user-name').text(viewerName);
        template.find('.user-hp').text(localStorage[viewerName]);

        leaderboard.append(template);
    }
} */