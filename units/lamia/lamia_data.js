window.game.unitData["lamia"] = {
	hp:35,
	regen:0,
	spMultiplier:1,
	meleePower:10,
	rangedPower:0,
	physicalPower:10,
	magicPower:0,
	pierce:0,
	drain:5,
	meleeDefense:4,
	rangedDefense:4,
	physicalDefense:1,
	magicDefense:7,
	spikes:0,
	speed:3,
	force:20,
	weight:20,
	intelligence:0,
	actions:["attack", "block", "rush"],
	actionChances:[55, 10, 35],
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
	superLength:1,
	superData:function(user){
		user.spMultiplier = 0;
		user.actions = ["devour"];
		user.actionChances = [100];
	},
	restricted:false,
	restrictedToUsers:[]
};