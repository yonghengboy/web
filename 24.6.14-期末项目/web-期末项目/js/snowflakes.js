(function () {
    var screenWidth = window.innerWidth; // 获取屏幕宽度
    var screenHeight = window.innerHeight; // 获取屏幕高度
    var speed = 20; // 雪花下落的速度，值越小速度越快
    var snowPileHeight = 0; // 积雪高度
    var maxSnowPileHeight = 100; // 最大积雪高度

    function Snow(size, downSize) {
        this.box = document.getElementById("box"); // 获取容器元素
        this.size = size; // 雪花数量
        this.downSize = downSize || 10; // 每次落下的雪花数量，默认为10个
        this.item = []; // 雪花元素数组
        this.init(); // 初始化
        this.start(); // 开始下雪
    }

    Snow.prototype.getRandomThings = function (type) {
        var res;
        if (type == 'left') {
            res = Math.round(Math.random() * (screenWidth - 30 - 10)) + 10;
            Math.random() > 0.8 ? (res = -res) : null;
        } else if (type == 'top') {
            res = -(Math.round(Math.random() * (50 - 40)) + 40);
        } else if (type == 'incre') { // 向下的速度
            res = Math.random() * (4 - 1) + 1; // 修改这个范围来调整速度
        } else if (type == 'increLeft') { // 向右的速度
            res = Math.random() * (0.8 - 0.5) + 0.5; // 修改这个范围来调整速度
        } else {
            res = Math.round(Math.random() * (30 - 10)) + 10;
        }
        return res;
    }

    Snow.prototype.init = function () {
        this.box.style.width = screenWidth + 'px';
        this.box.style.height = screenHeight + 'px';
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < this.size; i++) {
            var left = this.getRandomThings('left');
            var top = this.getRandomThings('top');
            var snowSize = this.getRandomThings('size');
            var snow = document.createElement("div");
            snow.style.cssText = 'position:absolute;color:#FFFFFF;';
            snow.style['font-size'] = snowSize + 'px';
            snow.style.left = left + 'px';
            snow.style.top = top + 'px';
            snow.innerHTML = '&#10052';
            this.item.push(snow);
            fragment.appendChild(snow);
        }
        this.box.appendChild(fragment);
    }

    Snow.prototype.start = function () {
        var that = this;
        var num = 0;
        for (var i = 0; i < this.size; i++) {
            var snow = this.item[i];
            if ((i + 1) % this.downSize == 0) {
                num++;
            }
            (function (s, n) {
                setTimeout(function () {
                    that.doStart(s);
                }, 1000 * n)
            })(snow, num)
        }
    }

    Snow.prototype.doStart = function (snow) {
        var that = this;
        (function (s) {
            var increTop = that.getRandomThings('incre');
            var increLeft = that.getRandomThings('increLeft');
            var x = parseInt(getStyle(s, 'left')), y = parseInt(getStyle(s, 'top'));

            if (s.timmer) return;
            s.timmer = setInterval(function () {
                if (y > (screenHeight - 5 - snowPileHeight) || x > (screenWidth - 30)) {
                    increTop = that.getRandomThings('incre');
                    increLeft = that.getRandomThings('increLeft');

                    var left = that.getRandomThings('left');
                    var top = that.getRandomThings('top');
                    var snowSize = that.getRandomThings('size');
                    s.style.left = left + 'px';
                    s.style.top = top + 'px';
                    s.style['font-size'] = snowSize + 'px';
                    y = top;
                    x = left;

                    // 增加积雪高度
                    snowPileHeight += 1;
                    document.getElementById('snowPile').style.height = snowPileHeight + 'px';

                    // 检查积雪高度
                    if (snowPileHeight >= maxSnowPileHeight) {
                        setTimeout(function() {
                            snowPileHeight = 0;
                            document.getElementById('snowPile').style.height = snowPileHeight + 'px';
                        }, 2000); // 2秒后清除积雪
                    }
                    return;
                }

                x += Math.random() > 0.5 ? increLeft * 1.1 : increLeft * 0.9;
                y += Math.random() > 0.5 ? increTop * 1.1 : increTop * 0.9;

                s.style.left = x + 'px';
                s.style.top = y + 'px';
            }, speed); // 通过调整这个值来改变雪花的速度
        })(snow)
    }

    function getStyle(obj, prop) {
        var prevComputedStyle = document.defaultView ? document.defaultView.getComputedStyle(obj, null) : obj.currentStyle;
        return prevComputedStyle[prop];
    }

    new Snow(300, 30); // 创建一个Snow对象，传入雪花数量和每批下落的雪花数量
})()