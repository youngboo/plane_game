var container = document.querySelector('#game');
var canvas = document.querySelector("#canvas");
var context = canvas.getContext('2d');
// 判断是否有 requestAnimationFrame 方法，如果没有则模拟实现
const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };

export {container, canvas, context, requestAnimFrame} ;