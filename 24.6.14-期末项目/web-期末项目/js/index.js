// 打开新页面显示图片
function openImage(url) {
    window.open(url, '_blank'); // 在新标签页中打开指定的URL
}

// 跳转到指定页面
function navigateTo(page) {
    window.location.href = page; // 跳转到指定的页面
}

// 退出登录并跳转到 login.html
function logout() {
    window.location.href = 'login.html'; // 跳转到登录页面
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
    "人无贱者，唯自弃也",
    "往者不可谏，来者犹可追",
    "爱情终究是死了，也曾经憧憬过，\n我终于跟不再年少的自己妥协。",
    "你可以很爱一个人的同时，依然选择和他说再见，\n你可以时刻都在思念一个人，但你仍然庆幸他不会再出现在你生命里。\n——《你当像鸟飞往你的山》",
    "内心丰盈者，独行也如众。",
    "我知道那不是我的月亮，\n但是某一刻月光确实照在了我的身上。",
    "人终被年少不可得之物困其一生。",
    "欲买桂花.同载酒，终不似，少年游…",
    "没人能比的上我记忆中的你，现在的你也不行。",
    "人的一切痛苦，本质上都是对自己无能的愤怒。",
    "我放不下的是自己编织给自己的美好的梦，\n只是刚好梦里女主是她。",
    "岁月悠悠，总有什么值得我静静守候，\n晨初的一缕曙光，或是那远方的呢喃。",
    "我喜欢你，不管你喜欢谁，这都无法改变。",
    "你站在窗前看风景，我在楼下看你，\n明月装饰了你的窗子，\n你装饰了我的梦。"
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

    var isMouseInside = true; // 用于标记鼠标是否在页面内

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
        this.x = Math.random() * canvas.width; // 随机生成点的初始X位置
        this.y = Math.random() * canvas.height; // 随机生成点的初始Y位置

        this.vx = -.5 + Math.random(); // 随机生成点的X速度
        this.vy = -.5 + Math.random(); // 随机生成点的Y速度

        this.radius = Math.random() * 2; // 随机生成点的半径

        this.color = new Color(); // 随机生成点的颜色
        this.attractionTime = 0; // 初始化被磁吸的时间
        this.isEscaping = false; // 标记是否在逃离
        this.escapeStartTime = null; // 逃离开始时间
    }

    Dot.prototype = {
        // 绘制点
        draw: function () {
            ctx.beginPath(); // 开始绘制路径
            ctx.fillStyle = this.color.style; // 设置填充颜色
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // 绘制圆形
            ctx.fill(); // 填充圆形
        }
    };

    // 移动点的位置
    function moveDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];

            // 当点超出画布边界时反向移动
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx; // 保持X速度
                dot.vy = -dot.vy; // 反向Y速度
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx; // 反向X速度
                dot.vy = dot.vy; // 保持Y速度
            }

            // 更新点的位置
            dot.x += dot.vx;
            dot.y += dot.vy;

            // 仅在鼠标在页面内时应用磁吸效果
            if (isMouseInside) {
                // 添加磁吸效果
                var distanceToMouseX = dot.x - mousePosition.x; // 点到鼠标的X距离
                var distanceToMouseY = dot.y - mousePosition.y; // 点到鼠标的Y距离
                var distanceToMouse = Math.sqrt(distanceToMouseX * distanceToMouseX + distanceToMouseY * distanceToMouseY); // 点到鼠标的总距离

                if (!dot.isEscaping) {
                    // 当点在磁吸范围内时，逐渐靠近边缘，并增加被磁吸的时间
                    if (distanceToMouse < dots.d_radius) {
                        dot.x -= distanceToMouseX * 0.01; // 调整吸引力强度
                        dot.y -= distanceToMouseY * 0.01; // 调整吸引力强度
                        dot.attractionTime += 1; // 增加被磁吸的时间
                    } else {
                        dot.attractionTime = 0; // 重置被磁吸的时间
                    }

                    // 当被磁吸超过3秒后，有概率挣脱磁吸，时间越久概率越大
                    if (dot.attractionTime > 300 && Math.random() < (dot.attractionTime - 300) / 1000) {
                        dot.isEscaping = true; // 标记为逃离状态
                        dot.vx += distanceToMouseX * 0.05; // 逃离时速度加快
                        dot.vy += distanceToMouseY * 0.05; // 逃离时速度加快
                        dot.escapeStartTime = Date.now(); // 记录逃离开始时间
                    }
                } else {
                    // 当点在逃离状态时，不受磁吸影响
                    dot.x += dot.vx; 
                    dot.y += dot.vy;
                    dot.attractionTime = 0; // 重置被磁吸的时间

                    // 检查逃离时间
                    var elapsedTime = Date.now() - dot.escapeStartTime; // 计算逃离时间
                    if (elapsedTime > 2000) {
                        var speedReduction = Math.min((elapsedTime - 2000) / 4000, 1); // 2秒后开始衰减，6秒后回到正常速度
                        dot.vx *= 1 - speedReduction * 0.8; // 逐渐减速，确保速度不会变为零
                        dot.vy *= 1 - speedReduction * 0.8; // 逐渐减速，确保速度不会变为零
                        if (speedReduction >= 1) {
                            dot.vx = Math.sign(dot.vx) * 0.5; // 设置为正常速度
                            dot.vy = Math.sign(dot.vy) * 0.5; // 设置为正常速度
                            dot.isEscaping = false; // 取消逃离状态
                        }
                    }
                }
            }
        }

        var currentTime = Date.now(); // 获取当前时间
        dots.randomLines = dots.randomLines.filter(function (line) {
            var distance = Math.sqrt(Math.pow(line.dot1.x - line.dot2.x, 2) + Math.pow(line.dot1.y - line.dot2.y, 2)); // 计算线条两端点的距离
            return currentTime - line.timestamp < line.lifetime && distance < dots.distance * 2 && distance < maxLineLength; // 过滤有效的随机线条
        });

        // 生成随机线条
        while (dots.randomLines.length < 80) {
            var dot1 = dots.array[Math.floor(Math.random() * dots.nb)]; // 随机选择一个点
            var dot2 = dots.array[Math.floor(Math.random() * dots.nb)]; // 随机选择另一个点
            var distance = Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2)); // 计算两点之间的距离
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

                var distance = Math.sqrt(Math.pow(i_dot.x - j_dot.x, 2) + Math.pow(i_dot.y - j_dot.y, 2)); // 计算两点之间的距离
                if (distance < dots.distance && distance < maxLineLength) { // 当距离小于最大距离时
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                        ctx.beginPath(); // 开始绘制路径
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot); // 设置线条颜色
                        ctx.moveTo(i_dot.x, i_dot.y); // 移动画笔到第一个点
                        ctx.lineTo(j_dot.x, j_dot.y); // 绘制线条到第二个点
                        ctx.stroke(); // 描边
                        ctx.closePath(); // 关闭路径
                    }
                }
            }
        }

        // 绘制随机线条
        dots.randomLines.forEach(function (line) {
            var distance = Math.sqrt(Math.pow(line.dot1.x - line.dot2.x, 2) + Math.pow(line.dot1.y - line.dot2.y, 2)); // 计算线条两端点的距离
            if (distance < maxLineLength) {
                ctx.beginPath(); // 开始绘制路径
                ctx.strokeStyle = averageColorStyles(line.dot1, line.dot2); // 设置线条颜色
                ctx.moveTo(line.dot1.x, line.dot1.y); // 移动画笔到第一个点
                ctx.lineTo(line.dot2.x, line.dot2.y); // 绘制线条到第二个点
                ctx.stroke(); // 描边
                ctx.closePath(); // 关闭路径
            }
        });
    }

    // 创建点
    function createDots() {
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot()); // 向点数组中添加新点
        }
    }

    // 绘制点
    function drawDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw(); // 调用点的绘制方法
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
        isMouseInside = true; // 标记鼠标在页面内
    });

    window.addEventListener('mouseleave', function (e) {
        isMouseInside = false; // 标记鼠标离开页面
    });

    // 窗口大小改变时重新设置画布大小
    window.onresize = function() {
        canvas.width = window.innerWidth; // 更新画布宽度
        canvas.height = window.innerHeight; // 更新画布高度
        ctx.lineWidth = .3; // 设置线条宽度
        ctx.strokeStyle = (new Color(150)).style; // 设置线条颜色
    };

    // 窗口没激活时动画停止，省计算资源
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animateDots); // 页面不可见时停止动画
        } else {
            requestAnimationFrame(animateDots); // 页面可见时重新开始动画
        }
    });
}

// 显示弹窗
function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block"; // 显示弹窗

    // 2秒后隐藏弹窗
    setTimeout(function() {
        popup.style.display = "none";
    }, 2000);
}
