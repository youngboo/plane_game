var PLANE = {
    init: function () {
        this.left = canvas.width / 2;
        this.top = canvas.height - CONFIG.planeSize.height - CONFIG.canvasPadding;
        this.planeIcon = CONFIG.planeIcon;
        this.planeSpeed = CONFIG.planeSpeed;
        this.planeSize = CONFIG.planeSize;
        this.direct = 'right';
        this.move = true;
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
            let key = e.keyCode || e.which || e.charCode;
            switch (key) {
                //方向键上
                case 38:
                    self.shoot();
                    break;
                //方向键左
                case 37:
                    self.left -= CONFIG.planeSpeed;
                    self.move = true;
                    break;
                //方向键右
                case 39:
                    self.left += CONFIG.planeSpeed;
                    self.move = true;
                    break;
                //空格键
                case 32:
                    self.shoot();
                    break;
                default:
                    self.move = false;
            }
        }
    },
    /**
     * 限制出界
     */
    limitArea: function () {
        let maxTop = canvas.height - this.planeSize.height - (this.planeSize.height + CONFIG.canvasPadding);
        let minTop = canvas.height - this.planeSize.height - CONFIG.canvasPadding;
        let maxWidth = canvas.width - this.planeSize.width - CONFIG.canvasPadding;
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
        if(this.move){
            this.limitArea();
        }
        context.drawImage(this.getImage(), this.left, this.top, this.planeSize.width, this.planeSize.height);

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