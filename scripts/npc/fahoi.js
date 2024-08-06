var POWER_ELIXIR = 2000005;
var state = "";
var params = [];

var commands = [
  {
    msg: "Open moi special shop huehuehue",
    fx: function () {
      cm.dispose();
      cm.openShopNPC(1337);
      state = "DISPOSE";
    },
  },
  {
    msg: "Fahoi gib chu some " + itemName(POWER_ELIXIR) + " x100",
    fx: function () {
      cm.giveItem(2000005, 100);
      state = "DISPOSE";
    },
  },
  {
    msg: "Change job for chu?",
    fx: function () {
      cm.dispose();
      cm.openNpc(10000, "jobChange");
    },
  },
  {
    msg: "Wow you hit 200? REBIRTH TIME!",
    fx: function () {
      cm.dispose();
      cm.openNpc(9010021);
    },
  },
  {
    msg: "Learn special skills",
    fx: function () {
      cm.dispose();
      cm.openNpc(10000, "learnSkill");
    },
  },
  {
    msg: "Warp nearer to someone now (testing this)!",
    fx: function () {
      cm.dispose();
      cm.openNpc(10000, "warpTo");
    },
  },
  {
    msg: "Clear your inventory quickly",
    fx: function () {
      cm.dispose();
      cm.openNpc(9000041);
    },
  },
];

function itemName(id) {
  return "#z" + id + "#";
}

function itemImage(id) {
  return "#i" + id + "#";
}

function start(c, npc, character) {
  status = -1;
  sel = -1;

  var message = ["Henno #r#h ##k, welcome to moi server, hope chu hab a great taim"];

  for (var i = 0; i < commands.length; i++) {
    message.push("#L" + i + "##b" + commands[i].msg + "#l");
  }

  message = message.join("\r\n");

  cm.sendSimple(message);
}

function action(mode, type, selection) {
  //cm.getCurrentPlayer().message("selection: " + selection +  ", state: " + state);
  switch (state) {
    case "":
      if (selection >= 0 && selection < commands.length) {
        commands[selection].fx();
      }
      cm.getCurrentPlayer().message("empty state");
      break;
    case "DISPOSE":
      cm.getCurrentPlayer().message("disposed");
      cm.dispose();
      break;
    default:
      break;
  }
}
