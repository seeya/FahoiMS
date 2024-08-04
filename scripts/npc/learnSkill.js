var state = "MENU";

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (selection == -1) {
    cm.dispose();
    return;
  }

  if (state == "MENU") {
    var options = [];
    for (var i = 0; i < skills.length; i++) {
      options.push("#L" + i + "#" + skills[i].name + "#l");
    }

    cm.sendSimple("Select a skill to learn\r\n" + options.join("\r\n"));
    state = "LEARN_SKILL";
  } else if (state == "LEARN_SKILL") {
    var skillId = skills[selection].id;
    cm.getPlayer().message("Learnt: " + skills[selection].name);
    cm.teachSkill(skillId, 1, 1, -1);

    state = "DISPOSE";
  } else if (state == "DISPOSE") {
    cm.dispose();
    return;
  }
}

var skills = [
  {
    name: "Monster Rider",
    id: 1004,
  },
];
