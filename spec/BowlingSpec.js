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




  });





});