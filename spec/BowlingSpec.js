describe ('Bowling', function() {

  describe('Frame', function() {

    var frame;

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
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."))
    });

    it('should only receive 2 throws totalling 10 points', function() {
      frame.receiveShot(9);
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can only hit 10 pins per frame."))
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


  });

  describe('Player', function() {

    it('should be able to bowl', function(){
      var player = new Player();
      var frame = jasmine.createSpyObj(Frame, ['receiveShot']);
      player.bowl(4, frame);
      expect(frame.receiveShot).toHaveBeenCalled();
    });


  });

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
        console.log(scorecard.frames)
      expect( function(){ scorecard.create(Frame)} ).toThrow(new Error("No more frames available, create a new game to play again."));
    });




  });


});