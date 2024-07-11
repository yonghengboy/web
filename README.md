# #项目需求分析:

​	1.主题不限 60分
​	2.首页+3个子页面 可跳转 20分
​	3.使用css相关样式美化界面 15分
​	4.要求有几个简单的用户交互功能 15分
​	5.项目截至7月3日

## #项目构想：

​	1.创建个人介绍网页
​	2.使用动态 带交互背景V
​	3.登录界面 黑白系 进入主页后鲜艳花俏 形成反差V 
​	4.登录界面 简单判断是否 输入密码V
​	5.是否能够临时储存用户密码 以便实现登录X
​	6.主页

## #困难：

​	1.如何创建有可移植性的动态可交互背景V
​	2.如何实现临时储存用户密码X
​	

## #更新背景：

**页面似乎太过于没有生命感，一股死气沉沉的味道**

1.为点加上随机寿命 最少10秒 并且在生命周期 从暗到亮 最后再消亡 
2.两点如果都比较亮 在生命高峰期 那么连接两点的线的距离可以连接更长
3.线取消寿命 只有在两点距离较远才能会断开 或者其中有一点消亡
4.如果有一个点消亡 将在其他两点之间有线的附近生成 

**困难：**4.最后会出现 所有点都重生在一个范围内 而不会铺满屏幕。
	pass:太耗性能 

**#如何实现头像翻转开盖效果：**
	困难：1.只能够原地翻转，达不到开盖的效果
		  2.悬停开盖，会出现移动鼠标 就闭合 无法持续
		  

	解决方法：
		1.例如，如果悬停时应用 transform: rotateY(180deg); 变换，图片将围绕右边缘中间点进行 180 度旋转。这样，图片会从右向左翻转，形成一种从右向左旋转的效果。由于变换的中心是右边缘，图片的左边缘会向屏幕的左侧移动，显示图片背面的内容。
		2..
			circle-images:
				设置 pointer-events: none; 禁止鼠标事件，确保整个容器不会干扰交互。
			.circle-images .img-container:
				设置 pointer-events: auto; 确保子元素能够响应鼠标事件。
			当鼠标悬停在 .img-container 上时，通过 :hover 触发旋转效果。
			这样，当鼠标处于.//图片范围内时，旋转图片会触发旋转效果，显示出静止的图片。

## #更新背景-2：

​		可以为鼠标加上一点点吸引力 磁吸的效果，会不会更美观。

###### 	#实际更新：

​		**磁吸效果：**在 moveDots() 函数中，当点在磁吸范围内时，逐渐靠近边缘，调整吸引力强度。
​		**自适应窗口大小：**当窗口大小改变时，重新设置画布的宽度和高度。
​		**节省计算资源：**通过监听 visibilitychange 事件，当页面不可见时停止动画，当页面可见时重新启动动画。
​		
​		  

### #设计一个 下一个按钮：

​		1.要求美观
​		2.用于下一个收藏 下一个名言 等
​		3.使用scc实现

### #美化按钮：

​		1.最好使它与背景更加自然。

### #在主页加入图标

​		1.例如github 知乎 B站等 用并加上本人主页超链接

### #动态背景效果 或者其他原因 滚轮滑动页面卡顿  

​		已解决使用鼠标穿透
​		  	  /* 确保画布在内容下方 */
   			 /* 使滚动条能够捕获鼠标 */
​    			#backgroundCanvas {
​        				pointer-events: none; /* 允许鼠标事件穿透 canvas */
​    			}

### #为爱情页面添加彩蛋   

​			1.丢失的爱情？？
​		已实现

### #下一句名言按钮：

​			1.名言与按钮如果处于同一行 名言将不会居中
​		已解决

### #下雪效果：

​		1.会穿透容器 不美观
​		已解决：加入积雪效果  莫名其妙解决

### #字体及下雪效果：	

​		新bug 当没有网络获取外部的字体等资源时 自序网页中 技能项中 三个图标会失去效果 并且雪景会继续穿透
​		解决：下载所需的外部资源 字体 



# #24.6.27-新计划：

​		1.考虑 名言加入 五秒自动更新效果x
​		2.考虑 是否为文章加入自动更新效果X 
​		3.改进对外部效果的依赖 如字体 外部获取的css js 等V
​		4.优化冗余结构。
​		5.test樱花效果是否依赖于外部链接X
​		6.修复 自序页面 断网时（失去对外部链接的联系）出现的技能图标的消失。V

​	**解决：**

​		1.将部分外部资源的字体 css储存于本地 解决了3 6 部分问题 

##### #构思目录效果 为收藏页面增加目录

​		1.平时目录隐藏 当鼠标到达附件 展开目录
​		问题：鼠标离开目录范围 某些情况 检测不到鼠标离开 目录不隐藏。

##### #为爱情界面： 选项按钮加入  点不到的 不放弃功能

​		**功能描述:**
​			当鼠标靠近“我不会放弃”按钮时，“我不会放弃”按钮和“离开”按钮交换位置。
​			交换后，除非鼠标再次靠近新的“我不会放弃”按钮，否则按钮保持在新的位置不变。
​			用户始终无法点击“我不会放弃”按钮，只能点击“离开”按钮。
​		**具体要求:**
​			实现鼠标检测与按钮位置交换的逻辑。
​			保证用户无法点击“我不会放弃”按钮。

## #开发一个嵌入个人网页的播放器容器，包含歌单、播放控制、悬浮展开等功能。 24.6.30

​		功能详细说明
​			**1.播放器容器**
​				在个人网页左侧嵌入一个播放器容器。
​			**2.歌单**
​				使用JavaScript存储和管理歌曲库。
​				提供添加、删除和播放歌曲的功能。
​			**3.播放器状态**
​				播放器默认隐藏在网页左侧，仅显示一个歌曲提示框。
​			**4.悬浮展开**
​				当鼠标悬浮到提示框上时，展开显示歌单和控制按钮。
​				当鼠标离开歌单时，自动隐藏歌单。
​			**5.播放控制**
​				上一曲、下一曲、随机播放和暂停按钮。
​		难题：1.随机播放会出现 同时播放多首
​			    2.从歌单点击 也会出现 同时播放多首
​			**解决：**破案了 调用了两次js 





# #2024.7.2 项目总结：

### 	一，实现：

​		**1.完成动态背景:**实现 点与点间线的随机连接，以及为点 线 加入消亡规则。
​		**2.登录系统：**实现密码验证 使用简单的表单验证 以及事件委托
​		**3.个人收藏：**实现目录功能 并为其加入自动隐藏功能 储存于js  并使用js 控制 随机 上一篇 下一篇 
​		**4.爱情界面：**加入彩蛋，为每一个提示框 按钮加入分别加入事件委托，以便与用户互动， 最终对话框 加入
​			   为其加入监听器，检测鼠标是否靠近 ，靠近则交换按钮，增加趣味性 并且加入樱花效果（可能依赖网络）
​		**5.音乐模块：**使用js调用服务器端的 音乐文件 并创建音乐库  网页端展示 音乐目录  同样加入控制组件 随机 上一首，下一首
​		**6.主页：**为头像加入翻页效果 使用js 创建名言库  每次随机调用一句 并加入随机按钮
​		**7.爱好页面 ：**涉及js 不多
​		**8.自序：**加入雪景 

### 	二，难题：

​		**1.动态背景：**点 和 线 js 逻辑复杂  并且 用作背景 有时候会与页面其他功能冲突  最后加入 层次优先级和鼠标穿透解决
​		**2.头像翻转：**实现困难 卡了好久 最终解决
​		**3.自序页面：** 雪景穿透容器 无法解决  并且加入积雪效果 但效果不理想
​		**4.音乐模块:**  最后在收藏页面  发现与按钮等命名冲突  所以收藏页面没有音乐模块
​		**5.爱情页面：**提示框添加事件委托 ，后面几个提示框实现较为艰难。

### 	三,  总结：

​		很久以前就准备写个属于自己的 个人博客，但一直各种理由，一直拖延着，这次借期末作业完成了，收获很多，
​		学到了很多新东西，比动手之前想象的简单的多。 虽然还有很多地方需要优化，改进，也还剩着一些bug 没有修复。
​		但本项目个人还是很满意。

### 	四, 借鉴：借鉴了以下项目的一些功能 样式等

​		https://juejin.cn/post/7106018120036253710
​		https://gitcode.csdn.net/65aa26d0b8e5f01e1e44aceb.html
​		https://github.com/Chien-W/Personal-home-page
​		https://github.com/FoXiMao/Introduced?tab=readme-ov-file
​	再次感谢以上大佬的开源项目
​	
​		



