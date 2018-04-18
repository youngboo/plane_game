// 元素
var container = document.getElementById('game');
/**
 * 整个游戏对象
 */
var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @param  {object} opts
     * @return {[type]}      [description]
     */
    init: function (opts) {
        this.status = CONFIG.status;
        this.options = opts;
        this.level = 5;
        this.bindEvent();
        this.score = 0;
        let gameLevel = document.querySelector('.game-level');
        gameLevel.innerHTML = "当前Level: "+this.level;
        return this;
    },
    bindEvent: function () {
        var self = this;
        var playBtn = document.querySelector('.js-play');
        // 开始游戏按钮绑定
        playBtn.onclick = function () {
            self.play(self.level);
        };
        var rePlayBtn = document.querySelector('#replay');
        // 暂停后开始游戏按钮绑定
        rePlayBtn.onclick = function () {
            self.replay();
        };
        var replayBtn = document.querySelector('.js-replay');
        // 重新开始游戏按钮绑定
        replayBtn.onclick = function () {
            self.play(self.level);
            self.score = 0;
        };
        var replayAllBtn = document.querySelector('.js-replay-all');
        // 全部重新开始游戏按钮绑定
        replayAllBtn.onclick = function () {
            self.replayAll();
        };
        var nextBtn = document.querySelector('.js-next');
        // 下一关开始游戏按钮绑定
        nextBtn.onclick = function () {
            self.play(self.level);
        };
        window.onkeydown = function (e) {
            let key = e.keyCode || e.which || e.charCode;
            switch (key){
                case 80:
                    self.switchStop(true);
                    break;
            }
        }
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
    setStatus: function (status) {
        this.status = status;
        container.setAttribute("data-status", status);
    },
    play: function (level) {
        this.setStatus('playing');
        this.enemy = ENEMY.init(level);
        this.plane = PLANE.init();
        this.draw();
        playing();
    },
    switchStop:function (stop) {
        if(stop){
            if(this.status == "playing"){
                this.setStatus("stop");
            }
        }else{
            this.setStatus("playing");
        }
    },
    replay:function () {
        this.switchStop(false);
        this.draw();
        playing();
    },
    replayAll:function () {
       this.play(CONFIG.level);
       this.score = 0;
    },
    drawScore() {
        context.font = '18px Verdana,Arial,sans-serif';
        context.fillStyle = "#fff";
        context.fillText('分数：' + this.score, 20, 20);
    },
    /**
     * 绘制之前的事件处理
     */
    preDraw:function () {
        this.judeGameStatus();
        this.shotting();
    },
    draw: function () {
        this.preDraw();
        this.drawScore();
        this.drawPlane();
        this.drawEnemy();
    },
    drawPlane:function () {
        this.getPlane().draw();
    },
    drawEnemy:function () {
        this.enemy.draw();
    },
    getPlane: function () {
        if (this.plane) {
            return this.plane
        } else {
            this.plane = PLANE.init();
            return this.plane;
        }

    },
    judeGameStatus:function () {
        if(this.enemy.enemies.length <= 0){
            this.success();
        }else {
            let enemyTop = this.enemy.move();
            if(enemyTop > this.plane.top){
                this.setStatus('failed');
                document.getElementsByClassName('score')[0].innerHTML = this.score;
            }
        }

    },
    success:function(){
        let levelInfo = document.querySelector('#game-next-level');
        this.setStatus('success');
        if(this.level < CONFIG.totalLevel){
            this.level += 1;
            levelInfo.innerHTML = "下一个Level： "+this.level;
        }else if(this.level == CONFIG.totalLevel){
            this.setStatus('all-success');
        }


    },
    /**
     * 子弹与敌人相撞
     * 并计分
     */
    shotting: function () {
        if (this.plane.bullets.length < 0) {
            return;
        }
        this.enemy.enemies.forEach((enemy) => {
            this.plane.bullets.forEach((bullet, indexBullet) => {
                if (enemy.top + CONFIG.enemySize > bullet.top
                    && enemy.left < bullet.left
                    && enemy.left + CONFIG.enemySize > bullet.left && !enemy.dead) {
                    this.plane.bullets.splice(indexBullet, 1);
                    enemy.dead = true;
                    enemy.boom = 0;
                    enemy.src = CONFIG.enemyBoomIcon;
                    this.score += 1;
                }
            })
        });
    }

};

var PLANE = {
    init: function () {
        this.left = canvas.width / 2;
        this.top = canvas.height - CONFIG.planeSize.height - 30;
        this.planeIcon = CONFIG.planeIcon;
        this.planeSpeed = CONFIG.planeSpeed;
        this.planeSize = CONFIG.planeSize;
        this.direct = 'right';
        this.key = null;
        this.bullets = [];
        this.bindEvent();

        return this;
    },
    move: function () {
        if (this.key != null) {
            this.direct = '';
            return;
        }
        if (this.direct == 'left') {
            this.left--;
            if (this.left < 0) {
                this.direct = 'right';
            }
        }
        if (this.direct == 'right') {
            this.left++;
            if (this.left > canvas.width) {
                this.direct = 'left';
            }

        }

    },
    /**
     * 绑定键盘事件
     */
    bindEvent: function () {
        var self = this;
        document.onkeydown = function (e) {
            this.key = e.keyCode || e.which || e.charCode;
            switch (this.key) {
                //方向键上
                case 38:
                    self.shoot();
                    break;
               /* //方向键左上
                case 38 && 37:
                    self.shoot();
                    self.left -= CONFIG.planeSpeed;
                    break;
                //方向键右上
                case 38 && 39:
                    self.shoot();
                    self.left += CONFIG.planeSpeed;
                    break;*/
                //方向键左
                case 37:
                    self.left -= CONFIG.planeSpeed;
                    break;
                //方向键右
                case 39:
                    self.left += CONFIG.planeSpeed;
                    break;
                //空格键
                case 32:
                    self.shoot();
                    break;
            }
        }
    },
    /**
     * 限制出界
     */
    limitArea: function () {
        let maxTop = canvas.height - this.planeSize.height - 130;
        let minTop = canvas.height - this.planeSize.height - 30;
        let maxWidth = canvas.width - this.planeSize.width - 30;
        if (this.top < maxTop) {
            this.top = maxTop;
        }
        if (this.top > minTop) {
            this.top = minTop;
        }
        if (this.left > maxWidth) {
            this.left = maxWidth;
        }
        if (this.left < 30) {
            this.left = 30;
        }
    },
    draw: function () {
        if (this.bullets) {
            context.lineWidth = 1;
            context.strokeStyle = 'white';
            for (var bullet of this.bullets) {
                if (bullet.top < 0) {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                    continue;
                }
                bullet.top = bullet.top - CONFIG.bulletSpeed;
                context.beginPath();
                context.moveTo(bullet.left, bullet.top);
                context.lineTo(bullet.left, bullet.top - CONFIG.bulletSize);
                context.closePath();
                context.stroke();
            }
        }
        this.limitArea();
        let image = this.getImage();
        context.drawImage(image, this.left, this.top, this.planeSize.width, this.planeSize.height);
    },
    getImage: function () {
        if (this.image) {
            return this.image;
        } else {
            this.image = new Image();
            this.image.src = this.planeIcon;
            return this.image;
        }
    },
    shoot: function () {
        this.bullets = this.getBullets();
        this.bullets.push({
            top: this.top,
            left: this.left + this.planeSize.width / 2
        });
    },
    getBullets: function () {
        if (this.bullets) {
            return this.bullets;
        } else {
            this.bullets = new Array();
            return this.bullets;
        }
    }

};
var ENEMY = {
    init: function (level) {
        this.enemyDirection = CONFIG.enemyDirection;
        this.enemies = new Array();
        for (var i = 0; i < 7*level; i++) {
            this.enemies.push({
                left: 30 + CONFIG.enemySize * (i % 7)+ CONFIG.enemyGap,
                top: 30 + (Math.floor((i / 7)) * 50),
                boom: 0,
                dead: false,
                src : CONFIG.enemyIcon
            });

        }
        console.log(this.enemies);
        return this;
    },
    draw: function () {
        var image = this.getImage();
        this.enemies.forEach((enemy, index) => {
            image.src = enemy.src;
            if (enemy.dead && enemy.boom < 10) {
                context.drawImage(image, enemy.left, enemy.top, CONFIG.enemySize, CONFIG.enemySize);
                enemy.boom += 1;
            } else {
                context.drawImage(image, enemy.left, enemy.top, CONFIG.enemySize, CONFIG.enemySize);
            }
            if (enemy.dead && enemy.boom >= 10) {
                this.enemies.splice(index, 1);
            }
        });
    },
    getImage: function () {
        if (this.image) {
            return this.image;
        } else {
            this.image = new Image();
            return this.image;
        }
    },
    /**
     * 时刻变化的敌人
     * 如果是向右走，获取最右边敌人的坐标，并判断是否触边
     * 如果是向左走，则判断最左边敌人是否触边。
     * 上面两个判断为触边，则整体向下移动并改变方向
     */
    move: function () {
        let maxLeft = canvas.width - 50 - 30;
        let minLeft = 30;
        let maxTop = canvas.height - CONFIG.planeSize.height - 30;
        let enemyTop = 0;
        this.enemies.forEach((enemy) => {
            enemyTop = enemy.top;
            if (this.enemyDirection == 'right') {
                if (enemy.left > maxLeft) {
                    this.enemies.forEach((enemy) => {
                        enemy.top += 50;
                    });
                    this.enemyDirection = 'left';
                } else {
                    enemy.left += 2;
                }
            } else if (this.enemyDirection == 'left') {
                if (enemy.left < minLeft) {
                    this.enemies.forEach((enemy) => {
                        enemy.top += 50;
                    });
                    this.enemyDirection = 'right';
                } else {
                    enemy.left -= 2;
                }
            }
        });

        return enemyTop;
    }
};
// 初始化
//GAME.init(CONFIG);
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };
/**
 * 进入游戏开始第一件事就是加载配置并绘制第一帧游戏画面
 *
 * 每帧重绘一次整个界面，监听移动事件和暂停事件
 * 游戏事件：查看敌人移动轨迹和子弹与敌人相撞事件，决定游戏是否结束
 *
 * 敌人： 绘制，移动，一直移动到最下方
 *
 * 飞机： 监听键盘移动，并射出子弹
 *
 *监听暂停事件，如果暂停，停止帧，反之，继续帧
 *
 */

var game = GAME.init(CONFIG);

//游戏逐帧循环函数
function playing() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    if(game.status == 'playing'){
        game.draw();
        if(game.status != 'stop'){
            requestAnimFrame(playing);
        }
    }
}


