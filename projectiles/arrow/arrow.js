window.game.projectileData["arrow"] = {
	rangedPower:3,
	attackType:"physical",
	physicalPower:5,
	magicPower:0,
	pierce:2,
	speed:5,
	actionEffect:function(user, target, projectile){
		var damage_amount = Math.max(user.rangedPower + user.physicalPower - Math.max(target.rangedDefense + target.physicalDefense - user.pierce, 0), user.pierce);
		target.damage(damage_amount, user);
	}
};