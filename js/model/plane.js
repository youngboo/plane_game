var PLANE = {
    init: function () {
        this.left = canvas.width / 2;
        this.top = canvas.height - CONFIG.planeSize.height - CONFIG.canvasPadding;
        this.planeIcon = CONFIG.planeIcon;
        this.planeSpeed = CONFIG.planeSpeed;
        this.planeSize = CONFIG.planeSize;
        this.moveStatus = true;
        this.bullets = [];
        this.bindEvent();

        return this;
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
                    self.moveByStatus(self.status);
                    break;
                //空格键
                case 32:
                    self.shoot();
                    self.moveByStatus(self.status);
                    break;
                //方向键左
                case 37:
                    self.moveByStatus('left');
                    break;
                //方向键右
                case 39:
                    self.moveByStatus('right');
                    break;
                default:
                    self.moveStatus = 'none';
                    break;
            }
        }
    },
    moveByStatus:function(status='none'){
      this.moveStatus = status;
        if(this.moveStatus == 'left'){
            this.movement = this.left - CONFIG.planeSpeed;
        }
        if(this.moveStatus == 'right'){
            this.movement = this.left + CONFIG.planeSpeed;
        }
    },
    /**
     * 移动并限制出界
     */
    move: function () {
       if(this.moveStatus == 'right'){
           if(this.left < this.movement){
               this.left += 3;
           }
       }else if(this.moveStatus == 'left'){
           if(this.left > this.movement){
               this.left -= 3;
           }
       }else{
           return;
       }
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
        if (this.left < CONFIG.canvasPadding) {
            this.left = CONFIG.canvasPadding;
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
        if(this.moveStatus != 'none'){
            this.move();
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