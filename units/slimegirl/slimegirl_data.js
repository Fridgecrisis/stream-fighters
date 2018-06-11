window.game.unitData["slimegirl"] = {
	hp:30,
	regen:0.03,
	spMultiplier:1,
	meleePower:6,
	rangedPower:0,
	physicalPower:0,
	magicPower:10,
	pierce:3,
	drain:0,
	meleeDefense:3,
	rangedDefense:4,
	physicalDefense:3,
	magicDefense:6,
	spikes:3,
	speed:2,
	force:5,
	weight:20,
	intelligence:0,
	actions:["magicattack", "block", "rush"],
	actionChances:[45, 20, 35],
	attackType:"magic",
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
		user.pierce += 6;
		user.attackChance = 100;
		user.blockChance = 0;
		user.rushChance = 0;
	},
	restricted:false,
	restrictedToUsers:[]
};