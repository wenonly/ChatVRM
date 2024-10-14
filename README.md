# ChatVRM

ChatVRM是一个主要用于技术分享和演示的项目。

本仓库已于2024-07-18存档。
如果您想对ChatVRM进行修改,请fork后进行开发。

---

ChatVRM是一个可以在浏览器中轻松与3D角色对话的演示应用程序。

您可以导入VRM文件,调整适合角色的声音,并生成包含情感表达的回复文本等。

ChatVRM的各项功能主要使用以下技术:

- 用户语音识别
    - [Web Speech API(SpeechRecognition)](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognition)
- 回复文本生成
    - [ChatGPT API](https://platform.openai.com/docs/api-reference/chat)
- 语音合成
    - [Koemotion/Koeiromap API](https://koemotion.rinna.co.jp/)
- 3D角色显示
    - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)


## 演示

在Glitch上发布了演示。

[https://chatvrm.glitch.me](https://chatvrm.glitch.me)

## 运行
如果要在本地环境运行,请克隆或下载此仓库。

```bash
git clone git@github.com:pixiv/ChatVRM.git
```

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

## ChatGPT API

ChatVRM使用ChatGPT API生成回复文本。

有关ChatGPT API的规格和使用条款,请查看以下链接或官方网站。

- [https://platform.openai.com/docs/api-reference/chat](https://platform.openai.com/docs/api-reference/chat)
- [https://openai.com/policies/api-data-usage-policies](https://openai.com/policies/api-data-usage-policies)


## Koeiromap API
ChatVRM使用Koemotion的Koeiromap API进行回复文本的语音朗读。

有关Koeiromap API的规格和使用条款,请查看以下链接或官方网站。

- [https://koemotion.rinna.co.jp/](https://koemotion.rinna.co.jp/)
