import { VRMHumanoid, VRMLookAt, VRMLookAtApplier } from "@pixiv/three-vrm";
import * as THREE from "three";

/** 发生扫视运动的最小间隔 */
const SACCADE_MIN_INTERVAL = 0.5;

/**
 * 发生扫视运动的概率
 */
const SACCADE_PROC = 0.05;

/** 扫视运动的范围半径。这是传递给lookAt的值，而不是实际眼球移动的半径，所以稍微大一些。单位：度 */
const SACCADE_RADIUS = 5.0;

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _eulerA = new THREE.Euler();

/**
 * 为`VRMLookAt`添加以下功能：
 *
 * - 如果分配了`userTarget`，则平滑地朝向用户方向
 * - 不仅用眼睛，还用头部旋转来朝向
 * - 添加眼球的扫视运动
 */
export class VRMLookAtSmoother extends VRMLookAt {
  /** 用于平滑的系数 */
  public smoothFactor = 4.0;

  /** 朝向用户的最大角度限制，单位：度 */
  public userLimitAngle = 90.0;

  /** 用户朝向。原有的`target`用于动画 */
  public userTarget?: THREE.Object3D | null;

  /** 设置为`false`可以禁用扫视运动 */
  public enableSaccade: boolean;

  /** 存储扫视运动的偏航方向 */
  private _saccadeYaw = 0.0;

  /** 存储扫视运动的俯仰方向 */
  private _saccadePitch = 0.0;

  /** 当此计时器超过SACCADE_MIN_INTERVAL时，以SACCADE_PROC的概率触发扫视运动 */
  private _saccadeTimer = 0.0;

  /** 平滑处理的偏航角 */
  private _yawDamped = 0.0;

  /** 平滑处理的俯仰角 */
  private _pitchDamped = 0.0;

  /** 临时存储firstPersonBone的旋转 */
  private _tempFirstPersonBoneQuat = new THREE.Quaternion();

  public constructor(humanoid: VRMHumanoid, applier: VRMLookAtApplier) {
    super(humanoid, applier);

    this.enableSaccade = true;
  }

  public update(delta: number): void {
    if (this.target && this.autoUpdate) {
      // 动画的视线
      // 更新 `_yaw` 和 `_pitch`
      this.lookAt(this.target.getWorldPosition(_v3A));

      // 由动画指定的偏航角/俯仰角。在此函数内不变
      const yawAnimation = this._yaw;
      const pitchAnimation = this._pitch;

      // 这一帧最终要使用的偏航角/俯仰角
      let yawFrame = yawAnimation;
      let pitchFrame = pitchAnimation;

      // 用户朝向
      if (this.userTarget) {
        // 更新 `_yaw` 和 `_pitch`
        this.lookAt(this.userTarget.getWorldPosition(_v3A));

        // 角度限制。如果超过 `userLimitAngle`，则朝向动画指定的方向
        if (
          this.userLimitAngle < Math.abs(this._yaw) ||
          this.userLimitAngle < Math.abs(this._pitch)
        ) {
          this._yaw = yawAnimation;
          this._pitch = pitchAnimation;
        }

        // 平滑处理 yawDamped / pitchDamped
        const k = 1.0 - Math.exp(-this.smoothFactor * delta);
        this._yawDamped += (this._yaw - this._yawDamped) * k;
        this._pitchDamped += (this._pitch - this._pitchDamped) * k;

        // 与动画混合
        // 如果动画朝向侧面等方向，则尊重动画的朝向
        const userRatio =
          1.0 -
          THREE.MathUtils.smoothstep(
            Math.sqrt(
              yawAnimation * yawAnimation + pitchAnimation * pitchAnimation
            ),
            30.0,
            90.0
          );

        // 将结果赋值给 yawFrame / pitchFrame
        yawFrame = THREE.MathUtils.lerp(
          yawAnimation,
          0.6 * this._yawDamped,
          userRatio
        );
        pitchFrame = THREE.MathUtils.lerp(
          pitchAnimation,
          0.6 * this._pitchDamped,
          userRatio
        );

        // 也旋转头部
        _eulerA.set(
          -this._pitchDamped * THREE.MathUtils.DEG2RAD,
          this._yawDamped * THREE.MathUtils.DEG2RAD,
          0.0,
          VRMLookAt.EULER_ORDER
        );
        _quatA.setFromEuler(_eulerA);

        const head = this.humanoid.getRawBoneNode("head")!;
        this._tempFirstPersonBoneQuat.copy(head.quaternion);
        head.quaternion.slerp(_quatA, 0.4);
        head.updateMatrixWorld();
      }

      if (this.enableSaccade) {
        // 计算扫视运动的移动方向
        if (
          SACCADE_MIN_INTERVAL < this._saccadeTimer &&
          Math.random() < SACCADE_PROC
        ) {
          this._saccadeYaw = (2.0 * Math.random() - 1.0) * SACCADE_RADIUS;
          this._saccadePitch = (2.0 * Math.random() - 1.0) * SACCADE_RADIUS;
          this._saccadeTimer = 0.0;
        }

        this._saccadeTimer += delta;

        // 添加扫视运动的移动量
        yawFrame += this._saccadeYaw;
        pitchFrame += this._saccadePitch;

        // 传递给applier
        this.applier.applyYawPitch(yawFrame, pitchFrame);
      }

      // 已经应用了，所以在这一帧内不需要再更新
      this._needsUpdate = false;
    }

    // 不使用target控制lookAt的情况
    if (this._needsUpdate) {
      this._needsUpdate = false;
      this.applier.applyYawPitch(this._yaw, this._pitch);
    }
  }

  /** 渲染后调用此方法以恢复头部旋转 */
  public revertFirstPersonBoneQuat(): void {
    if (this.userTarget) {
      const head = this.humanoid.getNormalizedBoneNode("head")!;
      head.quaternion.copy(this._tempFirstPersonBoneQuat);
    }
  }
}
