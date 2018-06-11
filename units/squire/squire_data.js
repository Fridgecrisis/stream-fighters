window.game.unitData["squire"] = {
	hp:35,
	regen:0,
	spMultiplier:1,
	meleePower:6,
	rangedPower:0,
	physicalPower:6,
	magicPower:0,
	pierce:0,
	drain:0,
	meleeDefense:1,
	rangedDefense:2,
	physicalDefense:2,
	magicDefense:1,
	spikes:0,
	speed:7,
	force:10,
	weight:10,
	intelligence:0,
	actions:["attack", "block", "rush"],
	actionChances:[34, 33, 33],
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
		user.meleePower += 2;
		user.rangedPower += 2;
		user.physicalPower += 2;
		user.magicPower += 2;
		user.meleeDefense += 3;
		user.rangedDefense += 3;
		user.physicalDefense += 3;
		user.magicDefense += 3;
		user.speed += 2;
		user.force += 5;
		user.weight += 5;
	},
	restricted:false,
	restrictedToUsers:[]
};