window.game.unitData["viking"] = {
	hp:40,
	regen:0,
	spMultiplier:1,
	meleePower:10,
	rangedPower:0,
	physicalPower:10,
	magicPower:0,
	pierce:0,
	drain:0,
	meleeDefense:2,
	rangedDefense:4,
	physicalDefense:2,
	magicDefense:1,
	spikes:0,
	speed:6,
	force:10,
	weight:10,
	intelligence:0,
	actions:["attack", "block", "rush"],
	actionChances:[70, 15, 15],
	attackType:"physical",
	rangedAttack:false,
	rangedAttackRate:0,
	rangedActions:[],
	rangedActionChances:[],
	wrecker:false,
	raider:false,
	defender:false,
	initiative:false,
	superType:"action",
	superLength:20,
	superData:function(user){
		user.spMultiplier = 0;
		user.meleePower += 4;
		user.physicalPower += 2;
		user.meleeDefense += 6;
		user.rangedDefense += 6;
		user.speed += 2;
		user.actionChances = [100, 0, 0];
	},
	restricted:false,
	restrictedToUsers:[]
};