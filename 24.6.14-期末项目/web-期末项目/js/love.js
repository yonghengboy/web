      // 确保脚本在页面加载后执行
      document.addEventListener("DOMContentLoaded", function() {
        initBackground();
    });
     // 返回首页函数
     function returnHome() {
          window.location.href = 'index.html'; // 跳转到首页
      }

// 页面加载完成后设置定时器
window.onload = function() {
    setTimeout(showFirstPrompt, 3000); // 3秒后显示第一个提示框
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
    setTimeout(showSecondPrompt, 5000); // 5秒后显示第二个提示框
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
    setTimeout(showThirdPrompt, 5000); // 5秒后显示第三个提示框
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
    setTimeout(showFourthPrompt, 5000); // 5秒后显示第四个提示框
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
    setTimeout(showFifthPrompt, 5000); // 5秒后显示第五个提示框
  }
  
  // 显示第五个提示框
  function showFifthPrompt() {
    var fifthPrompt = document.getElementById("fifthPrompt");
    fifthPrompt.style.display = "block";
    dragElement(fifthPrompt);
  }
  
  // 关闭第五个提示框
  function closeFifthPrompt() {
    document.getElementById("fifthPrompt").style.display = "none";
    setTimeout(showSixthPrompt, 5000); // 5秒后显示第六个提示框
  }
  
  // 显示第六个提示框
  function showSixthPrompt() {
    var sixthPrompt = document.getElementById("sixthPrompt");
    sixthPrompt.style.display = "block";
    dragElement(sixthPrompt);
  }
  
  // 跳转到首页并显示最终提示框
  function leave() {
    document.getElementById("sixthPrompt").style.display = "none";
    setTimeout(showFinalPrompt, 500); // 0.5秒后显示最终提示框
  }
  
  // 显示最终提示框
  function showFinalPrompt() {
    var finalPrompt = document.getElementById("finalPrompt");
    finalPrompt.style.display = "block";
    dragElement(finalPrompt);
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
  
  