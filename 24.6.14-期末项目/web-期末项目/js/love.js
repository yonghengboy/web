  // 页面加载后初始化背景动画和按钮交换功能
  document.addEventListener("DOMContentLoaded", function() {
    initBackground();
    setupButtonSwap();
  });

  // 返回首页函数
  function returnHome() {
    window.location.href = 'index.html'; // 跳转到首页
  }

  // 页面加载完成后设置定时器
  window.onload = function() {
    setTimeout(showFirstPrompt, 2000); // 2秒后显示第一个提示框
  };

  // 显示第一个提示框
  function showFirstPrompt() {
    var firstPrompt = document.getElementById("firstPrompt");
    firstPrompt.style.display = "block";
    dragElement(firstPrompt);
  }

  // 关闭第一个提示框
  function closeFirstPrompt() {
    document.getElementById("firstPrompt").style.display = "none";
    setTimeout(showSecondPrompt, 2000); // 2秒后显示第二个提示框
  }

  // 显示第二个提示框
  function showSecondPrompt() {
    var secondPrompt = document.getElementById("secondPrompt");
    secondPrompt.style.display = "block";
    dragElement(secondPrompt);
  }

  // 关闭第二个提示框
  function closeSecondPrompt() {
    document.getElementById("secondPrompt").style.display = "none";
    setTimeout(showThirdPrompt, 2000); // 2秒后显示第三个提示框
  }

  // 显示第三个提示框
  function showThirdPrompt() {
    var thirdPrompt = document.getElementById("thirdPrompt");
    thirdPrompt.style.display = "block";
    dragElement(thirdPrompt);
  }

  // 关闭第三个提示框
  function closeThirdPrompt() {
    document.getElementById("thirdPrompt").style.display = "none";
    setTimeout(showFourthPrompt, 2000); // 2秒后显示第四个提示框
  }

  // 显示第四个提示框
  function showFourthPrompt() {
    var fourthPrompt = document.getElementById("fourthPrompt");
    fourthPrompt.style.display = "block";
    dragElement(fourthPrompt);
  }

  // 关闭第四个提示框
  function closeFourthPrompt() {
    document.getElementById("fourthPrompt").style.display = "none";
    setTimeout(showFifthPrompt, 2000); // 2秒后显示第五个提示框
  }

  // 显示第五个提示框
  function showFifthPrompt() {
    var fifthPrompt = document.getElementById("fifthPrompt");
    fifthPrompt.style.display = "block";
    dragElement(fifthPrompt);
    startSakura(); // 显示第五个提示框时开始樱花效果
  }

  // 关闭第五个提示框
  function closeFifthPrompt() {
    document.getElementById("fifthPrompt").style.display = "none";
    setTimeout(showSixthPrompt, 2000); // 2秒后显示第六个提示框
  }

  // 显示第六个提示框
  function showSixthPrompt() {
    var sixthPrompt = document.getElementById("sixthPrompt");
    sixthPrompt.style.display = "block";
    dragElement(sixthPrompt);
  }

  // 直接跳转到首页
  function leaveDirect() {
    window.location.href = "index.html";
  }

  // 显示最终提示框并跳转到首页
  function showFinalPrompt() {
    // 隐藏当前提示框
    var sixthPrompt = document.getElementById("sixthPrompt");
    sixthPrompt.style.display = "none";

    // 显示最终提示框
    var finalPrompt = document.getElementById("finalPrompt");
    finalPrompt.style.display = "block";
    dragElement(finalPrompt);

    // 设置3秒后跳转到首页
    setTimeout(function() {
      window.location.href = "index.html";
    }, 3000); // 3秒后跳转
  }

  // 使提示框可拖动的函数
  function dragElement(elm) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elm.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // 获取鼠标光标的初始位置
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // 计算光标的新位置
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // 设置元素的新位置
      elm.style.top = (elm.offsetTop - pos2) + "px";
      elm.style.left = (elm.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // 停止移动时，注销事件监听器
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // 设置按钮交换功能
  function setupButtonSwap() {
    const notGiveUpButton = document.getElementById('notGiveUpButton');
    const leaveButton = document.getElementById('leaveButton');
    const container = document.getElementById('sixthPrompt');

    // 初始按钮位置
    leaveButton.style.left = '10px'; // “离开”按钮的初始横坐标
    leaveButton.style.top = '50px';  // “离开”按钮的初始纵坐标
    notGiveUpButton.style.left = '150px'; // “我不会放弃”按钮的初始横坐标
    notGiveUpButton.style.top = '50px';  // “我不会放弃”按钮的初始纵坐标

    // 定义一个函数，用于交换两个按钮的位置
    function swapButtonPositions() {
      // 保存“离开”按钮当前的位置
      const leaveButtonPosition = {
        left: leaveButton.style.left,
        top: leaveButton.style.top
      };
      // 交换“离开”按钮和“我不会放弃”按钮的位置
      leaveButton.style.left = notGiveUpButton.style.left;
      leaveButton.style.top = notGiveUpButton.style.top;
      notGiveUpButton.style.left = leaveButtonPosition.left;
      notGiveUpButton.style.top = leaveButtonPosition.top;
    }

    // 定义一个函数，用于检测鼠标是否靠近指定的按钮
    function isMouseNearButton(button, event) {
      // 获取按钮的边界框信息
      const rect = button.getBoundingClientRect();
      const buffer = 20; // 鼠标与按钮边缘的距离阈值，单位为像素
      // 检查鼠标位置是否在按钮周围的缓冲区内
      return (
        event.clientX >= rect.left - buffer &&
        event.clientX <= rect.right + buffer &&
        event.clientY >= rect.top - buffer &&
        event.clientY <= rect.bottom + buffer
      );
    }

    // 为容器添加鼠标移动事件监听器
    container.addEventListener('mousemove', (event) => {
      // 如果鼠标靠近“我不会放弃”按钮，则交换按钮位置
      if (isMouseNearButton(notGiveUpButton, event)) {
        swapButtonPositions();
      }
    });
  }