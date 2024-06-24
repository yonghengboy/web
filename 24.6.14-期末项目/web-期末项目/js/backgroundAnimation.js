// 文件名: backgroundAnimation.js

// 动态背景效果
function initBackground() {
    var canvas = document.getElementById('backgroundCanvas'),
        ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx) {
        console.error("Canvas element or context not found");
        return;
    }
    
    console.log("Canvas and context found, initializing background...");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;

    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    var isMouseInside = true;

    var dots = {
        nb: 150,
        distance: 50,
        d_radius: 100,
        array: []
    };

    function Color(min) {
        min = min || 0;
        this.r = Math.floor(Math.random() * 255 + min);
        this.g = Math.floor(Math.random() * 255 + min);
        this.b = Math.floor(Math.random() * 255 + min);
        this.style = `rgba(${this.r},${this.g},${this.b}, 0.8)`;
    }

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
            console.log("Dot drawn at:", this.x, this.y); // 添加调试信息
        }
    };

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

            if (isMouseInside) {
                var distanceToMouseX = dot.x - mousePosition.x;
                var distanceToMouseY = dot.y - mousePosition.y;
                var distanceToMouse = Math.sqrt(distanceToMouseX * distanceToMouseX + distanceToMouseY * distanceToMouseY);

                if (distanceToMouse < dots.d_radius) {
                    dot.x -= distanceToMouseX * 0.01;
                    dot.y -= distanceToMouseY * 0.01;
                }
            }
        }
        console.log("Dots moved"); // 添加调试信息
    }

    function connectDots() {
        for (var i = 0; i < dots.nb; i++) {
            for (var j = i + 1; j < dots.nb; j++) {
                var i_dot = dots.array[i];
                var j_dot = dots.array[j];

                var distance = Math.sqrt(Math.pow(i_dot.x - j_dot.x, 2) + Math.pow(i_dot.y - j_dot.y, 2));
                if (distance < dots.distance) {
                    ctx.beginPath();
                    ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                    ctx.moveTo(i_dot.x, i_dot.y);
                    ctx.lineTo(j_dot.x, j_dot.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        console.log("Dots connected"); // 添加调试信息
    }

    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = (color1.r + color2.r) / 2,
            g = (color1.g + color2.g) / 2,
            b = (color1.b + color2.b) / 2;
        return `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)}, 0.8)`;
    }

    function createDots() {
        for (var i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
        console.log("Dots created:", dots.array); // 添加调试信息
    }

    function drawDots() {
        for (var i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
        console.log("Dots drawn"); // 添加调试信息
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
        console.log("Animation frame requested"); // 添加调试信息
    }

    createDots();
    requestAnimationFrame(animateDots);

    window.addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
        isMouseInside = true;
        console.log("Mouse moved to:", mousePosition); // 添加调试信息
    });

    window.addEventListener('mouseleave', function (e) {
        isMouseInside = false;
        console.log("Mouse left the window"); // 添加调试信息
    });

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;
        console.log("Window resized"); // 添加调试信息
    };

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animateDots);
            console.log("Animation paused"); // 添加调试信息
        } else {
            requestAnimationFrame(animateDots);
            console.log("Animation resumed"); // 添加调试信息
        }
    });
}
