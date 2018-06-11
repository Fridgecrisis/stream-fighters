window.game.actionData["castleattack"] = {
	priority:10,
	type:"physical",
	range:"melee",
	animationLength:49,
	actionEffect:function(user, target){
		var damage_amount = 1;
		if (user.wrecker == true) {
			damage_amount += 1;
		}
		target.damage(damage_amount, user);
		user.gainSp(1);
	},
	reactionEffect:function(user, target){
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
		if (user.animationTimer == 49) {
			user.die(target);
		}
	}
};