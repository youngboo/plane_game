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
        this.maxLeft = canvas.width - CONFIG.enemySize - CONFIG.canvasPadding;
        this.minLeft = CONFIG.canvasPadding;
        this.enemyImage = this.getEnemyImage();
        this.boomImage = this.getBoomImage();
        this.enemies = new Array();
        for (var i = 0; i < 7*level; i++) {
            this.enemies.push({
                left: CONFIG.canvasPadding + CONFIG.enemySize * (i % 7)+ CONFIG.enemyGap,
                top: CONFIG.canvasPadding + (Math.floor((i / 7)) * CONFIG.enemySize),
                boom: 0,
                dead: false,
                image: this.enemyImage
            });

        }
        return this;
    },
    draw: function () {
        this.enemies.forEach((enemy) => {

            if (enemy.dead && enemy.boom < CONFIG.enemyBoomFrameNumber) {
                enemy.boom += 1;
                context.drawImage(enemy.image, enemy.left, enemy.top, CONFIG.enemySize, CONFIG.enemySize);
            }
            if(!enemy.dead){
                context.drawImage(enemy.image, enemy.left, enemy.top, CONFIG.enemySize, CONFIG.enemySize);
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
     * 时刻变化的敌人
     * 如果是向右走，获取最右边敌人的坐标，并判断是否触边
     * 如果是向左走，则判断最左边敌人是否触边。
     * 上面两个判断为触边，则整体向下移动并改变方向
     */
    move: function () {
        let enemyTop = 0;
        this.enemies.forEach((enemy) => {
            if(!enemy.dead){
                enemyTop = enemy.top;
                if (this.enemyDirection == 'right') {
                    if (enemy.left > this.maxLeft) {
                        this.enemies.forEach((enemy) => {
                            enemy.top += 50;
                        });
                        this.enemyDirection = 'left';
                    } else {
                        enemy.left += CONFIG.enemySpeed;
                    }
                } else if (this.enemyDirection == 'left') {
                    if (enemy.left < this.minLeft) {
                        this.enemies.forEach((enemy) => {
                            enemy.top += 50;
                        });
                        this.enemyDirection = 'right';
                    } else {
                        enemy.left -= CONFIG.enemySpeed;
                    }
                }
            }
        });

        return enemyTop;
    }
};