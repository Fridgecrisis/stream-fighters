window.game.actionData["devour"] = {
	priority:9,
	type:"physical",
	range:"melee",
	animationLength:140,
	actionEffect:function(user, target){
		if (target.dodging == false) {
			var damage_amount = target.hp;
			target.damage(damage_amount, user);
			user.healHp(Math.min(user.drain, damage_amount));
		}
	},
	reactionEffect:function(user, target){
		if (window.game.actionData[target.nextAction].range == "melee") {
			target.damage(user.spikes, user);
		}
	},
	animation:function(user, target){
		if (user.animationTimer == ((user.goFirst == true) ? 0 : 25)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack1" : user.spriteBase + "_blue_attack1");
		} else if (user.animationTimer == ((user.goFirst == true) ? 5 : 30)) {
			if (user.team == 0) {
				game.effects.push(new DustCloud(user.getEffectX() - 3));
				target.showDeath = false;
			} else if (user.team == 1) {
				game.effects.push(new DustCloud(user.getEffectX() - 20));
				target.showDeath = false;
			}
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack2" : user.spriteBase + "_blue_attack2");
			user.processDamage();
		} else if (user.animationTimer == ((user.goFirst == true) ? 10 : 35)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack3" : user.spriteBase + "_blue_attack3");
		} else if (user.animationTimer == ((user.goFirst == true) ? 15 : 40)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_attack4" : user.spriteBase + "_blue_attack4");
		} else if (user.animationTimer == ((user.goFirst == true) ? 20 : 45)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		} else if (user.animationTimer == 80) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special1" : user.spriteBase + "_blue_special1");
		} else if (user.animationTimer == 90) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special2" : user.spriteBase + "_blue_special2");
		} else if (user.animationTimer == 100) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special1" : user.spriteBase + "_blue_special1");
		} else if (user.animationTimer == 110) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special2" : user.spriteBase + "_blue_special2");
		} else if (user.animationTimer == 120) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special1" : user.spriteBase + "_blue_special1");
		} else if (user.animationTimer == 130) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_special2" : user.spriteBase + "_blue_special2");
		}
	}
};