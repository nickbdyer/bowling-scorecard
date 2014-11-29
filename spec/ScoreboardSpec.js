describe('Scorecard', function() {

  var scorecard;

  beforeEach(function(){
    scorecard = new Scorecard();
  });

  it('should be able to create a frame', function() {
    scorecard.create(Frame);
    expect((scorecard.frames[1]).pinCount).toEqual(10);
  });

  it('should know how many frames it has created', function(){
    scorecard.create(Frame);
    scorecard.create(Frame);
    scorecard.create(Frame);
    scorecard.create(Frame);
    expect(scorecard.frameCount()).toEqual(4);
  });

  it('should be able to detemine the current score', function(){
    scorecard.create(Frame);
    scorecard.create(Frame);
    expect(scorecard.frameCount()).toEqual(2);
    expect(scorecard.score()).toEqual(0);
  });

  it('should be able to detemine the current score after shots', function(){
    scorecard.create(Frame);
    scorecard.create(Frame);
    scorecard.frames[1].receiveShot(5);
    scorecard.frames[1].receiveShot(3);
    scorecard.frames[2].receiveShot(3);
    scorecard.frames[2].receiveShot(3);
    expect(scorecard.frameCount()).toEqual(2);
    expect(scorecard.score()).toEqual(14);
  });

  it('should not be able to create more than 10 frames', function(){
    for (i = 0; i < 10; i++) { scorecard.create(Frame) };
    expect( function(){ scorecard.create(Frame)} ).toThrow(new Error("No more frames available, create a new game to play again."));
  });

  it('should update a frames score if it was a spare', function() {
    scorecard.create(Frame);
    scorecard.create(Frame);
    scorecard.frames[1].receiveShot(5);
    scorecard.frames[1].receiveShot(5);
    scorecard.frames[2].receiveShot(6);
    scorecard.frames[2].receiveShot(3);
    scorecard.evaluateScores();
    expect(scorecard.frames[1].score).toEqual(16);
  });

  it('should update a frames score if it was a spare', function() {
    scorecard.create(Frame);
    scorecard.create(Frame);
    scorecard.frames[1].receiveShot(10);
    scorecard.frames[2].receiveShot(6);
    scorecard.frames[2].receiveShot(3);
    console.log(scorecard)
    scorecard.evaluateScores();
    expect(scorecard.frames[1].score).toEqual(19);
  });


});