import {context, canvas} from '../base';
import CONFIG from '../config/config';
var PLANE = {
    init: function () {
        this.left = (canvas.width-CONFIG.planeSize.width) / 2;
        this.top = canvas.height - CONFIG.planeSize.height - CONFIG.canvasPadding;
        this.planeIcon = CONFIG.planeIcon;
        this.planeSpeed = CONFIG.planeSpeed;
        this.planeSize = CONFIG.planeSize;
        this.maxWidth = canvas.width - this.planeSize.width - CONFIG.canvasPadding;
        this.moveStatus = true;
        this.bullets = [];
        this.bulletSize = CONFIG.bulletSize > 50 ? 50 : CONFIG.bulletSize;
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
                    self.shootting = true;
                    self.setMoveStatus(self.moveStatus);
                    break;
                //空格键
                case 32:
                    self.shoot();
                    self.shootting = true;
                    self.setMoveStatus(self.moveStatus);
                    break;
                //方向键左
                case 37:
                    self.setMoveStatus('left');
                    if(self.shotting){
                        self.shoot();
                    }
                    break;
                //方向键右
                case 39:
                    self.setMoveStatus('right');
                    if(self.shotting){
                        self.shoot();
                    }
                    break;
                default:
                    self.shootting = false;
            }
        };
        document.onkeyup = function (e) {
            let keyUp = e.keyCode || e.which || e.charCode;
            switch (keyUp){
                case 37 :
                    if(self.moveStatus == 'left'){
                        self.setMoveStatus('none');
                    }
                    break;
                case 39 :
                    if(self.moveStatus == 'right'){
                        self.setMoveStatus('none');
                    }
                case 32 :
                    self.setMoveStatus(self.moveStatus);
                    break;
                case 38 :
                    self.setMoveStatus(self.moveStatus);
                    break;
            }
        };
    },
    setMoveStatus:function (status) {
      this.moveStatus = status;
    },
    /**
     * 移动并限制出界
     */
    move: function () {
       if(this.moveStatus == 'right'){
           if(this.left < this.left + CONFIG.planeSpeed * 3){
               this.left += CONFIG.planeSpeed;
           }
       }else if(this.moveStatus == 'left'){
           if(this.left > this.left - CONFIG.planeSpeed * 3){
               this.left -= CONFIG.planeSpeed;
           }
       }else{
           return;
       }

        if (this.left > this.maxWidth) {
            this.left = this.maxWidth;
        }
        if (this.left < CONFIG.canvasPadding) {
            this.left = CONFIG.canvasPadding;
        }
    },
    draw: function () {
        if (this.bullets) {
            context.lineWidth = 1;
            context.strokeStyle = 'white';
            this.bullets.forEach((bullet,index)=>{
                if (bullet.top < 0) {
                    this.bullets.splice(index, 1);
                }
                bullet.top = bullet.top - CONFIG.bulletSpeed;
                context.beginPath();
                context.moveTo(bullet.left, bullet.top);
                context.lineTo(bullet.left, bullet.top - this.bulletSize);
                context.closePath();
                context.stroke();
            })

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
export default PLANE;