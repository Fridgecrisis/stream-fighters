window.game.actionData["block"] = {
	priority:7,
	type:"none",
	range:"none",
	animationLength:49,
	actionEffect:function(user, target){
		user.blocking = true;
		user.gainSp(5);
	},
	reactionEffect:function(user, target){
		var damage_amount = 0;
		if (window.game.actionData[target.nextAction].range == "melee") {
			damage_amount += target.meleePower;
			damage_amount -= target.meleeDefense;
			if (window.game.actionData[target.nextAction].type == "physical") {
				damage_amount += target.physicalPower;
				damage_amount -= target.physicalDefense;
			}
			if (window.game.actionData[target.nextAction].type == "magic") {
				damage_amount += target.magicPower;
				damage_amount -= target.magicDefense;
			}
			damage_amount = Math.max(damage_amount, 0);
			damage_amount = Math.max(damage_amount, target.pierce);
			damage_amount = Math.floor(damage_amount / 2);
			target.damage(damage_amount, target);
			target.damage(user.spikes, user);
		}
	},
	animation:function(user, target){
		if (user.animationTimer <= 0) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		}
		if (user.animationTimer == ((user.goFirst == true) ? 0 : 25)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block1" : user.spriteBase + "_blue_block1");
			user.processDamage();
		} else if (user.animationTimer == ((user.goFirst == true) ? 5 : 30)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block2" : user.spriteBase + "_blue_block2");
		} else if (user.animationTimer == ((user.goFirst == true) ? 10 : 35)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block3" : user.spriteBase + "_blue_block3");
		} else if (user.animationTimer == ((user.goFirst == true) ? 15 : 40)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block4" : user.spriteBase + "_blue_block4");
		}
	}
};