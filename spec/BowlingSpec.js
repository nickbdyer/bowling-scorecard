describe ('Bowling Scorecard', function() {

  describe('Frame', function() {

    it('should be instantiated with 10 pins', function(){
      var frame = new Frame();
      expect(frame.pinCount).toEqual(10);
    });


    it('should receive a throw', function(){
      var frame = new Frame();
      frame.receiveShot(3);
      expect(frame.pinCount).toEqual(7);
    });


    it('should only receive 2 throws', function() {
      var frame = new Frame();
      frame.receiveShot(2);
      frame.receiveShot(2);
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can not receive another shot in this frame."))
    });

    it('should only receive 2 throws totalling 10 points', function() {
      var frame = new Frame();
      frame.receiveShot(9);
      expect( function(){ frame.receiveShot(2);} ).toThrow(new Error("You can only hit 10 pins per frame."))
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


});