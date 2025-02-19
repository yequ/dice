Page({
  data: {
    diceList: [1, 1, 1],  // 默认3个骰子
    rolling: false,
    diceImages: [],
    diceCount: 3,  // 当前骰子数量
  },

  onLoad() {
    this.updateDiceImages();
  },

  updateDiceImages() {
    const diceImages = this.data.diceList.map(num => `/images/dice${num}.png`);
    this.setData({ diceImages });
  },

  // 切换骰子数量
  toggleDiceCount() {
    if (this.data.rolling) return;
    
    const newCount = this.data.diceCount === 3 ? 6 : 3;
    const newDiceList = Array(newCount).fill(1);
    
    this.setData({
      diceCount: newCount,
      diceList: newDiceList
    });
    this.updateDiceImages();
  },

  rollDice() {
    if (this.data.rolling) return;
    
    this.setData({
      rolling: true
    });

    // 模拟摇动效果
    let count = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      // 为每个骰子生成随机数
      const newDiceList = this.data.diceList.map(() => Math.floor(Math.random() * 6) + 1);
      
      this.setData({ diceList: newDiceList });
      this.updateDiceImages();
      
      count++;
      if (count >= maxRolls) {
        clearInterval(interval);
        this.setData({
          rolling: false
        });
      }
    }, 100);
  }
})
