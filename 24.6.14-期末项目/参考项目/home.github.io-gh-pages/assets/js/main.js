var iUp = (function () {
    // 初始化变量
    var time = 0, // 动画延迟时间
        duration = 150, // 每步动画的持续时间
        clean = function () {
            // 重置延迟时间
            time = 0;
        },
        up = function (element) {
            // 在延迟后给元素添加 "up" 类
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            // 增加下一个元素的延迟时间
            time += duration;
        },
        down = function (element) {
            // 移除元素的 "up" 类
            element.classList.remove("up");
        },
        toggle = function (element) {
            // 在延迟后切换元素的 "up" 类
            setTimeout(function () {
                element.classList.toggle("up");
            }, time);
            // 增加下一个元素的延迟时间
            time += duration;
        };

    // 返回可用的函数
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    };
})();

/**
 * 获取并显示Bing壁纸图片
 * @param {Array} imgUrls - 图片URL列表
 */
function getBingImages(imgUrls) {
    // 初始化变量
    var indexName = "bing-image-index"; // sessionStorage中的键名
    var index = sessionStorage.getItem(indexName); // 从sessionStorage中获取当前索引
    var panel = document.querySelector('#panel'); // 获取面板元素

    // 更新索引并在达到限制时重置
    if (isNaN(index) || index == 7) index = 0;
    else index++;

    // 构造图片URL
    var imgUrl = imgUrls[index];
    var url = "https://www.cn.bing.com" + imgUrl;

    // 设置面板的背景图片
    panel.style.background = "url('" + url + "') center center no-repeat #666";
    panel.style.backgroundSize = "cover";

    // 将更新后的索引保存回sessionStorage
    sessionStorage.setItem(indexName, index);
}

/**
 * 解码并打开电子邮件地址
 * @param {string} encoded - Base64编码的电子邮件地址
 */
function decryptEmail(encoded) {
    // 解码电子邮件地址
    var address = atob(encoded);
    // 使用解码后的地址重定向到邮件客户端
    window.location.href = "mailto:" + address;
}

// 监听DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', function () {
    // 从hitokoto API获取一句话
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // 解析并显示这句话
            var res = JSON.parse(this.responseText);
            document.getElementById('description').innerHTML = res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」";
        }
    };
    xhr.open("GET", "https://v1.hitokoto.cn", true);
    xhr.send();

    // 对具有 "iUp" 类的元素进行动画处理
    var iUpElements = document.querySelectorAll(".iUp");
    iUpElements.forEach(function (element) {
        iUp.up(element);
    });

    // 当头像元素加载完毕时显示它
    var avatarElement = document.querySelector(".js-avatar");
    avatarElement.addEventListener('load', function () {
        avatarElement.classList.add("show");
    });
});

// 监听移动端菜单按钮的点击事件
var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
    if (navigationWrapper.style.display == "block") {
        navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            navigationWrapper.classList.toggle('visible');
            navigationWrapper.classList.toggle('animated');
            navigationWrapper.classList.toggle('bounceOutUp');
            navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
        });
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceInDown');
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceOutUp');
    } else {
        navigationWrapper.classList.toggle('visible');
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceInDown');
    }

    // 切换按钮的图标和动画
    btnMobileMenu.classList.toggle('social');
    btnMobileMenu.classList.toggle('iconfont');
    btnMobileMenu.classList.toggle('icon-list');
    btnMobileMenu.classList.toggle('social');
    btnMobileMenu.classList.toggle('iconfont');
    btnMobileMenu.classList.toggle('icon-angleup');
    btnMobileMenu.classList.toggle('animated');
    btnMobileMenu.classList.toggle('fadeIn');
});
