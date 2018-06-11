window.game.projectileData["bullet"] = {
	rangedPower:2,
	attackType:"physical",
	physicalPower:4,
	magicPower:0,
	pierce:1,
	speed:6,
	actionEffect:function(user, target, projectile){
		var damage_amount = Math.max(projectile.rangedPower + projectile.physicalPower - Math.max(target.rangedDefense + target.physicalDefense - projectile.pierce, 0), projectile.pierce);
		target.damage(damage_amount, user);
	}
};