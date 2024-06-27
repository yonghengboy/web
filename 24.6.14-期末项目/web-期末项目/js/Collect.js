// 当文档内容加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 内容库，存储不同的内容对象
    const contentLibrary = [
        {
            title: '如果你不曾来过',
            content: `如果你不曾来过，我的笑容很灿烂，<br />
                      没心没肺的玩着自己喜欢的事，<br />
                      不用管时间，也不用管谁的悲欢。<br />
                      如果你不曾来过，我的性格很阳光，<br />
                      不会任性的发脾气，也不会彻夜不眠，<br />
                      不用伪装悲伤，也不用故作可怜。<br />
                      我可以在星期天的清晨等一片叶子，<br />
                      遥望十五的月亮勾画山河的峰峦，<br />
                      我的心中塞满了童话的故事，<br />
                      梦乡里我读了一夜的书。<br />
                      可是后来清晨的叶子总早一步落下，<br />
                      十五的月亮总是不够圆，<br />
                      梦成了你的专属，我总是强制闭眼。<br />
                      去年，我在陌生的城市盯着一个身影，<br />
                      凝望了许久，也不敢叫一声亲爱的。<br />
                      要不是你，我的情感怎么渲染，<br />
                      要是你，也不知如何做才不手忙脚乱。<br />
                      你消失在人群，我才敢挥手，<br />
                      我笑的可甜，只是一阵酸涩，<br />
                      将曾经的你，轻轻从心里拿出来安放。<br />
                      我其实在等，明知等不到，<br />
                      可过剩的爱，剩了一辈子的余量，<br />
                      我又怎能向别人开仓，<br />
                      那是你一个人的田，<br />
                      无论丰产还是秋荒，只属于你的清扬。<br />
                      如果你不曾来过，我的生命一片荒芜，<br />
                      单调色从不斑斓，瘦弱的黑白线从不宽阔，<br />
                      也不会有极致的喜悦，看一眼照片都心花怒放。<br />
                      如果你不曾来过，我的希望一片空白，<br />
                      听不出情歌的滋味，体会不出泪水咸淡的忧伤，<br />
                      也不会记得拥抱，想融化在你的身旁。<br />
                      光明路和芒山路我终于记住了，<br />
                      等你的每一天，我走过好几遍。<br />
                      如果有下次，我认路了，<br />
                      不用你送我，我送你，陪着才能走完。<br />
                      快到第一次相遇的时间了，<br />
                      我就在原地，怎样我都不怪你。<br />
                      我习惯了等你的出现，<br />
                      来，不来，过去和现在都不是我的终点。<br />
                      我将你存进银河，满目星辉都是你，<br />
                      我将你揉进风尘，四季轮换都相遇。`
        },
        {
            title: '鼓励自己',
            content: `很多时候我们都是自己鼓励自己：<br />
                      如果我算法很厉害，那么以后一定能进大厂！<br />
                      如果我拼命学习，一定能上一个好大学！<br />
                      可能事实不是这样的，可是这个状态下的我们<br />
                      浑身上下都散发着坚定勇敢的光芒，为何要害怕呢？<br />
                      只要我们拼尽全力，那么当下的每一刻都是值得的的，<br />
                      即使我们无法把握未来，<br />
                      但是我们可以在当下的每一刻感受到自己的进步。<br />
                      当我们怀疑自己的决定时，注定一事无成，<br />
                      即使感觉是错的，但是谁知道呢？<br />
                      即使是自己催眠自己，也要努力做下去呀！<br />
                      兄弟，既然决定成为一个程序员，<br />
                      那么怎么能算法不行呢？<br />
                      人生好多事情都是没有意义的，<br />
                      但就是那些没有意义的事情，<br />
                      构成了独特而自信的我们。`
        },
        {
            title: '只有月亮才知道',
            content: `只有月亮才知道，<br />
                      我抬头望天时，<br />
                      余光里全是你。<br />
                      只有月亮才知道，<br />
                      重叠的影子里，<br />
                      犹豫的手抬起又放下。<br />
                      只有月亮才知道，<br />
                      月华之下，<br />
                      我与你拉着长长的身影。<br />
                      只有月亮才知道，<br />
                      那未曾宣之于口的爱意。<br />
                      只有月亮才知道，<br />
                      今夜月色真美的含义。`
        },
        {
            title: '月亮才知道',
            content: `有月亮才知道，<br />
                      我望向月亮的时候，<br />
                      其实是在想你。<br />
                      只有月亮才知道，<br />
                      那些不眠的夜里，<br />
                      我的心里都是你。<br />
                      只有月亮才知道，<br />
                      无论星光都闪耀，<br />
                      都不如你的眼睛。<br />
                      只有月亮才知道，<br />
                      其实在梦里，<br />
                      我们已经过完了一生。<br />
                      只有月亮才知道，<br />
                      时光清浅，<br />
                      但思念悠悠。<br />
                      我想你，<br />
                      这件事，<br />
                      只有月亮才知道。`
        },
        {
            title: '技术与人情的抉择',
            content: `“这个社会对你们并不友好，<br />
                      你去了公司，尽量多和技术打交道，<br />
                      少和人打交道，技术不会亏待你，<br />
                      而人情也没有你想的那么值钱。”<br />
                      “如果有一天，你和我说工作的很辛苦，很累，<br />
                      我不会心疼你，你还年轻，<br />
                      这是你该吃的苦，该受的罪。”<br />
                      “如果有一天，你变得特别会来事，<br />
                      迎来送往，八面玲珑，<br />
                      我会特别心疼你，<br />
                      因为你是靠杀死了自己的一部分才换来了在这个社会上生存下来的权力。”<br />
                      <br />
                      作者：易水寒<br />
                      链接：<a href="https://www.zhihu.com/question/330950959/answer/1788874300" target="_blank">知乎</a><br />
                      来源：知乎`
        },
        {
            title: '梦中的她',
            content: `美好的梦不止一个，<br />
                      只是说其中一个梦里的女主位置永远留给了她。<br />
                      得之我幸，不得我命。<br />
                      爱情并不是生活的唯一，<br />
                      并且得不到的永远是最好的。<br />
                      在过得最不得志的时候，<br />
                      发现自己还有个可以念想的梦，足矣。`
        },
        {
            title: '感情中的自虐与克制',
            content: `人们总是容易用一种自虐的方式，<br />
                      制造出一种痴情的假象，<br />
                      来使得自己站在感情的道德制高点上，<br />
                      获得一种畸形的满足感和安全感。<br />
                      其实无论是雪夜去对方家楼下站会儿，<br />
                      或者是冒着大雨给她送一杯奶茶什么的，<br />
                      自己回想起来往往觉得如乔峰大战聚贤庄、<br />
                      关羽千里走单骑一样壮怀激烈，<br />
                      而对于对方来说，一杯奶茶就是一杯奶茶，<br />
                      无法承载起你想要在上面寄托的山崩地裂的情怀。<br />
                      少年的时候，总是迫不及待地将自己的满腔爱意表达出来，<br />
                      而结果往往是陷入表演之中而不自知。<br />
                      所以两个人的记忆才会出现偏差，<br />
                      那些你觉得刻骨铭心的过去，<br />
                      对方往往没有同样的感觉，甚至茫然不知。<br />
                      成长的标志就是懂得克制自己，<br />
                      克制自己的情绪，<br />
                      克制自己的表演欲，<br />
                      甚至克制自己的喜欢。`
        },
        {
            title: '成长与认知',
            content: `我们年轻的时候，总是相信，<br />
                      我们爱的那个女孩，<br />
                      如果不嫁给自己，这辈子就不会幸福，<br />
                      生活在水深火热之中。<br />
                      反正觉得只有自己和她才是天生一对，<br />
                      其他喜欢她的男生都是贪财好色，<br />
                      只有对她自己才是真爱。<br />
                      直到过去很久，<br />
                      我们才不得不承认，<br />
                      原来她嫁给别人也能幸福。<br />
                      其实她不嫁给你，<br />
                      只是你不幸福罢了，<br />
                      她嫁给谁都可以很幸福。`
        }
    ];

    let currentIndex = 0; // 当前显示的内容索引

    /**
     * 更新内容显示函数
     * 从 contentLibrary 中根据 currentIndex 获取当前内容，并将其插入到内容容器中
     */
    function updateContent() {
        const contentContainer = document.getElementById('content-container'); // 获取内容容器
        const currentContent = contentLibrary[currentIndex]; // 获取当前内容
        
        // 将当前内容插入到内容容器中，添加动画效果
        contentContainer.innerHTML = `
            <h3 class="animated fadeInFromRight delay-1s">${currentContent.title}</h3>
            <p class="animated fadeInFromRight delay-2s">${currentContent.content}</p>
        `;
    }

    // 动态生成目录
    function generateSidebar() {
        const contentList = document.getElementById('content-list');
        contentLibrary.forEach((item, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = item.title;
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                updateContent();
            });
            listItem.appendChild(link);
            contentList.appendChild(listItem);
        });
    }

    // 初始化页面内容和目录
    function onPageLoad() {
        updateContent(); // 确保页面加载时更新内容
        generateSidebar(); // 生成目录
    }

    // 上一篇按钮点击事件
    document.getElementById('prev-btn').addEventListener('click', () => {
        // 更新当前内容索引，循环显示内容
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : contentLibrary.length - 1;
        updateContent(); // 更新内容显示
    });

    // 下一篇按钮点击事件
    document.getElementById('next-btn').addEventListener('click', () => {
        // 更新当前内容索引，循环显示内容
        currentIndex = (currentIndex < contentLibrary.length - 1) ? currentIndex + 1 : 0;
        updateContent(); // 更新内容显示
    });

    // 随机文章按钮点击事件
    document.getElementById('random-btn').addEventListener('click', () => {
        // 随机生成一个索引
        currentIndex = Math.floor(Math.random() * contentLibrary.length);
        updateContent(); // 更新内容显示
    });

    // 鼠标靠近目录区域时显示目录
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('mouseover', () => {
        sidebar.style.left = '0'; // 显示目录
        sidebarToggle.style.left = '250px'; // 调整目录提示按钮位置
    });

    // 鼠标离开目录区域时隐藏目录
    sidebar.addEventListener('mouseleave', () => {
        setTimeout(() => {
            sidebar.style.left = '-260px'; // 隐藏目录
            sidebarToggle.style.left = '0'; // 恢复目录提示按钮位置
        }, 500); // 延迟0.5秒
    });

      // 返回首页按钮点击事件
      document.getElementById('back-to-home-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });


    // 确保页面加载时执行 onPageLoad 函数
    onPageLoad();
    initBackground(); // 初始化背景动画
});