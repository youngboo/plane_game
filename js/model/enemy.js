/**
 * 把所有的敌人看作一个对象
 * @type {{init: ENEMY.init, draw: ENEMY.draw, getEnemyImage: ENEMY.getEnemyImage, move: ENEMY.move}}
 */
var ENEMY = {
    /**
     *
     * @param level 根据关卡的不同，生成不同数量的敌人
     * @returns {ENEMY} 返回敌人对象
     */
    init: function (level) {
        this.enemyDirection = CONFIG.enemyDirection;
        this.enemySize = CONFIG.enemySize ? CONFIG.enemySize : 50;
        this.enemySpeed = CONFIG.enemySpeed ? CONFIG.enemySpeed : 2;
        this.maxLeft = canvas.width - this.enemySize - CONFIG.canvasPadding;
        this.minLeft = CONFIG.canvasPadding;
        this.maxTop = canvas.height - CONFIG.canvasPadding *2 - CONFIG.planeSize.height;
        this.numPerLine = CONFIG.numPerLine > 9 ? 9 : CONFIG.numPerLine;
        this.enemyGap = this.getMaxGap();
        this.enemyImage = this.getEnemyImage();
        this.boomImage = this.getBoomImage();
        this.enemies = new Array();
        for (var i = 0; i < this.numPerLine*level; i++) {
            this.enemies.push({
                left: CONFIG.canvasPadding + ((this.enemySize + this.enemyGap) * (i % this.numPerLine)) ,
                top: CONFIG.canvasPadding + (Math.floor((i / this.numPerLine)) * this.enemySize),
                boom: 0,
                dead: false,
                image: this.enemyImage
            });
        }
        return this;
    },
    draw: function () {
        this.enemies.forEach((enemy) => {
            if(enemy.top <  this.maxTop){
                if (enemy.boom < CONFIG.enemyBoomFrameNumber) {
                    context.drawImage(enemy.image, enemy.left, enemy.top, CONFIG.enemySize, CONFIG.enemySize);
                    if(enemy.dead){
                        enemy.boom += 1;
                    }
                }
            }
        });
    },
    getEnemyImage: function () {
        let image = new Image();
        image.src = CONFIG.enemyBase64;
        return image;
    },
    getBoomImage: function () {
        if(this.boomImage){
            return this.boomImage;
        }else{
            let image = new Image();
            image.src = CONFIG.enemyBoomIcon;
            return image;
        }
    },
    /**
     * 怪兽移动，初始值从配置文件中获取
     * 如果是向右走，获取最右边敌人的坐标，并判断是否触边
     * 如果是向左走，则判断最左边敌人是否触边。
     * 上面两个判断为触边，则整体向下移动并改变方向
     */
    move: function () {
        let maxTop = 0;
        let index = 0;
        while (index < this.enemies.length){
            let enemy = this.enemies[index];
            if(!enemy.dead){
                if(enemy.top > maxTop){
                    maxTop = enemy.top;
                }

                if(enemy.top <= this.maxTop){
                    if(this.enemyDirection == 'right'){
                        if(enemy.left < this.maxLeft){
                            enemy.left += this.enemySpeed;
                        }else{
                            this.enemyDirection = 'left';
                            this.moveDown(enemy);
                        }
                    }else if(this.enemyDirection == 'left'){
                        if (enemy.left > this.minLeft) {
                            enemy.left -= this.enemySpeed;
                        } else {
                            //enemy.left = this.minLeft;
                            this.enemyDirection = 'right';
                            this.moveDown(enemy);
                        }
                    }

                }else {
                    break;
                }
            }
            index ++;
        }
        return maxTop;
    },
    moveDown:function (enemy) {
        this.enemies.forEach((enemy) => {
            enemy.top += 50;
            enemy.left -= this.enemySpeed;
        });
        enemy.left += this.enemySpeed;
    },
    getMaxGap:function () {
        let enemyGap = CONFIG.enemyGap;
        //每行敌人的宽度
        let enemyWidth = this.enemySize * this.numPerLine + CONFIG.enemyGap*(this.numPerLine - 1);
        let maxWidth = canvas.width - CONFIG.canvasPadding * 2 - 50;
        if(enemyWidth > maxWidth){
            enemyGap = Math.floor((maxWidth - (this.enemySize * this.numPerLine)) / (this.numPerLine -1));
        }
        return enemyGap;
    }
}
