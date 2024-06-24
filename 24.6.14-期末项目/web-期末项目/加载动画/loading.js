function showLoading() {
    document.getElementById('loading-container').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

window.addEventListener('load', function() {
    // 初始加载动画
    document.addEventListener("DOMContentLoaded", function() {
        fetch('../加载动画/loading.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('loading-placeholder').innerHTML = data;
                showLoading();
                setTimeout(hideLoading, 1000);
            })
            .catch(error => console.error('Error loading the loading.html:', error));
    });

    // 事件委托，拦截所有链接点击事件
    document.body.addEventListener('click', function(event) {
        var target = event.target;

        // 检查是否点击了链接或包含链接的元素
        while (target && target.tagName !== 'A' && target !== document.body) {
            target = target.parentNode;
        }

        if (target && target.tagName === 'A') {
            event.preventDefault();
            var href = target.getAttribute('href');
            if (href && href !== '#') {
                showLoading();
                setTimeout(function() {
                    if (target.target === '_blank') {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }, 500); // 设置加载动画显示时间，然后进行页面跳转或打开新页面
            }
        }
    });

    // 事件委托，拦截所有表单提交事件
    document.body.addEventListener('submit', function(event) {
        event.preventDefault();
        var form = event.target;
        showLoading();
        setTimeout(function() {
            form.submit();
        }, 500); // 设置加载动画显示时间，然后进行表单提交
    });

    // 拦截按钮点击事件，处理内联的 onclick
    document.querySelectorAll('button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            var target = button.getAttribute('onclick');
            if (target) {
                event.preventDefault();
                showLoading();
                setTimeout(function() {
                    eval(target);
                }, 500); // 设置加载动画显示时间，然后执行按钮的点击事件
            }
        });
    });
});
