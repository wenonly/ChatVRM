# ChatVRM

ChatVRM是一个可以在浏览器中轻松与3D角色对话的演示应用程序。

您可以导入VRM文件,调整适合角色的声音,并生成包含情感表达的回复文本等。

ChatVRM的各项功能主要使用以下技术:

- 用户语音识别
    - [Web Speech API(SpeechRecognition)](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
- 回复文本生成和语音合成
    - [阿里云百炼](https://www.aliyun.com/product/bailian)
- 3D角色显示
    - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)

## 运行

1. clone项目

```bash
git clone https://github.com/wenonly/ChatVRM.git
```

2. 需要先运行python服务，用于调用阿里云语音合成api。

```bash
# 运行前请安装相关依赖
python service-server/ali_audio.py
```

3. 运行前端网页项目

安装必要的包。
```bash
npm install
```

安装包完成后,使用以下命令启动开发用Web服务器。
```bash
npm run dev
```

执行后,请访问以下URL确认运行情况。

[http://localhost:3000](http://localhost:3000) 

---

## 运行docker

```bash
docker build -t chatvrm .
docker run -d -p 3000:3000 -p 5100:5100 chatvrm
# 或者使用我编译的镜像
docker run -d -p 3000:3000 -p 5100:5100 wenonly/chatvrm
```

## 阿里云百炼

ChatVRM使用阿里云百炼进行回复文本生成和语音合成。

有关阿里云百炼的规格和使用条款,请查看以下链接或官方网站。

- [阿里云百炼API](https://www.aliyun.com/product/bailian)
