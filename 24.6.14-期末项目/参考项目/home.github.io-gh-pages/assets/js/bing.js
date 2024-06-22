// 引入https模块和fs模块，用于发送HTTP请求和文件操作
const https = require('https');
const fs = require('fs');

// 定义https请求的选项
const options = {
  hostname: 'www.bing.com', // Bing的主机名
  port: 443,                // HTTPS端口
  path: '/HPImageArchive.aspx?format=js&idx=0&n=8', // 请求路径，获取Bing壁纸数据
  method: 'GET'             // 请求方法为GET
};

// 发送https请求
const req = https.request(options, bing_res => {
  // 用于存储响应数据的变量
  let bing_body = [], bing_data = {};

  // 监听'data'事件，接收数据块
  bing_res.on('data', (chunk) => {
    bing_body.push(chunk); // 将数据块推入bing_body数组
  });

  // 监听'end'事件，处理接收完的数据
  bing_res.on('end', () => {
    // 将接收到的数据块连接成一个完整的Buffer对象
    bing_body = Buffer.concat(bing_body);
    // 将Buffer对象转换为字符串并解析为JSON对象
    bing_data = JSON.parse(bing_body.toString());

    // 提取图片URL数组
    let img_array = bing_data.images;
    let img_url = [];
    img_array.forEach(img => {
      img_url.push(img.url); // 将每张图片的URL推入img_url数组
    });

    // 构造JSONP字符串，调用getBingImages函数
    var jsonpStr = "getBingImages(" + JSON.stringify(img_url) + ")";

    // 将JSONP字符串写入文件images.json
    fs.writeFile('./assets/json/images.json', jsonpStr, (err) => {
      if (err) {
        throw err; // 如果发生错误，抛出异常
      }
      // 打印成功消息和写入的JSONP字符串
      console.log("JSON data is saved: " + jsonpStr);
    });
  });
});

// 监听请求错误事件，打印错误信息
req.on('error', error => {
  console.error(error);
});

// 结束请求
req.end();
