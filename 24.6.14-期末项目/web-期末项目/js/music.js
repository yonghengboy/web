document.addEventListener('DOMContentLoaded', () => {
    const playerContainer = document.getElementById('player-container'); // 获取播放器容器
    const songHint = document.getElementById('song-hint'); // 获取提示框
    const songsList = document.getElementById('songs'); // 获取歌曲列表
    const playPauseBtn = document.getElementById('play-pause-btn'); // 获取播放/暂停按钮
    const prevBtn = document.getElementById('prev-btn'); // 获取上一曲按钮
    const nextBtn = document.getElementById('next-btn'); // 获取下一曲按钮
    const shuffleBtn = document.getElementById('shuffle-btn'); // 获取随机播放按钮
    const notification = document.getElementById('notification'); // 获取通知框

    // 定义歌曲列表，包含歌曲标题和文件路径
    const songs = [
        { title: '拯救地球 - Michael Jackson', file: '../music/heal the world(拯救地球) - Michael Jackson.mp3' },
        { title: 'When I Come Of Age - Michael Jackson', file: '../music/When I Come Of Age (Album Version) - Michael Jackson.flac' },
        { title: '寂寞沙洲冷 - 周传雄', file: '../music/寂寞沙洲冷 - 周传雄.mp3' },
        { title: '千千阕歌 - 陈慧娴', file: '../music/千千阕歌 - 陈慧娴.mp3' },
        { title: '晴天 - 周杰伦', file: '../music/晴天 - 周杰伦.mp3' },
        { title: '让一切随风 - 钟镇涛', file: '../music/让一切随风 - 钟镇涛.mp3' },
        { title: '奢香夫人 - 凤凰传奇', file: '../music/奢香夫人 - 凤凰传奇.mp3' },
        { title: '吻别 - 张学友', file: '../music/吻别 - 张学友.mp3' },
        { title: '西海情歌 - 刀郎', file: '../music/西海情歌 - 刀郎.mp3' },
        { title: '西楼儿女 - 海来阿木', file: '../music/西楼儿女 - 海来阿木.mp3' },
        { title: '最远的你是我最近的爱 - 车继铃', file: '../music/最远的你是我最近的爱 - 车继铃.mp3' },
    ];

    let currentSongIndex = null; // 当前播放歌曲的索引
    let isPlaying = false; // 是否正在播放
    let hideTimeout; // 隐藏定时器

    const audio = new Audio(); // 创建音频对象

    // 加载歌曲列表并添加到DOM中
    function loadSongs() {
        songsList.innerHTML = ''; // 清空现有列表
        songs.forEach((song, index) => {
            const li = document.createElement('li'); // 创建列表项
            li.textContent = song.title; // 设置列表项内容
            li.classList.add('gradient-text'); // 添加五彩斑斓的字体样式
            li.addEventListener('click', () => playSong(index)); // 添加点击事件，传入当前歌曲的索引
            songsList.appendChild(li); // 添加列表项到歌曲列表
        });
    }

    // 播放指定索引的歌曲
    function playSong(index) {
        console.log(`尝试播放索引为 ${index} 的歌曲`); // 输出当前尝试播放的索引
        if (audio.src !== songs[index].file) {
            stopCurrentSong(); // 确保当前歌曲停止播放
            currentSongIndex = index; // 更新当前播放的歌曲索引
            console.log(`正在播放索引为 ${currentSongIndex} 的歌曲`); // 输出当前播放的索引
            audio.src = songs[index].file; // 设置音频源
            audio.play(); // 播放音频
            isPlaying = true; // 更新播放状态
            playPauseBtn.textContent = '暂停'; // 更新按钮文字
            highlightCurrentSong(); // 高亮当前播放的歌曲
            showNotification(`正在播放: ${songs[index].title}`); // 显示通知
        } else {
            showNotification(`歌曲已经在播放: ${songs[index].title}`); // 如果点击的歌曲已经在播放，显示通知
        }
    }

    // 停止当前播放的歌曲
    function stopCurrentSong() {
        if (currentSongIndex !== null) {
            console.log(`停止播放索引为 ${currentSongIndex} 的歌曲`); // 输出当前停止的索引
            audio.pause(); // 停止当前播放的歌曲
            audio.currentTime = 0; // 重置当前播放歌曲的时间
        }
    }

    // 切换播放/暂停状态
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause(); // 暂停播放
        } else {
            if (currentSongIndex !== null) {
                audio.play(); // 开始播放
            } else if (songs.length > 0) {
                playSong(0); // 如果没有指定播放的歌曲，播放第一首歌
            }
        }
        isPlaying = !isPlaying; // 切换播放状态
        console.log(`播放/暂停切换。当前播放状态: ${isPlaying}`); // 输出播放状态
    }

    // 播放下一曲
    function playNext() {
        if (currentSongIndex !== null) {
            currentSongIndex = (currentSongIndex + 1) % songs.length; // 更新索引到下一首
            console.log(`播放下一首歌，索引为: ${currentSongIndex}`); // 输出当前播放的索引
            playSong(currentSongIndex); // 播放歌曲
        }
    }

    // 播放上一曲
    function playPrev() {
        if (currentSongIndex !== null) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // 更新索引到上一首
            console.log(`播放上一首歌，索引为: ${currentSongIndex}`); // 输出当前播放的索引
            playSong(currentSongIndex); // 播放歌曲
        }
    }

    // 随机播放一首歌曲
    function playRandom() {
        stopCurrentSong(); // 确保当前歌曲停止播放
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length); // 生成随机索引
        } while (newIndex === currentSongIndex); // 确保新索引不同于当前索引
        currentSongIndex = newIndex; // 更新当前播放的歌曲索引
        console.log(`随机播放歌曲，索引为: ${currentSongIndex}`); // 输出当前播放的索引
        playSong(currentSongIndex); // 播放歌曲
    }

    // 高亮当前播放的歌曲
    function highlightCurrentSong() {
        const lis = songsList.getElementsByTagName('li'); // 获取所有列表项
        Array.from(lis).forEach((li, index) => {
            li.classList.toggle('playing', index === currentSongIndex); // 如果是当前播放的歌曲，添加高亮样式，否则移除
        });
        console.log(`高亮显示索引为: ${currentSongIndex} 的歌曲`); // 输出当前高亮的索引
    }

    // 确保只有一首歌曲在播放
    function ensureSinglePlay() {
        if (!audio.paused && !audio.ended) {
            const lis = songsList.getElementsByTagName('li');
            Array.from(lis).forEach((li, index) => {
                if (li.classList.contains('playing') && index !== currentSongIndex) {
                    console.log(`确保只有一首歌在播放。停止播放索引为: ${currentSongIndex} 的歌曲`); // 输出需要停止的索引
                    stopCurrentSong(); // 如果当前高亮的歌曲不是当前播放的歌曲，停止播放
                    playSong(index); // 播放高亮的歌曲
                }
            });
        }
    }

    // 显示通知
    function showNotification(message) {
        notification.textContent = message; // 设置通知内容
        notification.style.display = 'block'; // 显示通知
        setTimeout(() => {
            notification.style.display = 'none'; // 3秒后隐藏通知
        }, 3000);
    }

    // 显示播放器
    function showPlayer() {
        playerContainer.style.left = '0'; // 设置播放器位置
        songHint.style.left = '300px'; // 设置提示框位置
    }

    // 隐藏播放器
    function hidePlayer() {
        playerContainer.style.left = '-300px'; // 设置播放器位置
        songHint.style.left = '0'; // 设置提示框位置
    }

    // 鼠标离开事件处理
    function handleMouseLeave() {
        hideTimeout = setTimeout(hidePlayer, 500); // 延迟隐藏播放器
    }

    // 清除隐藏定时器
    function clearHideTimeout() {
        clearTimeout(hideTimeout); // 清除定时器
    }

    // 事件绑定
    songHint.addEventListener('mouseenter', showPlayer); // 鼠标进入提示框时显示播放器
    songHint.addEventListener('mouseleave', handleMouseLeave); // 鼠标离开提示框时隐藏播放器
    playerContainer.addEventListener('mouseenter', clearHideTimeout); // 鼠标进入播放器时清除隐藏定时器
    playerContainer.addEventListener('mouseleave', handleMouseLeave); // 鼠标离开播放器时隐藏播放器

    playPauseBtn.addEventListener('click', () => { togglePlayPause(); ensureSinglePlay(); }); // 点击播放/暂停按钮时切换播放状态并检查
    nextBtn.addEventListener('click', () => { playNext(); ensureSinglePlay(); }); // 点击下一曲按钮时播放下一曲并检查
    prevBtn.addEventListener('click', () => { playPrev(); ensureSinglePlay(); }); // 点击上一曲按钮时播放上一曲并检查
    shuffleBtn.addEventListener('click', () => { playRandom(); ensureSinglePlay(); }); // 点击随机播放按钮时随机播放并检查

    // 音频事件绑定
    audio.addEventListener('ended', playNext); // 音频播放结束时自动播放下一曲
    audio.addEventListener('play', () => {
        playPauseBtn.textContent = '暂停'; // 播放时更新按钮文字
        isPlaying = true; // 更新播放状态
        console.log(`音频正在播放。当前播放状态: ${isPlaying}，当前歌曲索引: ${currentSongIndex}`); // 输出播放状态和当前播放的索引
    });

    audio.addEventListener('pause', () => {
        playPauseBtn.textContent = '播放'; // 暂停时更新按钮文字
        isPlaying = false; // 更新播放状态
        console.log(`音频已暂停。当前播放状态: ${isPlaying}，当前歌曲索引: ${currentSongIndex}`); // 输出播放状态和当前播放的索引
    });

    loadSongs(); // 加载歌曲列表
});
