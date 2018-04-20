// 元素
var container = document.getElementById('game');
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
// 判断是否有 requestAnimationFrame 方法，如果没有则模拟实现
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };

// 初始化
var game = GAME.init();

//游戏逐帧循环函数
function playing() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(game.status == 'playing'){
        game.draw();
        //暂停事件
        if(game.status != 'stop'){
            requestAnimFrame(playing);
        }
    }
}
