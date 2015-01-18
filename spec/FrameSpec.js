'use strict';

var Frame = require('../src/Frame.js');
var FrameTen = require('../src/FrameTen.js');

describe('Frame', function() {

  var frame;
  var frame10;

    beforeEach(function(){ 
      frame = new Frame();
    });

    it('should be instantiated with 10 pins', function(){
      expect(frame.pinCount).toEqual(10);
    });


    it('should receive a throw', function(){
      frame.receiveShot(3);
      expect(frame.pinCount).toEqual(7);
    });


    it('should only receive 2 throws', function() {
      frame.receiveShot(2);
      frame.receiveShot(2);
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."));
    });

    it('should only receive 2 throws totalling 10 points', function() {
      frame.receiveShot(9);
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can only hit 10 pins per frame."));
    });

    it('should be able to keep track of the score for each shot', function() {
      frame.receiveShot(3);
      frame.receiveShot(4);
      expect(frame.firstShot).toEqual(3);
      expect(frame.secondShot).toEqual(4);
    });

    it ('should know if it is a spare', function() {
      frame.receiveShot(4);
      frame.receiveShot(6);
      expect(frame.isSpare()).toBe(true);
    });

    it ('should know if it is a strike', function() {
      frame.receiveShot(10);
      expect(frame.isStrike()).toBe(true);
    });


    it ('should only allow 2 shots in frame 10 without a strike or spare', function() {
      frame10 = new FrameTen();
      frame10.isFrame10 = true;
      frame10.receiveShot(2);
      frame10.receiveShot(2);
      expect( function(){ frame10.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."));
    });

    it ('should only allow 3 shots in frame 10 with a strike', function() {
      frame10 = new FrameTen();
      frame10.isFrame10 = true;
      frame10.receiveShot(10);
      frame10.receiveShot(5);
      frame10.receiveShot(2);
      expect( function(){ frame10.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."));

    });

    it ('should only allow 3 shots in frame 10 with a spare', function() {
      frame10 = new FrameTen();
      frame10.isFrame10 = true;
      frame10.receiveShot(5);
      frame10.receiveShot(5);
      frame10.receiveShot(5);
      expect( function(){ frame10.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."));
    });


  });