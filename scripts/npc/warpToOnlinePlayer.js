var state = "MENU";
var playerList = [];

function start() {
  playerList = [];
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (selection == -1) {
    cm.dispose();
    return;
  }

  if (state == "MENU") {
    var players = cm.getClientInstance().getChannelServer().getPlayerStorage().getAllCharacters();
    var options = [];

    players.sort(function (a, b) {
      return a > b ? 1 : -1;
    });

    for (var i = 0; i < players.length; i++) {
      if (players[i].getName() == cm.getPlayer().getName()) continue;
      playerList.push(players[i]);

      var mapName = players[i].getMap().getMapName();
      options.push("#L" + i + "#" + players[i].getName() + " - " + mapName + "#l");
    }

    if (options.length == 0) {
      options = ["#L0#So lonely~ nobody online#l"];
    }

    cm.sendSimple("Select a player to warp to his/her map!\r\n" + options.join("\r\n"));
    state = "WARP_TO";
  } else if (state == "WARP_TO") {
    var selectedPlayer = playerList[selection];
    if (!selectedPlayer) {
      cm.getPlayer().message("failed to warp to player");
      state = "DISPOSE";
      return;
    }

    var map = selectedPlayer.getMap();

    if (map) {
      var me = cm.getPlayer();
      me.saveLocationOnWarp();
      me.forceChangeMap(map, map.findClosestPortal(selectedPlayer.getPosition()));
    }

    cm.dispose();
    return;
  } else {
    cm.dispose();
    return;
  }
}
