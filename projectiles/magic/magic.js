window.game.projectileData["magic"] = {
	rangedPower:2,
	attackType:"magic",
	physicalPower:0,
	magicPower:9,
	pierce:0,
	speed:3,
	actionEffect:function(user, target, projectile){
		var damage_amount = Math.max(projectile.rangedPower + projectile.magicPower - Math.max(target.rangedDefense + target.magicDefense - projectile.pierce, 0), projectile.pierce);
		target.damage(damage_amount, user);
	}
};