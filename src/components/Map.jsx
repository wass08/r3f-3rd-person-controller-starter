import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const Map = ({ model, ...props }) => {
  const { scene, animations } = useGLTF(model);
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name].play();
    }
  }, [actions]);

  return (
    <group>
      <primitive object={scene} {...props} ref={group} />
    </group>
  );
};
