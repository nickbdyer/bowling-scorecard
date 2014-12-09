'use strict';

var Player = require('../src/Player');
var Frame = require('../src/Frame');

describe('Player', function() {

    it('should be able to bowl', function(){
      var player = new Player();
      var frame = jasmine.createSpyObj(Frame, ['receiveShot']);
      player.bowl(4, frame);
      expect(frame.receiveShot).toHaveBeenCalled();
    });

});
