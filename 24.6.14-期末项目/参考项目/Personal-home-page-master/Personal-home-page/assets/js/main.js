// 定义iUp模块，主要用于控制元素的动画效果
var iUp = (function () {
    var t = 0, // 动画延迟时间
        d = 150, // 动画间隔时间
        
        // 重置时间
        clean = function () {
            t = 0;
        },
        
        // 向上动画
        up = function (e) {
            setTimeout(function () {
                $(e).addClass("up"); // 添加类名 "up" 以触发CSS动画
            }, t);
            t += d; // 递增延迟时间
        },
        
        // 向下动画
        down = function (e) {
            $(e).removeClass("up"); // 移除类名 "up" 以取消CSS动画
        },
        
        // 切换动画
        toggle = function (e) {
            setTimeout(function () {
                $(e).toggleClass("up"); // 切换类名 "up" 以触发或取消CSS动画
            }, t);
            t += d; // 递增延迟时间
        };
    
    // 返回模块的公开方法
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    };
})();

$(document).ready(function () {
    // 获取一言数据
    fetch('https://v1.hitokoto.cn')
        .then(function (res) {
            return res.json(); // 解析JSON响应
        })
        .then(function (e) {
            $('#description').html(e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」"); // 更新描述内容
        })
        .catch(function (err) {
            console.error(err); // 捕获并显示错误
        });

    /**
     * 获取Bing壁纸
     * 通过GitHub用户开放的API接口：https://realwds-api.vercel.app/bing
     */
    var url = 'https://realwds-api.vercel.app/bing?count=8';
    var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls")); // 从sessionStorage获取图片URL数组
    var index = sessionStorage.getItem("index"); // 从sessionStorage获取当前图片索引
    var $panel = $('#panel'); // 获取面板元素

    // 如果没有缓存图片URL数组
    if (imgUrls == null) {
        imgUrls = [];
        index = 0;
        $.get(url, function (result) {
            images = result.data.images;
            console.log("数据为：");
            console.log(images);
            for (let i = 0; i < images.length; i++) {
                const item = images[i];
                imgUrls.push(item.url); // 将图片URL添加到数组中
            }
            var imgUrl = imgUrls[index];
            var url = "https://www.bing.com" + imgUrl;
            // 注释掉设置背景的代码
            // $panel.css("background", "url('" + url + "') center center no-repeat #666");
            // $panel.css("background-size", "cover");
            sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls)); // 将图片URL数组存储到sessionStorage
            sessionStorage.setItem("index", index); // 将当前图片索引存储到sessionStorage
        });
    } else {
        if (index == 7)
            index = 0;
        else
            index++;
        var imgUrl = imgUrls[index];
        var url = "https://www.bing.com" + imgUrl;
        // 注释掉设置背景的代码
        // $panel.css("background", "url('" + url + "') center center no-repeat #666");
        // $panel.css("background-size", "cover");
        sessionStorage.setItem("index", index); // 更新当前图片索引到sessionStorage
    }

    // 应用向上动画
    $(".iUp").each(function (i, e) {
        iUp.up(e); // 对每个元素应用向上动画
    });

    // 加载头像图片后显示
    $(".js-avatar")[0].onload = function () {
        $(".js-avatar").addClass("show"); // 加载完头像图片后，添加类名 "show"
    }
});

// 移动端菜单按钮点击事件
$('.btn-mobile-menu__icon').click(function () {
    if ($('.navigation-wrapper').css('display') == "block") {
        $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.navigation-wrapper').toggleClass('visible animated bounceOutUp'); // 切换类名以触发动画
            $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        });
        $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp'); // 切换动画类名
    } else {
        $('.navigation-wrapper').toggleClass('visible animated bounceInDown'); // 显示菜单并应用动画
    }
    $('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn'); // 切换按钮图标
});

