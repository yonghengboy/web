// 退出登录函数
function logout() {
    console.log('Logout button clicked');
    window.location.href = 'login.html'; // 替换为实际的登录页面URL
}

// 动态背景效果
window.onload = function () {
    // 确保canvas覆盖整个背景
    var canvas = document.getElementById('backgroundCanvas'),
        ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;

    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    // 定义点和线条的相关参数
    var dots = {
        nb: 1500,          // 点的数量
        distance: 50,      // 点之间的最大距离
        d_radius: 100,     // 鼠标影响的半径
        array: [],         // 存放点的数组
        randomLines: []    // 存放随机线条的数组
    };

    // 最大线条长度
    var maxLineLength = 80;

    // 计算两个组件的加权平均值
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    // 计算两个点颜色的平均值
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

    // 定义颜色对象
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    // 定义点对象
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
    }

    Dot.prototype = {
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };

    // 移动点的位置
    function moveDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];

            // 碰到画布边界时反弹
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }

            dot.x += dot.vx;
            dot.y += dot.vy;
        }

        // 检查随机线条的存活时间和距离
        var currentTime = Date.now();
        dots.randomLines = dots.randomLines.filter(function (line) {
            var distance = Math.sqrt(Math.pow(line.dot1.x - line.dot2.x, 2) + Math.pow(line.dot1.y - line.dot2.y, 2));
            return currentTime - line.timestamp < line.lifetime && distance < dots.distance * 2 && distance < maxLineLength;
        });

        // 如果线条数量少于50，添加新的随机线条
        while (dots.randomLines.length < 80) {
            var dot1 = dots.array[Math.floor(Math.random() * dots.nb)];
            var dot2 = dots.array[Math.floor(Math.random() * dots.nb)];
            var distance = Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
            if (dot1 !== dot2 && distance < dots.distance * 2 && distance < maxLineLength) {
                dots.randomLines.push({
                    dot1: dot1,
                    dot2: dot2,
                    timestamp: currentTime,
                    lifetime: Math.random() * 5000 + 5000 // 5到10秒随机时间
                });
            }
        }
    }

    // 连接点之间的线条
    function connectDots() {
        for (i = 0; i < dots.nb; i++) {
            for (j = i + 1; j < dots.nb; j++) { // 改成 j = i + 1，避免重复连线
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

        // 绘制随机线条
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

    // 创建点
    function createDots() {
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }

    // 绘制点
    function drawDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    // 动画函数
    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
    }

    // 初始化并开始动画
    createDots();
    requestAnimationFrame(animateDots);

    // 将鼠标事件监听器绑定到 window
    window.addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    });

    // 将鼠标离开事件监听器绑定到 window
    window.addEventListener('mouseleave', function (e) {
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    });
}
