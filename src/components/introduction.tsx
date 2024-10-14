import { useState, useCallback } from "react";
import { Link } from "./link";

type Props = {
  openAiKey: string;
  koeiroMapKey: string;
  onChangeAiKey: (openAiKey: string) => void;
  onChangeKoeiromapKey: (koeiromapKey: string) => void;
};
export const Introduction = ({
  openAiKey,
  koeiroMapKey,
  onChangeAiKey,
  onChangeKoeiromapKey,
}: Props) => {
  const [opened, setOpened] = useState(true);

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value);
    },
    [onChangeAiKey]
  );

  const handleKoeiromapKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeKoeiromapKey(event.target.value);
    },
    [onChangeKoeiromapKey]
  );

  return opened ? (
    <div className="absolute z-40 w-full h-full px-24 py-40  bg-black/30 font-M_PLUS_2">
      <div className="mx-auto my-auto max-w-3xl max-h-full p-24 overflow-auto bg-white rounded-16">
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary ">
            关于此应用程序
          </div>
          <div>
            仅使用网络浏览器就可以通过麦克风、文本输入和语音合成与3D角色进行对话。还可以更改角色(VRM)、设置性格和调整声音。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            技术介绍
          </div>
          <div>
            3D模型的显示和操作使用了
            <Link
              url={"https://github.com/pixiv/three-vrm"}
              label={"@pixiv/three-vrm"}
            />
            ，对话文本生成使用了
            <Link
              url={
                "https://openai.com/blog/introducing-chatgpt-and-whisper-apis"
              }
              label={"ChatGPT API"}
            />
            ，语音合成使用了
            <Link url={"https://koemotion.rinna.co.jp/"} label={"Koemotion"} />
            的
            <Link
              url={
                "https://developers.rinna.co.jp/product/#product=koeiromap-free"
              }
              label={"Koeiromap API"}
            />
            。详情请查看这篇
            <Link
              url={"https://inside.pixiv.blog/2023/04/28/160000"}
              label={"技术解析文章"}
            />
            。
          </div>
          <div className="my-16">
            这个演示的源代码在GitHub上公开。欢迎自由尝试修改和改进！
            <br />
            仓库：
            <Link
              url={"https://github.com/pixiv/ChatVRM"}
              label={"https://github.com/pixiv/ChatVRM"}
            />
          </div>
        </div>

        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            使用注意事项
          </div>
          <div>
            请不要故意引导产生歧视性或暴力性言论，或贬低特定人物的言论。此外，在使用VRM模型替换角色时，请遵守模型的使用条件。
          </div>
        </div>

        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            Koeiromap API密钥
          </div>
          <input
            type="text"
            placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            value={koeiroMapKey}
            onChange={handleKoeiromapKeyChange}
            className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          ></input>
          <div>
            请从rinna Developers获取API密钥。
            <Link
              url="https://developers.rinna.co.jp/product/#product=koeiromap-free"
              label="详情请点击这里"
            />
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold typography-20 text-secondary">
            OpenAI API密钥
          </div>
          <input
            type="text"
            placeholder="sk-..."
            value={openAiKey}
            onChange={handleAiKeyChange}
            className="my-4 px-16 py-8 w-full h-40 bg-surface3 hover:bg-surface3-hover rounded-4 text-ellipsis"
          ></input>
          <div>
            可以在
            <Link
              url="https://platform.openai.com/account/api-keys"
              label="OpenAI网站"
            />
            获取API密钥。请将获取的API密钥输入到表单中。
          </div>
          <div className="my-16">
            ChatGPT API是直接从浏览器访问的。此外，API密钥和对话内容不会保存在pixiv的服务器上。
            <br />
            ※使用的模型是ChatGPT API (GPT-3.5)。
          </div>
        </div>
        <div className="my-24">
          <button
            onClick={() => {
              setOpened(false);
            }}
            className="font-bold bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled text-white px-24 py-8 rounded-oval"
          >
            输入API密钥开始使用
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
