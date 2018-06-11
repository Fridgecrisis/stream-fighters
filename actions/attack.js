window.game.actionData["attack"] = {
	priority:5,
	type:"physical",
	range:"melee",
	animationLength:49,
	actionEffect:function(user, target){
		if (target.dodging == false) {
			var damage_amount = Math.max(user.meleePower + user.physicalPower - Math.max(target.meleeDefense + target.physicalDefense - user.pierce, 0), user.pierce);
			target.damage(damage_amount, user);
			user.healHp(Math.min(user.drain, damage_amount));
			user.gainSp(2);
		}
	},
	reactionEffect:function(user, target){
		if (window.game.actionData[target.nextAction].range == "melee") {
			target.damage(user.spikes, user);
		}
	},
	animation:function(user, target){
		if (user.animationTimer <= 0) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		}
		if (user.animationTimer == ((user.goFirst == true) ? 0 : 25)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack1" : user.spriteBase + "_blue_attack1");
		} else if (user.animationTimer == ((user.goFirst == true) ? 5 : 30)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack2" : user.spriteBase + "_blue_attack2");
			user.processDamage();
		} else if (user.animationTimer == ((user.goFirst == true) ? 10 : 35)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack3" : user.spriteBase + "_blue_attack3");
		} else if (user.animationTimer == ((user.goFirst == true) ? 15 : 40)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack4" : user.spriteBase + "_blue_attack4");
		} else if (user.animationTimer == ((user.goFirst == true) ? 20 : 45)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		}
	}
};