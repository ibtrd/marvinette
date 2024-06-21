import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const ParticlesPeperotig = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);


  if (init) {
    return (
      <Particles
        id="tsparticles"
        url="/particles/peperotig.json"
      />
    );
  }

  return <></>;
};

export default ParticlesPeperotig;
