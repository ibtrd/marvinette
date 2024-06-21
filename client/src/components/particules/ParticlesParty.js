import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const ParticlesParty = () => {
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
        url="/particles/party.json"
      />
    );
  }

  return <></>;
};

export default ParticlesParty;
