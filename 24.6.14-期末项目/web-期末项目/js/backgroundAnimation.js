// 动态背景效果初始化函数
function initBackground() {
    var canvas = document.getElementById('backgroundCanvas'), // 获取背景画布元素
        ctx = canvas.getContext('2d'); // 获取2D绘图上下文
    canvas.width = window.innerWidth; // 设置画布宽度为窗口宽度
    canvas.height = window.innerHeight; // 设置画布高度为窗口高度
    ctx.lineWidth = .3; // 设置线条宽度
    ctx.strokeStyle = (new Color(150)).style; // 设置线条颜色

    var mousePosition = {
        x: 30 * canvas.width / 100, // 初始鼠标位置X坐标
        y: 30 * canvas.height / 100 // 初始鼠标位置Y坐标
    };

    var isMouseInside = true; // 标记鼠标是否在画布内

    var dots = {
        nb: 1500, // 点的数量
        distance: 50, // 点之间的最小距离
        d_radius: 100, // 点与鼠标之间的最小距离
        array: [], // 存储点的数组
        randomLines: [] // 存储随机线条的数组
    };

    var maxLineLength = 80; // 最大线条长度

    // 混合颜色组件
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    // 平均两点之间的颜色
    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    // 生成随机颜色值
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }

    // 创建颜色样式
    function createColorStyle(r, g, b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }

    // 颜色构造函数
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    // 点的构造函数
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();
        this.radius = Math.random() * 2;
        this.color = new Color();
        this.attractionTime = 0;
        this.isEscaping = false;
        this.escapeStartTime = null;
    }

    // 点的绘制方法
    Dot.prototype = {
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };

    // 移动点的方法
    function moveDots() {
        for (var i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];

            // 碰到边界反弹
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }

            dot.x += dot.vx;
            dot.y += dot.vy;

            if (isMouseInside) {
                var distanceToMouseX = dot.x - mousePosition.x;
                var distanceToMouseY = dot.y - mousePosition.y;
                var distanceToMouse = Math.sqrt(distanceToMouseX * distanceToMouseX + distanceToMouseY * distanceToMouseY);

                if (!dot.isEscaping) {
                    if (distanceToMouse < dots.d_radius) {
                        dot.x -= distanceToMouseX * 0.01;
                        dot.y -= distanceToMouseY * 0.01;
                        dot.attractionTime += 1;
                    } else {
                        dot.attractionTime = 0;
                    }

                    if (dot.attractionTime > 500 && Math.random() < (dot.attractionTime - 500) / 1000) {
                        dot.isEscaping = true;
                        dot.vx += distanceToMouseX * 0.05;
                        dot.vy += distanceToMouseY * 0.05;
                        dot.escapeStartTime = Date.now();
                    }
                } else {
                    dot.x += dot.vx;
                    dot.y += dot.vy;
                    dot.attractionTime = 0;

                    var elapsedTime = Date.now() - dot.escapeStartTime;
                    if (elapsedTime > 2000) {
                        var speedReduction = Math.min((elapsedTime - 2000) / 4000, 1);
                        dot.vx *= 1 - speedReduction * 0.8;
                        dot.vy *= 1 - speedReduction * 0.8;
                        if (speedReduction >= 1) {
                            dot.vx = Math.sign(dot.vx) * 0.5;
                            dot.vy = Math.sign(dot.vy) * 0.5;
                            dot.isEscaping = false;
                        }
                    }
                }
            }
        }

        var currentTime = Date.now();
        dots.randomLines = dots.randomLines.filter(function (line) {
            var distance = Math.sqrt(Math.pow(line.dot1.x - line.dot2.x, 2) + Math.pow(line.dot1.y - line.dot2.y, 2));
            return currentTime - line.timestamp < line.lifetime && distance < dots.distance * 2 && distance < maxLineLength;
        });

        while (dots.randomLines.length < 80) {
            var dot1 = dots.array[Math.floor(Math.random() * dots.nb)];
            var dot2 = dots.array[Math.floor(Math.random() * dots.nb)];
            var distance = Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
            if (dot1 !== dot2 && distance < dots.distance * 2 && distance < maxLineLength) {
                dots.randomLines.push({
                    dot1: dot1,
                    dot2: dot2,
                    timestamp: currentTime,
                    lifetime: Math.random() * 5000 + 5000
                });
            }
        }
    }

    // 连接点的方法
    function connectDots() {
        for (var i = 0; i < dots.nb; i++) {
            for (var j = i + 1; j < dots.nb; j++) {
                var i_dot = dots.array[i];
                var j_dot = dots.array[j];
                var distance = Math.sqrt(Math.pow(i_dot.x - j_dot.x, 2) + Math.pow(i_dot.y - j_dot.y, 2));
                if (distance < dots.distance && distance < maxLineLength) {
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        dots.randomLines.forEach(function (line) {
            var distance = Math.sqrt(Math.pow(line.dot1.x - line.dot2.x, 2) + Math.pow(line.dot1.y - line.dot2.y, 2));
            if (distance < maxLineLength) {
                ctx.beginPath();
                ctx.strokeStyle = averageColorStyles(line.dot1, line.dot2);
                ctx.moveTo(line.dot1.x, line.dot1.y);
                ctx.lineTo(line.dot2.x, line.dot2.y);
                ctx.stroke();
                ctx.closePath();
            }
        });
    }

    // 创建点的方法
    function createDots() {
        for (var i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }

    // 绘制点的方法
    function drawDots() {
        for (var i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    // 动画点的方法
    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        moveDots(); // 移动点
        connectDots(); // 连接点
        drawDots(); // 绘制点
        requestAnimationFrame(animateDots); // 循环调用animateDots函数
    }

    createDots(); // 创建点
    requestAnimationFrame(animateDots); // 开始动画

    // 监听鼠标移动事件，更新鼠标位置
    window.addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
        isMouseInside = true;
    });

    // 监听鼠标离开事件，更新鼠标状态
    window.addEventListener('mouseleave', function (e) {
        isMouseInside = false;
    });

    // 监听窗口大小变化事件，更新画布大小
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;
    };

    // 监听页面可见性变化，暂停或恢复动画
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animateDots);
        } else {
            requestAnimationFrame(animateDots);
        }
    });
}