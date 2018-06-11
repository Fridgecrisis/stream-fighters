window.game.unitData["hoplite"] = {
	hp:35,
	regen:0,
	spMultiplier:1,
	meleePower:8,
	rangedPower:0,
	physicalPower:8,
	magicPower:0,
	pierce:3,
	drain:0,
	meleeDefense:1,
	rangedDefense:9,
	physicalDefense:2,
	magicDefense:1,
	spikes:0,
	speed:8,
	force:15,
	weight:5,
	intelligence:0,
	actions:["attack", "block", "rush"],
	actionChances:[25, 15, 60],
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
		user.meleeDefense += 8;
		user.rangedDefense += 4;
		user.speed += 2;
		user.force += 20;
		user.actionChances = [0, 0, 100];
	},
	restricted:false,
	restrictedToUsers:[]
};