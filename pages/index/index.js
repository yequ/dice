Page({
  data: {
    diceList: [1, 1, 1],
    diceImages: [
      '/images/dice1.png',
      '/images/dice1.png',
      '/images/dice1.png'
    ],
    diceCount: 3,
    rolling: false,
    history: []
  },

  increaseDice: function() {
    if (this.data.rolling || this.data.diceCount >= 9) return;
    
    const newCount = this.data.diceCount + 1;
    this.updateDiceCount(newCount);
  },

  decreaseDice: function() {
    if (this.data.rolling || this.data.diceCount <= 1) return;
    
    const newCount = this.data.diceCount - 1;
    this.updateDiceCount(newCount);
  },

  updateDiceCount: function(newCount) {
    const newDiceList = Array(newCount).fill(1);
    const newDiceImages = Array(newCount).fill('/images/dice1.png');

    this.setData({
      diceCount: newCount,
      diceList: newDiceList,
      diceImages: newDiceImages
    });
  },

  rollDice: function() {
    if (this.data.rolling) return;
    
    const that = this;
    that.setData({
      rolling: true
    });

    let rollCount = 0;
    const maxRolls = 10;

    function doRoll() {
      if (rollCount >= maxRolls) {
        const finalDiceList = that.data.diceList;
        const historyItem = finalDiceList.join(' ');
        const history = that.data.history.slice(0, 9);
        history.unshift(historyItem);

        that.setData({
          rolling: false,
          history: history
        });
        return;
      }

      const newDiceList = [];
      const newDiceImages = [];
      
      for (let i = 0; i < that.data.diceCount; i++) {
        const num = Math.floor(Math.random() * 6) + 1;
        newDiceList.push(num);
        newDiceImages.push('/images/dice' + num + '.png');
      }

      that.setData({
        diceList: newDiceList,
        diceImages: newDiceImages
      });

      rollCount++;
      setTimeout(doRoll, 100);
    }

    doRoll();
  }
});
