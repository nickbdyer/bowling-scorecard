'use strict';

var Scorecard = require('../src/Scorecard');
var Frame = require('../src/Frame');
var FrameTen = require('../src/FrameTen');

describe('Scorecard', function() {

  var scorecard, frame, frame10;


  beforeEach(function(){
    scorecard = new Scorecard();
    scorecard.create(Frame);
  });

  it('should be able to create a set of 10 frames', function() {
    expect(scorecard.frames.length).toEqual(10);
  });

  it('should be instantiated with no points', function(){
    expect(scorecard.score()).toEqual(0);
  });

  it('should be able to detemine the current score after shots', function(){
    scorecard.frames[0].receiveShot(5);
    scorecard.frames[0].receiveShot(3);
    scorecard.frames[1].receiveShot(3);
    scorecard.frames[1].receiveShot(3);
    expect(scorecard.score()).toEqual(14);
  });

  it('should not be able to create more than 10 frames', function(){
    expect( function(){ scorecard.create(Frame); } ).toThrow(new Error("No more frames available, create a new game to play again."));
  });

  it('should update a frames score if it was a spare', function() {
    scorecard.frames[0].receiveShot(5);
    scorecard.frames[0].receiveShot(5);
    scorecard.frames[1].receiveShot(6);
    scorecard.frames[1].receiveShot(3);
    scorecard.evaluateScores();
    expect(scorecard.frames[0].score).toEqual(16);
  });

  it('should update a frames score if it was a strike', function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(6);
    scorecard.frames[1].receiveShot(3);
    scorecard.evaluateScores();
    expect(scorecard.frames[0].score).toEqual(19);
  });

  it('should update a frames score correctly with two strikes in a row', function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(10);
    scorecard.frames[2].receiveShot(10);
    scorecard.evaluateScores();
    expect(scorecard.frames[0].score).toEqual(30);
  });

  it('should deal with a strike in frame 9 and 10 correctly', function() {
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(5);
    scorecard.evaluateScores();
    expect(scorecard.frames[8].score).toEqual(25);
  });

  it('should deal with a spare in frame 10 correctly', function() {
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(6);
    scorecard.evaluateScores();
    expect(scorecard.frames[9].score).toEqual(16);
  });

  it('should deal with a frame 10 correctly', function() {
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(3);
    scorecard.evaluateScores();
    expect(scorecard.frames[9].score).toEqual(8);
  });

  it('should work for a full game', function() {
    scorecard.frames[0].receiveShot(1);
    scorecard.frames[0].receiveShot(4);
    scorecard.frames[1].receiveShot(4);
    scorecard.frames[1].receiveShot(5);
    scorecard.frames[2].receiveShot(6);
    scorecard.frames[2].receiveShot(4);
    scorecard.frames[3].receiveShot(5);
    scorecard.frames[3].receiveShot(5);
    scorecard.frames[4].receiveShot(10);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[5].receiveShot(1);
    scorecard.frames[6].receiveShot(7);
    scorecard.frames[6].receiveShot(3);
    scorecard.frames[7].receiveShot(6);
    scorecard.frames[7].receiveShot(4);
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(2);
    scorecard.frames[9].receiveShot(8);
    scorecard.frames[9].receiveShot(6);
    scorecard.evaluateScores();
    expect(scorecard.score()).toEqual(133);
  });
  
  it('should work for a gutter game', function() {
    scorecard.frames[0].receiveShot(0);
    scorecard.frames[0].receiveShot(0);
    scorecard.frames[1].receiveShot(0);
    scorecard.frames[1].receiveShot(0);
    scorecard.frames[2].receiveShot(0);
    scorecard.frames[2].receiveShot(0);
    scorecard.frames[3].receiveShot(0);
    scorecard.frames[3].receiveShot(0);
    scorecard.frames[4].receiveShot(0);
    scorecard.frames[4].receiveShot(0);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[6].receiveShot(0);
    scorecard.frames[6].receiveShot(0);
    scorecard.frames[7].receiveShot(0);
    scorecard.frames[7].receiveShot(0);
    scorecard.frames[8].receiveShot(0);
    scorecard.frames[8].receiveShot(0);
    scorecard.frames[9].receiveShot(0);
    scorecard.frames[9].receiveShot(0);
    scorecard.evaluateScores();
    expect(scorecard.score()).toEqual(0);
  });

  it('should work for a perfect game', function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(10);
    scorecard.frames[2].receiveShot(10);
    scorecard.frames[3].receiveShot(10);
    scorecard.frames[4].receiveShot(10);
    scorecard.frames[5].receiveShot(10);
    scorecard.frames[6].receiveShot(10);
    scorecard.frames[7].receiveShot(10);
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.evaluateScores();
    expect(scorecard.score()).toEqual(300);
  });

});