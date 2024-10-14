import * as THREE from "three";
import { VRM } from "@pixiv/three-vrm";
/**
 * 控制视线的类
 *
 * 由于眼球跳动（saccade）已在VRMLookAtSmoother中实现，
 * 如果想要更大幅度地移动视线，可以在这里实现。
 */
export class AutoLookAt {
  private _lookAtTarget: THREE.Object3D;
  constructor(vrm: VRM, camera: THREE.Object3D) {
    this._lookAtTarget = new THREE.Object3D();
    camera.add(this._lookAtTarget);

    if (vrm.lookAt) vrm.lookAt.target = this._lookAtTarget;
  }
}
