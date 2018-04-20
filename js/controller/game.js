/**
 * 整个游戏对象
 */
var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @return {[type]}      [description]
     */
    init: function () {
        this.status = CONFIG.status;
        this.level = CONFIG.level;
        this.bindEvent();
        this.score = 0;
        this.stop = false;
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
        var stopRePlayBtn = document.querySelector('.stop-replay');
        // 暂停后开始游戏按钮绑定
        stopRePlayBtn.onclick = function () {
            self.switchStop();
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
        //暂停事件绑定
        window.onkeydown = function (e) {
            let key = e.keyCode || e.which || e.charCode;
            switch (key){
                case 80:
                    self.switchStop();
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
    /**
     * 开始游戏，需要初始化飞机和敌人
     * @param level 开始第几关
     */
    play: function (level) {
        this.setStatus('playing');
        this.enemy = ENEMY.init(level);
        this.plane = PLANE.init();
        this.drawInfo();
        this.draw();
        playing();
    },
    drawInfo:function () {
        //暂停提示
        context.font = '18px Verdana,Arial,sans-serif';
        context.fillStyle = "#fff";
        context.fillText('按P键暂停', canvas.width-100, 20);
    },
    /**
     * 切换暂停
     * @param stop
     */
    switchStop:function () {
        this.stop = !this.stop;
        if(this.stop){
            this.setStatus("stop");
        }else{
            this.setStatus("playing");
            this.draw();
            playing();
        }
    },
    /**
     * 重新开始整个游戏
     */
    replayAll:function () {
        this.play(CONFIG.level);
        this.score = 0;
    },
    drawScore() {
        //分数
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
    /**
     * 所有需要逐帧运行和绘制的内容
     */
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
    /**
     * 游戏整个状态的判断
     * success
     * failed
     * stop
     * ...
     */
    judeGameStatus:function () {
        if(this.enemy.enemies.length <= 0){
            this.success();
        }else {
            let enemyTop = this.enemy.move();
            if(enemyTop > this.plane.top){
                this.setStatus('failed');
                document.querySelector('.score')[0].innerHTML = this.score;
            }
        }

    },
    /**
     * 游戏成功
     * 判断是否到最后一关
     * 没有则关数加一
     */
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
                    //敌人爆炸图像
                    enemy.image.src = CONFIG.enemyBoomIcon;
                    //计分
                    this.score += 1;
                }
            })
        });
    }

};
