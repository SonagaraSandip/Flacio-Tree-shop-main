import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useRef } from "react";

const Controls = ({ orbitRef }) => {
  const { camera, gl } = useThree();

  // Zoom In
  const handleZoomIn = () => {
    camera.position.z += 20;
    orbitRef.current.update();
  };

  // Zoom Out
  const handleZoomOut = () => {
    camera.position.z -= 20;
    orbitRef.current.update();
  };

  // Fullscreen Toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      gl.domElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Html fullscreen>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-white border rounded p-2 shadow"
        >
          ➕
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white border rounded p-2 shadow"
        >
          ➖
        </button>
        <button
          onClick={handleFullscreen}
          className="bg-white border rounded p-2 shadow"
        >
          ⛶
        </button>
      </div>
    </Html>
  );
};

const Tree3DViewer = ({ glbFile }) => {
  const { scene } = useGLTF(glbFile);
  const orbitRef = useRef();

  return (
    <div className="relative h-full w-full min-h-[700px] cursor-grab  ">
      <Canvas
        style={{ width: "100%", height: "100%"   }}
        camera={{ position: [-90, 2, 15], fov: 45 }}
      >
          
        {/* Lights */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Orbit Controls */}
        <OrbitControls
          ref={orbitRef}
          enableZoom={true}
          enablePan={true}
          target={[0, 1, 0]}
        />

        {/* Model */}
        <group scale={40} position={[0, -30, 0]} rotation={[0, Math.PI, 0]}>
          <primitive object={scene} />
        </group>

        {/* Overlay Buttons (now inside Canvas context) */}
        <Controls orbitRef={orbitRef} />
      </Canvas>
    </div>
  );
};

export default Tree3DViewer;
