var status;
var sel;

var POWER_ELIXIR = 2000005;

var commands = [
  {
    msg: "Open moi special shop huehuehue",
    fx: function () {
      cm.openShopNPC(1337);
    },
  },
  {
    msg: "Fahoi gib chu some " + itemName(POWER_ELIXIR) + " x100",
    fx: function () {
      cm.giveItem(2000005, 100);
    },
  },
  {
    msg: "Be stonk like fahoi and get all skills",
    fx: function () {
      cm.maxMastery();
    },
  },
  {
    msg: "Change job for chu?",
    fx: function () {
      cm.sendOk("type @jobchange");
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
  status++;

  if (status == 0) {
    if (sel == -1) sel = selection;

    if (sel >= 0 && sel < commands.length) {
      commands[sel].fx();
    }
  }

  cm.getCurrentPlayer().message("selection: " + selection);
  cm.dispose();
}
