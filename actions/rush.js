window.game.actionData["rush"] = {
	priority:3,
	type:"none",
	range:"melee",
	animationLength:49,
	actionEffect:function(user, target){
		if (target.dodging == false) {
			var damage_amount = Math.max(user.meleePower + user.speed - Math.max(target.meleeDefense - user.pierce, 0), user.pierce);
			target.damage(damage_amount, user);
			user.damage(target.spikes, target);
			user.gainSp(2);
			if (target.immovable != true && target.state != "dying") {
				target.setState("knockback");
				target.knockbackForce = 40 + user.force - target.weight;
			}
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
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_rush1" : user.spriteBase + "_blue_rush1");
		} else if (user.animationTimer == ((user.goFirst == true) ? 5 : 30)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_rush2" : user.spriteBase + "_blue_rush2");
			user.processDamage();
		} else if (user.animationTimer == ((user.goFirst == true) ? 10 : 35)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_rush3" : user.spriteBase + "_blue_rush3");
		} else if (user.animationTimer == ((user.goFirst == true) ? 15 : 40)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_rush4" : user.spriteBase + "_blue_rush4");
		} else if (user.animationTimer == ((user.goFirst == true) ? 20 : 45)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		}
	}
};