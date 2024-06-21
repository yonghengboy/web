// window.onload事件在页面所有资源加载完毕后触发
window.onload = function () {
    // 设置body的样式
    document.body.style.margin = "0";
    document.body.style.background = "#30333F";

    // 创建一个canvas元素并添加到body中
    document.body.appendChild(document.createElement('canvas'));
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'); // 获取canvas的2D上下文
    canvas.width = window.innerWidth; // 设置canvas的宽度为窗口宽度
    canvas.height = window.innerHeight; // 设置canvas的高度为窗口高度
    ctx.lineWidth = .3; // 设置线条宽度
    ctx.strokeStyle = (new Color(150)).style; // 设置线条颜色

    // 初始化鼠标位置
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    // 初始化点的参数
    var dots = {
        nb: 1000, // 点的数量
        distance: 50, // 点之间的最大距离
        d_radius: 100, // 鼠标影响的半径
        array: [] // 存储点的数组
    };

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
        this.x = Math.random() * canvas.width; // 随机x位置
        this.y = Math.random() * canvas.height; // 随机y位置

        this.vx = -.5 + Math.random(); // 随机x速度
        this.vy = -.5 + Math.random(); // 随机y速度

        this.radius = Math.random() * 2; // 随机半径

        this.color = new Color(); // 颜色对象
    }

    // 点对象的原型方法，用于绘制点
    Dot.prototype = {
        draw: function () {
            ctx.beginPath(); // 开始路径
            ctx.fillStyle = this.color.style; // 设置填充颜色
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // 绘制圆形
            ctx.fill(); // 填充
        }
    };

    // 移动点的位置
    function moveDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];

            // 如果点超出y轴边界，则反向运动
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            // 如果点超出x轴边界，则反向运动
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }

            dot.x += dot.vx; // 更新点的x位置
            dot.y += dot.vy; // 更新点的y位置
        }
    }

    // 连接点之间的线条
    function connectDots() {
        for (i = 0; i < dots.nb; i++) {
            for (j = i; j < dots.nb; j++) {
                i_dot = dots.array[i];
                j_dot = dots.array[j];

                // 检查点之间的距离
                if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                    // 检查点与鼠标位置的距离
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                        ctx.beginPath(); // 开始路径
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot); // 设置线条颜色
                        ctx.moveTo(i_dot.x, i_dot.y); // 移动画笔到点i
                        ctx.lineTo(j_dot.x, j_dot.y); // 绘制到点j
                        ctx.stroke(); // 描边
                        ctx.closePath(); // 结束路径
                    }
                }
            }
        }
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
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
        moveDots(); // 移动点
        connectDots(); // 连接点
        drawDots(); // 绘制点
        requestAnimationFrame(animateDots); // 循环动画
    }

    createDots(); // 创建点
    requestAnimationFrame(animateDots); // 启动动画

    // 添加鼠标移动事件监听器
    document.querySelector('canvas').addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    });

    // 添加鼠标离开事件监听器
    document.querySelector('canvas').addEventListener('mouseleave', function (e) {
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    });
}
