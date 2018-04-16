// 元素
var container = document.getElementById('game');
var CONFIG = {
    status: 'start', // 游戏开始默认为开始中
    level: 1, // 游戏默认等级
    totalLevel: 6, // 总共6关
    numPerLine: 6, // 游戏默认每行多少个怪兽
    canvasPadding: 30, // 默认画布的间隔
    bulletSize: 10, // 默认子弹长度
    bulletSpeed: 10, // 默认子弹的移动速度
    enemySpeed: 2, // 默认敌人移动距离
    enemySize: 50, // 默认敌人的尺寸
    enemyGap: 10,  // 默认敌人之间的间距
    enemyIcon: './img/enemy.png', // 怪兽的图像
    enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
    enemyDirection: 'right', // 默认敌人一开始往右移动
    planeSpeed: 5, // 默认飞机每一步移动的距离
    planeSize: {
        width: 60,
        height: 100
    }, // 默认飞机的尺寸,
    planeIcon: './img/plane.png',
};
/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  init: function(opts) {
    this.status = 'start';
    this.options = opts;

    this.bindEvent();
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.play();
    };
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function() {
    this.setStatus('playing');
    this.plane = PLANE.init();
    this.draw();
  }
    /**
     * 进入游戏开始第一件事就是加载配置并绘制第一帧游戏画面
     *
     * 每帧重绘一次整个界面，监听移动事件和暂停事件
     * 子弹监听事件：如果是子弹碰到敌人，计分+1，销毁该子弹
     *              子弹超出移动范围，销毁该子弹
     * 敌人监听事件： 敌人碰到墙壁没出移动范围，根据规则继续移动
     *               敌人移动出范围，游戏失败
     *               被子弹碰到，敌人爆炸并删除
     * 飞机监听事件： 飞机移动超过范围，则不再向超出的范围移动
     *                按下空格键，发射一枚子弹，子弹竖直向上移动
     *  游戏监听事件：  敌人数量为0 游戏成功，暂停并绘制成功页面
     *
     *
     *
     */
  ,draw: function () {

    }
};

var PLANE ={
  init:function () {
      this.left = canvas.width/2;
      this.top = canvas.height - 100;
      this.planeIcon = CONFIG.planeIcon;
      this.planeSpeed = CONFIG.planeSpeed;
      this.planeSize = CONFIG.planeSize;
      this.bindEvent();
      this.draw(context);
      return this;
  },
    /**
     * 绑定键盘事件
     */
    bindEvent:function () {
        document.onkey
    },
    /**
     * 是否出界
     */
    isOverArea:function () {
        if (this.plane.top < 300 ){
          this.plane.top = 300;
        }
    },
    draw:function (context) {
      var image = new Image();
          image.src = this.planeIcon;
          console.log(this.planeIcon);
        var that = this;
      image.onload = function () {
          context.drawImage(image,that.left,that.top,that.planeSize.width,that.planeSize.height);
      };



    }

};
// 初始化
GAME.init(CONFIG);
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');