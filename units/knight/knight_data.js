window.game.unitData["knight"] = {
	hp:50,
	regen:0,
	spMultiplier:1,
	meleePower:7,
	rangedPower:0,
	physicalPower:7,
	magicPower:0,
	pierce:0,
	drain:0,
	meleeDefense:6,
	rangedDefense:1,
	physicalDefense:4,
	magicDefense:1,
	spikes:0,
	speed:4,
	force:5,
	weight:20,
	intelligence:0,
	actions:["attack", "block", "rush"],
	actionChances:[35, 45, 20],
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
		user.meleeDefense += 4;
		user.rangedDefense += 2;
		user.physicalDefense += 4;
		user.magicDefense += 2;
		user.weight += 20;
		user.actionChances = [0, 100, 0];
	},
	restricted:false,
	restrictedToUsers:[]
};