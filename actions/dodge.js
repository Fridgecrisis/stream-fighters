window.game.actionData["dodge"] = {
	priority:6,
	type:"none",
	range:"none",
	animationLength:49,
	actionEffect:function(user, target){
		user.dodging = true;
	},
	reactionEffect:function(user, target){
	},
	animation:function(user, target){
		if (user.team == 0) {
			if (user.goFirst == true) {
				if (user.animationTimer >= 1 && user.animationTimer < 6) {
					user.x -= 2;
					game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
				} else if (user.animationTimer >= 6 && user.animationTimer < 16) {
					if (user.animationTimer % 2 == 0) {
						user.x -= 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				} else if (user.animationTimer >= 16 && user.animationTimer < 25) {
					if (user.animationTimer % 4 == 0) {
						user.x -= 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				}
			} else if (user.goFirst == false) {
				if (user.animationTimer >= 26 && user.animationTimer < 31) {
					user.x -= 2;
					game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
				} else if (user.animationTimer >= 31 && user.animationTimer < 41) {
					if (user.animationTimer % 2 == 0) {
						user.x -= 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				} else if (user.animationTimer >= 41 && user.animationTimer < 50) {
					if (user.animationTimer % 4 == 0) {
						user.x -= 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				}
			}
		} else if (user.team == 1) {
			if (user.goFirst == true) {
				if (user.animationTimer >= 1 && user.animationTimer < 6) {
					user.x += 2;
					game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
				} else if (user.animationTimer >= 6 && user.animationTimer < 16) {
					if (user.animationTimer % 2 == 0) {
						user.x += 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				} else if (user.animationTimer >= 16 && user.animationTimer < 25) {
					if (user.animationTimer % 4 == 0) {
						user.x += 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				}
			} else if (user.goFirst == false) {
				if (user.animationTimer >= 26 && user.animationTimer < 31) {
					user.x += 2;
					game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
				} else if (user.animationTimer >= 31 && user.animationTimer < 41) {
					if (user.animationTimer % 2 == 0) {
						user.x += 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				} else if (user.animationTimer >= 41 && user.animationTimer < 50) {
					if (user.animationTimer % 4 == 0) {
						user.x += 1;
						game.effects.push(new DustParticle(user.getEffectX(), baseY + 17));
					}
				}
			}
		}
		
		if (user.animationTimer <= 0) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_stand" : user.spriteBase + "_blue_stand");
		}
		if (user.animationTimer == ((user.goFirst == true) ? 0 : 25)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block1" : user.spriteBase + "_blue_block1");
		} else if (user.animationTimer == ((user.goFirst == true) ? 5 : 30)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block2" : user.spriteBase + "_blue_block2");
			user.processDamage();
		} else if (user.animationTimer == ((user.goFirst == true) ? 10 : 35)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block3" : user.spriteBase + "_blue_block3");
		} else if (user.animationTimer == ((user.goFirst == true) ? 15 : 40)) {
			user.sprite = document.getElementById((user.team == 0) ? user.spriteBase + "_red_block4" : user.spriteBase + "_blue_block4");
		}
	}
};