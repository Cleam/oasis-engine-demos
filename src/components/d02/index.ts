import { PhysXPhysics } from '@oasis-engine/physics-physx';
import { Camera, PointLight, WebGLEngine } from 'oasis-engine';
import { OrbitControl } from '@oasis-engine/controls';
import { useStore } from '../../store';
class Oasis {
  init() {
    const store = useStore();
    PhysXPhysics.init().then(() => {
      store.loading = false;
      const engine = new WebGLEngine('canvas', PhysXPhysics);

      engine.canvas.resizeByClientSize();
      const scene = engine.sceneManager.activeScene;
      const rootEntity = scene.createRootEntity('root');

      scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
      scene.ambientLight.diffuseIntensity = 1.2;

      // 相机
      const cameraEntity = rootEntity.createChild('camera');
      cameraEntity.addComponent(Camera);
      cameraEntity.transform.setPosition(10, 10, 10);
      cameraEntity.addComponent(OrbitControl);

      // 光照
      const light = rootEntity.createChild('light');
      light.transform.setPosition(0, 3, 0);
      const pointLight = light.addComponent(PointLight);
      pointLight.intensity = 0.3;

      engine.run();
    });
  }
}

export function initOasis() {
  new Oasis().init();
}
