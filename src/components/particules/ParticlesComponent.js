import { useContext, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { WheelContext } from "../../contexts/WheelContext";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);


  const {reward} = useContext(WheelContext);

  if (init && reward && reward.particles) {
    return (
      <Particles
        id="tsparticles"
        url={reward.particles}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent;
