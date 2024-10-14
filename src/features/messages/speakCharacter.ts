import { wait } from "@/utils/wait";
import { Viewer } from "../vrmViewer/viewer";
import { Screenplay, Talk } from "./messages";

const createSpeakCharacter = () => {
  let lastTime = 0;
  let prevFetchPromise: Promise<unknown> = Promise.resolve();
  let prevSpeakPromise: Promise<unknown> = Promise.resolve();

  return (
    screenplay: Screenplay,
    viewer: Viewer,
    koeiroApiKey: string,
    onStart?: () => void,
    onComplete?: () => void
  ) => {
    const fetchPromise = prevFetchPromise.then(async () => {
      const now = Date.now();
      if (now - lastTime < 1000) {
        await wait(1000 - (now - lastTime));
      }

      const buffer = await fetchAudio(screenplay.talk, koeiroApiKey).catch(
        () => null
      );
      lastTime = Date.now();
      return buffer;
    });

    prevFetchPromise = fetchPromise;
    prevSpeakPromise = Promise.all([fetchPromise, prevSpeakPromise]).then(
      ([audioBuffer]) => {
        onStart?.();
        if (!audioBuffer) {
          return;
        }
        return viewer.model?.speak(audioBuffer, screenplay);
      }
    );
    prevSpeakPromise.then(() => {
      onComplete?.();
    });
  };
};

export const speakCharacter = createSpeakCharacter();

export const fetchAudio = async (
  talk: Talk,
  apiKey: string
): Promise<ArrayBuffer> => {
  const resAudio = await fetch("http://127.0.0.1:5100/synthesize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: talk.message, api_key: apiKey }),
  });
  const buffer = await resAudio.arrayBuffer();
  if (!buffer || buffer.byteLength === 0) {
    console.error('接收到的音频缓冲区为空');
    throw new Error('音频数据为空');
  }
  return buffer;
};
