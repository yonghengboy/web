window.onload = function () {
    // 获取画布元素和上下文
    var canvas = document.getElementById('backgroundCanvas'),
        ctx = canvas.getContext('2d');

    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 设置画布的线条宽度和颜色
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(0, 100)).style;

    // 初始化鼠标位置
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    // 点的参数
    var dots = {
        nb: 1000, // 点的数量
        distance: 50, // 点之间的距离
        d_radius: 100, // 鼠标影响的距离
        array: [] // 存储点的数组
    };

    // 混合颜色组件
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    // 平均颜色样式
    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    // 生成颜色值
    function colorValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // 创建颜色样式
    function createColorStyle(r, g, b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }

    // 颜色类
    function Color(min, max) {
        min = min || 0;
        max = max || 255;
        this.r = colorValue(min, max);
        this.g = colorValue(min, max);
        this.b = colorValue(min, max);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    // 点类
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color(0, 100); // 使用指定范围生成颜色
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

    // 移动点
    function moveDots() {
        for (var i = 0; i < dots.nb; i++) {
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
    }

    // 连接点
    function connectDots() {
        for (var i = 0; i < dots.nb; i++) {
            for (var j = i; j < dots.nb; j++) {
                var i_dot = dots.array[i];
                var j_dot = dots.array[j];

                if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
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
    }

    // 创建点
    function createDots() {
        for (var i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }

    // 绘制点
    function drawDots() {
        for (var i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    // 动画点
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

    // 监听鼠标移动，更新鼠标位置
    window.addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    });

    // 监听鼠标离开，重置鼠标位置
    window.addEventListener('mouseleave', function (e) {
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    });

    // 背景动画效果
    var back = document.getElementById('back');
    window.onmousemove = function(event){
        var x = -event.clientX / 10;
        var y = -event.clientY / 15;
        back.style.backgroundPositionX = x + "px";
        back.style.backgroundPositionY = y + "px";
    }

    // 获取输入框元素
    var zh = document.getElementById('zh');
    var mm = document.getElementById('mm');

    // 登录表单验证
    window.login = function(){
        if (zh.value == "" || mm.value == "") {
            alert("账号或密码不能为空");
            return false; // 阻止表单提交
        } else if (zh.value != "root" || mm.value != "root") {    
            alert("账号或密码错误(可以选择游客登录)");
            return false; // 阻止表单提交
        }
        
        // 显示加载动画
        loadon();
        setTimeout(function() {
            // 假设登录成功后，重定向到主页或成功页面
            window.location.href = "index.html";
        }, 3000); // 设置加载动画显示时间，3秒后重定向
        return false; // 阻止表单的默认提交行为
    }

    // 加载动画控制
    var con = document.getElementById('con');
    function loadoff(){
        con.style.display = "none";
    }
    function loadon(){
        con.style.display = "flex";
    }

    // 初始加载动画
    loadon();
    setTimeout(loadoff, 1000); // 修改这里的值以调整初始加载动画显示时间，单位为毫秒（ms）

    // 监听窗口大小变化，调整画布大小
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
}
