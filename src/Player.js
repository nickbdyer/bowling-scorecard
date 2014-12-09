'use strict';

function Player() {}

Player.prototype.bowl = function(hitpins, currentframe) {
  currentframe.receiveShot(hitpins);
};

module.exports = Player;