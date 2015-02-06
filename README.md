#Bowling Challenge

[![Code Climate](https://codeclimate.com/github/nickbdyer/bowling-scorecard/badges/gpa.svg)](https://codeclimate.com/github/nickbdyer/bowling-scorecard) [![Test Coverage](https://codeclimate.com/github/nickbdyer/bowling-scorecard/badges/coverage.svg)](https://codeclimate.com/github/nickbdyer/bowling-scorecard)

Week 5 Challenge at Makers Academy

###Challenge

Create a bowling scoring system in Javascript.

A bowling game consists of 10 frames in which the player tries to knock down the 10 pins. In every frame the player can throw one or two times. The actual number depends on strikes and spares. The score of a frame is the number of knocked down pins plus bonuses for strikes and spares. After every frame the 10 pins are reseted.


##Method


####Domain Model

A bowling **game** consists of 10 **frames** in which the **player** tries to knock down the 10 **pins**. In every **frame** the **player** can *throw* one or two times. The actual number depends on *strikes* and *spares*. The *score* of a **frame** is the number of knocked down **pins** plus bonuses for *strikes* and *spares*. After every **frame** the 10 **pins** are *reset*.

####'Classes' (Javascript Functions)

- Game
- Frames
- Player

####Steps Taken

In deciding how the classes should function, I realised that there were two
fundamental ways to approach the problem, either a shot was played and the game
looked back to see if it should be applied as a bonus to a previous shot, or
when a strike or spare was played, the game would look forward to apply bonuses
when they were played. It made more sense to me to use the latter method, and
have the game iterate through the frames to calculate spares and strikes.

In progressing through the challenge, I realised that due to the complications
around Frame 10, it was suitable to take this class out and treat it seperately
to the other frames. 

###Images

![alt text](images/bowling.png
"Bowling")

###Solution

The code speaks for itself, but I do want to highlight one particular issue
I encountered due to the way I approached the problem. And then should how that
was improved through refactoring. It took quite a while to get to where it is
now, but I'm pleased with the solution presented:

#####Initial Code For Calculating Strikes

```sh
Scorecard.prototype.evaluateScores = function() {
  this._evaluateSpare();
  this._evaluateStrike();
};

Scorecard.prototype._evaluateSpare = function() {
  for (i = 0; i < 9; i++) { 
    if (this.frames[i].isSpare() && this.frames[i].isFrame10) {
      this.frames[i].score = 10 + this.frames[i].thirdShot 
    } else if (this.frames[i].isSpare()) {
      this.frames[i].score += this._firstExtraRoll(i)} 
    };
};

Scorecard.prototype._evaluateStrike = function() {
  for (i = 0; i < 9; i++) { 
    if (this._isFrameTenAStrike(i)) {
      this.frames[i].score = (10 + this.frames[i].secondShot + this.frames[i].thirdShot)
    } else if (this.frames[i].isStrike()) {
      this.frames[i].score += (this._firstExtraRoll(i) + this._secondExtraRoll(i)) 
    }
  };
};


Scorecard.prototype._isFrameTenAStrike = function(i) {
  return this.frames[i].isFrame10 && this.frames[i].isStrike();
};

Scorecard.prototype._isFrameNineAndTenAStrike = function(i) {
  return (this.frames[i].isStrike() && this.frames[i+1].isStrike()) && this.frames[i+1].isFrame10;
};

Scorecard.prototype._firstExtraRoll = function(i) {
  return this.frames[i+1].firstShot
};

Scorecard.prototype._secondExtraRoll = function(i) {
  return this.frames[i+1].isFrame10 ? this.frames[i+1].secondShot : 
        this.frames[i+1].isStrike() ? this.frames[i+2].firstShot : 
                                      this.frames[i+1].secondShot;
};

```

#####Final Code for Calculating Strikes

```sh
Scorecard.prototype.evaluateScores = function() {
  for (var i = 0; i < 9; i++) { 
    this._evaluateSpare(i);
    this._evaluateStrike(i);  
  }
};

Scorecard.prototype._evaluateSpare = function(i) {
   if (this.frames[i].isSpare()) { this.frames[i].score += this._firstExtraRoll(i); }
};

Scorecard.prototype._evaluateStrike = function(i) {
   if (this.frames[i].isStrike()) { this.frames[i].score += (this._firstExtraRoll(i) + this._secondExtraRoll(i)); }
};

Scorecard.prototype._firstExtraRoll = function(i) {
  return this.frames[i+1].firstShot;
};

Scorecard.prototype._secondExtraRoll = function(i) {
  return this.frames[i+1].secondShot || this.frames[i+2].firstShot;
};
```

###Improvements

The CSS was not part of the brief, however, I would like to tie it all in
together and get the app to function fully. At the moment the frontend is not
completely linked to the backend. 
