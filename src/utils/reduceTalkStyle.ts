/* koeiromap Free v1の制限に対応した声色 */
type ReducedTalkStyle = "talk" | "happy" | "sad";

/**
 * 为koeiromap Free v1限制声音参数
 */
export const reduceTalkStyle = (talkStyle: string): ReducedTalkStyle => {
  if (talkStyle == "talk" || talkStyle == "happy" || talkStyle == "sad") {
    return talkStyle;
  }

  return "talk";
};
