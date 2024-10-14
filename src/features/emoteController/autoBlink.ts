import { VRMExpressionManager } from "@pixiv/three-vrm";
import { BLINK_CLOSE_MAX, BLINK_OPEN_MAX } from "./emoteConstants";

/**
 * 控制自动眨眼的类
 */
export class AutoBlink {
  private _expressionManager: VRMExpressionManager;
  private _remainingTime: number;
  private _isOpen: boolean;
  private _isAutoBlink: boolean;

  constructor(expressionManager: VRMExpressionManager) {
    this._expressionManager = expressionManager;
    this._remainingTime = 0;
    this._isAutoBlink = true;
    this._isOpen = true;
  }

  /**
   * 开启/关闭自动眨眼。
   *
   * 当眼睛闭合（blink为1）时应用情感表情会显得不自然，
   * 所以返回眼睛睁开所需的秒数，等待这段时间后再应用情感表情。
   * @param isAuto
   * @returns 眼睛睁开所需的秒数
   */
  public setEnable(isAuto: boolean) {
    this._isAutoBlink = isAuto;

    // 如果眼睛闭合，返回眼睛睁开所需的时间
    if (!this._isOpen) {
      return this._remainingTime;
    }

    return 0;
  }

  public update(delta: number) {
    if (this._remainingTime > 0) {
      this._remainingTime -= delta;
      return;
    }

    if (this._isOpen && this._isAutoBlink) {
      this.close();
      return;
    }

    this.open();
  }

  private close() {
    this._isOpen = false;
    this._remainingTime = BLINK_CLOSE_MAX;
    this._expressionManager.setValue("blink", 1);
  }

  private open() {
    this._isOpen = true;
    this._remainingTime = BLINK_OPEN_MAX;
    this._expressionManager.setValue("blink", 0);
  }
}
