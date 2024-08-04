var state = "MENU";

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (selection == -1) cm.dispose();

  var jobId = cm.getPlayer().getJob().getId();
  var availableJobIds = jobs[jobId];

  if (!availableJobIds) availableJobIds = [];
  else availableJobIds = availableJobIds.advancement;

  if (availableJobIds.length == 0) {
    cm.sendOk("No more job advancement for you until level 200 to reborn!");
    cm.dispose();
    return;
  }

  if (state == "MENU") {
    var options = [];

    for (var i = 0; i < availableJobIds.length; i++) {
      var jid = availableJobIds[i];
      options.push("#L" + i + "#" + jobs[jid].name + "#l");
    }

    cm.sendSimple(
      "You are a #r" +
        jobs[jobId].name +
        ".\r\n#bSelect a your next job advancement\r\n" +
        options.join("\r\n")
    );
    state = "WAIT_JOB_SELECTION";
  } else if (state == "WAIT_JOB_SELECTION") {
    if (selection == -1) {
      cm.dispose();
      return;
    }

    var nextJobId = availableJobIds[selection];
    var requiredLevel = jobs[nextJobId].level;
    var currentLevel = cm.getPlayer().getLevel();

    if (currentLevel < requiredLevel) {
      cm.sendOk("You need to be at least level #r" + requiredLevel + "#k to be able to change job");
      cm.dispose();
      return;
    }

    cm.changeJobById(nextJobId);

    // Learn new 4th job skills, if the value returned is empty, it means not 4th job.
    var availableSkills = cm.jobSkillIds(nextJobId);
    for (var y = 0; y < availableSkills.length; y++) {
      var availableSkillId = availableSkills[y];
      var skillInfo = cm.getSkill(availableSkillId);
      cm.getPlayer().message("Learnt 4th Job Skill: " + skillInfo.getName());
      cm.teachSkill(availableSkillId, 0, skillInfo.getMaxLevel(), -1);
    }

    cm.sendOk("Congratulations! You're now a #r" + jobs[nextJobId].name + ".");
    state = "DONE";
  } else if (state == "DONE") {
    cm.dispose();
  }
}

var jobs = {
  0: { advancement: [100, 200, 300, 400, 500, 1000, 2000], level: 1, name: "BEGINNER" },
  100: { advancement: [110, 120, 130], level: 10, name: "WARRIOR" },
  110: { advancement: [111], level: 30, name: "FIGHTER" },
  111: { advancement: [112], level: 50, name: "CRUSADER" },
  112: { advancement: [], level: 70, name: "HERO" },
  120: { advancement: [121], level: 10, name: "PAGE" },
  121: { advancement: [122], level: 30, name: "WHITEKNIGHT" },
  122: { advancement: [], level: 70, name: "PALADIN" },
  130: { advancement: [131], level: 10, name: "SPEARMAN" },
  131: { advancement: [132], level: 30, name: "DRAGONKNIGHT" },
  132: { advancement: [], level: 70, name: "DARKKNIGHT" },
  200: { advancement: [210, 220, 230], level: 10, name: "MAGICIAN" },
  210: { advancement: [211], level: 30, name: "FP_WIZARD" },
  211: { advancement: [212], level: 50, name: "FP_MAGE" },
  212: { advancement: [], level: 70, name: "FP_ARCHMAGE" },
  220: { advancement: [221], level: 30, name: "IL_WIZARD" },
  221: { advancement: [222], level: 50, name: "IL_MAGE" },
  222: { advancement: [], level: 70, name: "IL_ARCHMAGE" },
  230: { advancement: [231], level: 10, name: "CLERIC" },
  231: { advancement: [232], level: 30, name: "PRIEST" },
  232: { advancement: [], level: 70, name: "BISHOP" },
  300: { advancement: [310, 320], level: 10, name: "BOWMAN" },
  310: { advancement: [311], level: 30, name: "HUNTER" },
  311: { advancement: [312], level: 50, name: "RANGER" },
  312: { advancement: [], level: 70, name: "BOWMASTER" },
  320: { advancement: [321], level: 30, name: "CROSSBOWMAN" },
  321: { advancement: [322], level: 50, name: "SNIPER" },
  322: { advancement: [], level: 70, name: "MARKSMAN" },
  400: { advancement: [410, 420], level: 10, name: "THIEF" },
  410: { advancement: [411], level: 30, name: "ASSASSIN" },
  411: { advancement: [412], level: 50, name: "HERMIT" },
  412: { advancement: [], level: 70, name: "NIGHTLORD" },
  420: { advancement: [421], level: 30, name: "BANDIT" },
  421: { advancement: [422], level: 50, name: "CHIEFBANDIT" },
  422: { advancement: [], level: 70, name: "SHADOWER" },
  500: { advancement: [510, 520], level: 10, name: "PIRATE" },
  510: { advancement: [511], level: 30, name: "BRAWLER" },
  511: { advancement: [512], level: 50, name: "MARAUDER" },
  512: { advancement: [], level: 70, name: "BUCCANEER" },
  520: { advancement: [521], level: 30, name: "GUNSLINGER" },
  521: { advancement: [522], level: 50, name: "OUTLAW" },
  522: { advancement: [], level: 70, name: "CORSAIR" },
  800: { advancement: [], level: 30, name: "MAPLELEAF_BRIGADIER" },
  900: { advancement: [], level: 1, name: "GM" },
  910: { advancement: [], level: 1, name: "SUPERGM" },
  1000: { advancement: [1100, 1200, 1300, 1400, 1500], level: 10, name: "NOBLESSE" },
  1100: { advancement: [1110], level: 10, name: "DAWNWARRIOR1" },
  1110: { advancement: [1111], level: 30, name: "DAWNWARRIOR2" },
  1111: { advancement: [1112], level: 50, name: "DAWNWARRIOR3" },
  1112: { advancement: [], level: 70, name: "DAWNWARRIOR4" },
  1200: { advancement: [1210], level: 10, name: "BLAZEWIZARD1" },
  1210: { advancement: [1211], level: 30, name: "BLAZEWIZARD2" },
  1211: { advancement: [1212], level: 50, name: "BLAZEWIZARD3" },
  1212: { advancement: [], level: 70, name: "BLAZEWIZARD4" },
  1300: { advancement: [1310], level: 10, name: "WINDARCHER1" },
  1310: { advancement: [1311], level: 30, name: "WINDARCHER2" },
  1311: { advancement: [1312], level: 50, name: "WINDARCHER3" },
  1312: { advancement: [], level: 70, name: "WINDARCHER4" },
  1400: { advancement: [1410], level: 10, name: "NIGHTWALKER1" },
  1410: { advancement: [1411], level: 30, name: "NIGHTWALKER2" },
  1411: { advancement: [1412], level: 50, name: "NIGHTWALKER3" },
  1412: { advancement: [], level: 70, name: "NIGHTWALKER4" },
  1500: { advancement: [1510], level: 10, name: "THUNDERBREAKER1" },
  1510: { advancement: [1511], level: 30, name: "THUNDERBREAKER2" },
  1511: { advancement: [1512], level: 50, name: "THUNDERBREAKER3" },
  1512: { advancement: [], level: 70, name: "THUNDERBREAKER4" },
  2000: { advancement: [2100, 2200], level: 10, name: "LEGEND" },
  2001: { advancement: [2100, 2200], level: 10, name: "EVAN" },
  2100: { advancement: [2110], level: 10, name: "ARAN1" },
  2110: { advancement: [2111], level: 30, name: "ARAN2" },
  2111: { advancement: [2112], level: 50, name: "ARAN3" },
  2112: { advancement: [], level: 70, name: "ARAN4" },
  2200: { advancement: [2210], level: 10, name: "EVAN1" },
  2210: { advancement: [2211], level: 30, name: "EVAN2" },
  2211: { advancement: [2212], level: 50, name: "EVAN3" },
  2212: { advancement: [2213], level: 70, name: "EVAN4" },
  2213: { advancement: [2214], level: 80, name: "EVAN5" },
  2214: { advancement: [2215], level: 90, name: "EVAN6" },
  2215: { advancement: [2216], level: 100, name: "EVAN7" },
  2216: { advancement: [2217], level: 110, name: "EVAN8" },
  2217: { advancement: [2218], level: 120, name: "EVAN9" },
  2218: { advancement: [], level: 130, name: "EVAN10" },
};
