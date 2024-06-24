document.addEventListener('DOMContentLoaded', function() {
    // 内容库，存储不同的内容对象
    const contentLibrary = [
        {
            title: '如果你不曾来过',
            content: `如果你不曾来过，我的笑容很灿烂<br />没心没肺的玩着自己喜欢的事<br />
                      不用管时间，也不用管谁的悲欢<br />如果你不曾来过，我的性格很阳光<br/>
                      不会任性的发脾气，也不会彻夜不眠<br/>不用伪装悲伤，也不用故作可怜<br/>
                      我可以在星期天的清晨等一片叶子<br/>遥望十五的月亮勾画山河的峰峦<br/>
                      我的心中塞满了童话的故事<br/>梦乡里我读了一夜的书<br/>
                      可是后来清晨的叶子总早一步落下<br/>十五的月亮总是不够圆<br/>
                      梦成了你的专属，我总是强制闭眼<br/>去年，我在陌生的城市盯着一个身影<br/>
                      凝望了许久，也不敢叫一声亲爱的<br/>要不是你，我的情感怎么渲染<br/>
                      要是你，也不知如何做才不手忙脚乱<br/>你消失在人群，我才敢挥手<br/>
                      我笑的可甜，只是一阵酸涩<br/>将曾经的你，轻轻从心里拿出来安放<br/>
                      我其实在等，明知等不到<br/>可过剩的爱，剩了一辈子的余量<br/>
                      我又怎能向别人开仓，那是你一个人的田<br/>无论丰产还是秋荒，只属于你的清扬<br/>
                      如果你不曾来过，我的生命一片荒芜<br/>单调色从不斑斓，瘦弱的黑白线从不宽阔<br/>
                      也不会有极致的喜悦，看一眼照片都心花怒放<br/>如果你不曾来过，我的希望一片空白<br/>
                      听不出情歌的滋味，体会不出泪水咸淡的忧伤<br/>也不会记得拥抱，想融化在你的身旁<br/>
                      光明路和芒山路我终于记住了<br/>等你的每一天，我走过好几遍<br/>
                      如果有下次，我认路了<br/>不用你送我，我送你，陪着才能走完<br/>
                      快到第一次相遇的时间了<br/>我就在原地，怎样我都不怪你<br/>
                      我习惯了等你的出现<br/>来，不来，过去和现在都不是我的终点<br/>
                      我将你存进银河，满目星辉都是你<br/>我将你揉进风尘，四季轮换都相遇`
        },
        // 可以在这里添加更多内容对象
    ];

    let currentIndex = 0; // 当前显示的内容索引

    // 更新内容显示函数
    function updateContent() {
        // 获取内容容器
        const contentContainer = document.getElementById('content-container');
        // 获取当前内容
        const currentContent = contentLibrary[currentIndex];
        
        // 将当前内容插入到内容容器中
        contentContainer.innerHTML = `
            <h3 class="animated fadeInLeft delay-1s">${currentContent.title}</h3>
            <p class="animated fadeInLeft delay-2s">${currentContent.content}</p>
        `;
    }

    // 上一篇按钮点击事件
    document.getElementById('prev-btn').addEventListener('click', () => {
        // 更新当前内容索引，循环显示内容
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : contentLibrary.length - 1;
        updateContent();
    });

    // 下一篇按钮点击事件
    document.getElementById('next-btn').addEventListener('click', () => {
        // 更新当前内容索引，循环显示内容
        currentIndex = (currentIndex < contentLibrary.length - 1) ? currentIndex + 1 : 0;
        updateContent();
    });

    // 页面加载时显示内容并依次显示内容
    function onPageLoad() {
        updateContent(); // 确保页面加载时更新内容
        const elements = document.querySelectorAll('.content'); // 获取所有 .content 类元素
        elements.forEach((element, index) => {
            // 依次显示每个元素，添加显示效果类
            setTimeout(() => {
                element.classList.add('show');
            }, index * 300);
        });
    }

    // 确保页面加载时执行 onPageLoad 函数
    onPageLoad(); // 加载页面时执行 onPageLoad 函数
    initBackground(); // 初始化背景动画
});
