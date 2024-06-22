// 打开新页面显示图片
function openImage(url) {
    window.open(url, '_blank'); // 在新标签页中打开指定的URL
}

// 跳转到指定页面
function navigateTo(page) {
    window.location.href = page; // 跳转到指定的页面
}

// 等待整个文档内容加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    // 获取旋转圆形图片和静止圆形图片的元素
    var rotatingCircle = document.getElementById('rotatingCircle');
    var staticCircle = document.getElementById('staticCircle');

    // 定义鼠标进入事件处理函数
    function onMouseEnter() {
        rotatingCircle.classList.add('rotate'); // 添加旋转效果类
    }

    // 定义鼠标离开事件处理函数
    function onMouseLeave() {
        rotatingCircle.classList.remove('rotate'); // 移除旋转效果类
    }

    // 为旋转圆形图片添加事件监听器
    rotatingCircle.addEventListener('mouseenter', onMouseEnter);
    rotatingCircle.addEventListener('mouseleave', onMouseLeave);

    // 为静止圆形图片添加事件监听器
    staticCircle.addEventListener('mouseenter', onMouseEnter);
    staticCircle.addEventListener('mouseleave', onMouseLeave);
});

// 确保所有功能在页面加载时都能正常工作
window.onload = function() {
    onPageLoad(); // 页面加载时执行
    initBackground(); // 初始化背景动画
}

// 随机名言数组
const quotes = [
    "名言1: 知识就是力量。",
    "名言2: 时间就是金钱。",
    "名言3: 努力奋斗，勇往直前。",
    "名言4: 成功源于坚持不懈。"
];

// 从数组中随机选择一条名言并显示
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // 生成随机索引
    document.getElementById('quote').innerText = quotes[randomIndex]; // 显示随机名言
}

// 页面加载时显示随机名言并依次显示内容
function onPageLoad() {
    displayRandomQuote(); // 显示随机名言
    const elements = document.querySelectorAll('.content'); // 获取所有 content 类的元素
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('show'); // 添加显示效果类
        }, index * 300); // 每隔0.3秒显示一个元素
    });
}

// 动态背景效果
function initBackground() {
    var canvas = document.getElementById('backgroundCanvas'), // 获取画布元素
        ctx = canvas.getContext('2d'); // 获取画布上下文
    canvas.width = window.innerWidth; // 设置画布宽度为窗口宽度
    canvas.height = window.innerHeight; // 设置画布高度为窗口高度
    ctx.lineWidth = .3; // 设置线条宽度
    ctx.strokeStyle = (new Color(150)).style; // 设置线条颜色

    var mousePosition = {
        x: 30 * canvas.width / 100, // 设置鼠标初始位置X
        y: 30 * canvas.height / 100 // 设置鼠标初始位置Y
    };

    // 定义点和线条的相关参数
    var dots = {
        nb: 1500,          // 点的数量
        distance: 50,      // 点之间的最大距离
        d_radius: 100,     // 鼠标影响的半径
        array: [],         // 存放点的数组
        randomLines: []    // 存放随机线条的数组
    };

    var maxLineLength = 80; // 最大线条长度

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
                    lifetime: Math.random() * 5000 + 5000 // 5到10秒随机时间
                });
            }
        }
    }

    // 连接点之间的线条
    function connectDots() {
        for (i = 0; i < dots.nb; i++) {
            for (j = i + 1; j < dots.nb; j++) {
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
        requestAnimationFrame(animateDots); // 请求下一帧动画
    }

    createDots(); // 创建点
    requestAnimationFrame(animateDots); // 开始动画

    window.addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX; // 更新鼠标位置X
        mousePosition.y = e.pageY; // 更新鼠标位置Y
    });

    window.addEventListener('mouseleave', function (e) {
        mousePosition.x = canvas.width / 2; // 鼠标离开时重置位置X
        mousePosition.y = canvas.height / 2; // 鼠标离开时重置位置Y
    });
}
