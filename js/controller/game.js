/**
 * 整个游戏对象
 */
var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @return {[type]}      [description]
     */
    init: function () {
        this.status = CONFIG.status ? CONFIG.status : 'start';
        this.defaultLevel = CONFIG.level ? CONFIG.level : 1;
        this.nowLevel = this.defaultLevel;
        if(!/^[0-9]+$/.test(CONFIG.totalLevel) || CONFIG.totalLevel < 0 || CONFIG.totalLevel > 8){
            this.totalLevel = 6;
        }else{
            this.totalLevel = CONFIG.totalLevel;
        }
        this.bindEvent();
        this.score = 0;
        this.stop = false;
        this.nextLevel = document.querySelector('#game-next-level');
        this.gameLevel = document.querySelector('#game-level');
        this.gameLevel.innerHTML = this.nowLevel;
        return this;
    },
    bindEvent: function () {
        var self = this;
        var playBtn = document.querySelector('.js-play');
        // 开始游戏按钮绑定
        playBtn.onclick = function () {
            self.play(self.nowLevel);
        };
        var stopRePlayBtn = document.querySelector('.stop-replay');
        // 暂停后开始游戏按钮绑定
        stopRePlayBtn.onclick = function () {
            self.switchStop();
        };
        var replayBtn = document.querySelector('.js-replay');
        // 重新开始游戏按钮绑定
        replayBtn.onclick = function () {
            self.replayAll();
        };
        var replayAllBtn = document.querySelector('.js-replay-all');
        // 全部重新开始游戏按钮绑定
        replayAllBtn.onclick = function () {
            self.replayAll();
        };
        var nextBtn = document.querySelector('.js-next');
        // 下一关开始游戏按钮绑定
        nextBtn.onclick = function () {
            self.play(self.nowLevel);
        };

        window.onkeydown = function (e) {
            let key = e.keyCode || e.which || e.charCode;
            switch (key){
                //暂停
                case 80:
                    if(self.status == 'playing' || self.status == 'stop'){
                        self.switchStop();
                    }
                    break;
                //下一关
                case 78:
                    if(self.status == 'success'){
                        self.play(self.nowLevel);
                    }
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
        this.draw();
        playing();
    },
    /**
     * 切换暂停
     * @param stop
     */
    switchStop:function () {
        this.stop = !this.stop;
        if(this.stop){
            if(this.status == "playing"){
                this.setStatus("stop");
            }else {
                return;
            }
        }else{
            if(this.status == "stop"){
                this.setStatus("playing");
                this.draw();
                playing();
            }else {
                return;
            }
        }
    },
    /**
     * 重新开始整个游戏
     */
    replayAll:function () {
        this.nowLevel = this.defaultLevel;
        this.play(this.nowLevel);
        this.score = 0;
    },
    drawInfo() {
        //分数
        context.font = '18px Verdana,Arial,sans-serif';
        context.fillStyle = "#fff";
        context.fillText('分数：' + this.score, 20, 20);
        //暂停提示
        context.font = '18px Verdana,Arial,sans-serif';
        context.fillStyle = "#fff";
        context.fillText('按P键暂停', canvas.width-100, 20);
    },
    /**
     * 绘制之前的事件处理
     */
    preDraw:function () {
        this.shotting();
        this.judeGameStatus();
    },
    /**
     * 所有需要逐帧运行和绘制的内容
     */
    draw: function () {
        this.preDraw();
        this.drawInfo();
        this.drawPlane();
        this.drawEnemy();
    },
    drawPlane:function () {
        this.plane.draw();
    },
    drawEnemy:function () {
        this.enemy.draw();
    },
    /**
     * 游戏整个状态的判断
     * success
     * failed
     * stop
     * ...
     */
    judeGameStatus:function () {
        let success = true;
        this.enemy.enemies.forEach((enemy)=>{
           if(!enemy.dead || enemy.boom < CONFIG.enemyBoomFrameNumber){
              success = false;
            }
        });
        if(success){
            this.success();
        }else {
            let maxTop = this.enemy.move();
            if(maxTop >= this.enemy.maxTop){
                this.setStatus('failed');
                this.writeScore('score');
            }
        }

    },
    /**
     * 游戏成功
     * 判断是否到最后一关
     * 没有则关数加一
     */
    success:function(){
        this.setStatus('success');
        if(this.nowLevel < this.totalLevel){
            this.nowLevel += 1;
            this.writeLevel();
            this.writeScore('now-score');
        }else if(this.nowLevel >= this.totalLevel){
            this.setStatus('all-success');
            this.writeScore('all-score');
            this.nowLevel = this.defaultLevel;
        }else {
            console.log("系统异常，请联系管理员");
        }


    },
    writeScore:function (scoreClass) {
        document.querySelector('.'+scoreClass).innerHTML = this.score;
    },
    writeLevel:function () {
        this.nextLevel.innerHTML = this.nowLevel;
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
                    && enemy.top < bullet.top
                    && enemy.left < bullet.left
                    && enemy.left + CONFIG.enemySize > bullet.left && !enemy.dead) {
                    this.plane.bullets.splice(indexBullet, 1);
                    enemy.dead = true;
                    enemy.boom = 0;
                    //敌人爆炸图像
                    enemy.image = this.enemy.getBoomImage();
                    //计分
                    this.score += 1;
                }
            })
        });
    }

};

