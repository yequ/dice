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
    history: [],
    isCovered: true,
    isHolding: false,
    lastResult: null  // 存储上一次的结果
  },

  // 用户点击右上角分享
  onShareAppMessage: function() {
    const diceResult = this.data.lastResult || '1 1 1';
    return {
      title: `我掷出了 ${diceResult}，来试试你的手气！`,
      path: '/pages/index/index'
    }
  },

  // 用户点击右上角分享到朋友圈
  onShareTimeline: function() {
    const diceResult = this.data.lastResult || '1 1 1';
    return {
      title: `骰子游戏：我掷出了 ${diceResult}，来试试你的手气！`,
      query: ''
    }
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

    // 如果有上一次的结果，添加到历史记录
    if (that.data.lastResult) {
      const history = that.data.history.slice(0, 9);
      history.unshift(that.data.lastResult);
      that.setData({
        history: history
      });
    }
    
    that.setData({
      rolling: true,
      isCovered: false  // 摇骰子时取消遮挡
    });

    let rollCount = 0;
    const maxRolls = 10;

    function doRoll() {
      if (rollCount >= maxRolls) {
        const finalDiceList = that.data.diceList;
        const historyItem = finalDiceList.join(' ');
        
        that.setData({
          rolling: false,
          isCovered: true,  // 摇完后自动遮挡
          lastResult: historyItem  // 保存这次的结果
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
  },

  // 切换遮挡状态
  toggleCover: function(e) {
    if (this.data.rolling) return;  // 摇动时不允许切换
    
    // 阻止事件冒泡
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    const newCovered = !this.data.isCovered;
    console.log('切换遮挡状态:', newCovered);  // 添加日志便于调试
    
    this.setData({
      isCovered: newCovered
    });
  },

  // 开始按住
  startHolding: function() {
    if (this.data.rolling) return;  // 摇动时不允许操作
    
    this.setData({
      isHolding: true,
      isCovered: false
    });
  },

  // 结束按住
  endHolding: function() {
    if (this.data.rolling) return;  // 摇动时不允许操作
    
    this.setData({
      isHolding: false,
      isCovered: true
    });
  }
});
