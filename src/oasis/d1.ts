import { PhysXPhysics } from '@oasis-engine/physics-physx';
import {
  BlinnPhongMaterial,
  BoxColliderShape,
  Camera,
  ColliderShape,
  DynamicCollider,
  MeshRenderer,
  PointLight,
  PrimitiveMesh,
  Script,
  SphereColliderShape,
  StaticCollider,
  Vector3,
  WebGLEngine,
} from 'oasis-engine';
import { OrbitControl } from '@oasis-engine/controls';
import { useStore } from '../store';
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

      // 创建测试盒子
      const cubeSize = 2.0;
      const boxEntity = rootEntity.createChild('BoxEngity');

      // 材质
      const boxMtl = new BlinnPhongMaterial(engine);
      boxMtl.baseColor.setValue(0.6, 0.3, 0.3, 1.0);
      // 网格模型
      const boxRenderer = boxEntity.addComponent(MeshRenderer);
      boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, cubeSize, cubeSize, cubeSize);
      boxRenderer.setMaterial(boxMtl);

      // 创建对应的物理盒子
      const physicsBox = new BoxColliderShape();
      physicsBox.size = new Vector3(cubeSize, cubeSize, cubeSize);
      physicsBox.material.staticFriction = 0.1; // 静态摩擦力
      physicsBox.material.dynamicFriction = 0.2; // 动态摩擦力
      physicsBox.material.bounciness = 1; // 弹性
      physicsBox.isTrigger = true;

      // 添加静态碰撞体
      const boxCollider = boxEntity.addComponent(StaticCollider);
      // 添加碰撞体形状
      boxCollider.addShape(physicsBox);

      // 创建球形实体
      const radius = 1.25;
      const sphereEntity = rootEntity.createChild('SphereEntity');
      sphereEntity.transform.setPosition(0, 5, 0);

      const sphereMtl = new BlinnPhongMaterial(engine);
      sphereMtl.baseColor.setValue(Math.random(), Math.random(), Math.random(), 1);
      const sphereRenderer = sphereEntity.addComponent(MeshRenderer);
      sphereRenderer.mesh = PrimitiveMesh.createSphere(engine, radius);
      sphereRenderer.setMaterial(sphereMtl);

      // 创建对应的物理球碰撞体
      const physicsSphere = new SphereColliderShape();
      physicsSphere.radius = radius;
      physicsSphere.material.staticFriction = 0.1;
      physicsSphere.material.dynamicFriction = 0.2;
      physicsSphere.material.bounciness = 1;

      // 添加动态碰撞体
      const sphereCollider = sphereEntity.addComponent(DynamicCollider);
      // 添加碰撞体形状
      sphereCollider.addShape(physicsSphere);

      let colliderPos = 0;
      let maxPos = 5;
      let count = 10;
      class MoveScript extends Script {
        pos: Vector3 = new Vector3(0, 5, 0);
        vel: number = 0.005; // 移动距离
        velSign: number = -1; // 移动方向
        onUpdate(deltaTime: number): void {
          super.onUpdate(deltaTime);
          // if (this.pos.x >= 5) {
          //   this.velSign = -1;
          // }
          // if (this.pos.x <= -5) {
          //   this.velSign = 1;
          // }
          // if (count > 0) {
          //   console.log(this.pos.y, colliderPos);
          //   count--;
          // }
          if (this.pos.y <= colliderPos) {
            this.velSign = 1;
          }
          if (this.pos.y >= maxPos) {
            this.velSign = -1;
          }

          this.pos.y += deltaTime * this.vel * this.velSign;

          this.entity.transform.position = this.pos;
        }
      }

      class ColliderScript extends Script {
        onTriggerEnter(other: ColliderShape): void {
          // console.log(sphereEntity.transform.position.y);
          colliderPos = sphereEntity.transform.position.y;

          (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(
            Math.random(),
            Math.random(),
            Math.random(),
            1.0
          );
        }
        onTriggerExit(other: ColliderShape): void {
          // colliderPos = sphereEntity.transform.position.y;
          (<BlinnPhongMaterial>sphereRenderer.getMaterial()).baseColor.setValue(
            Math.random(),
            Math.random(),
            Math.random(),
            1
          );
        }
        onTriggerStay(other: ColliderShape): void {
          // console.log('hahaha');
        }
      }

      sphereEntity.addComponent(ColliderScript);
      sphereEntity.addComponent(MoveScript);

      engine.run();
    });
  }
}

export function initOasis() {
  new Oasis().init();
}
