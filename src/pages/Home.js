import Roulette from "../components/roulette/Roulette";
import '../App.css'
import Profile from "../components/profile/Profile";
import { WheelProvider } from "../contexts/WheelContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import ParticlesComponent from "../components/particules/ParticlesComponent";
import RewardModal from "../components/rewardModal/RewardModal";
import StatsBanner from "../components/statsBanner/statsBanner";
import { useEffect, useState } from "react";


export default function Home() {

  const [size, setSize] = useState(window.innerWidth < 768 ? '190vw' : window.innerHeight < window.innerWidth  ? '80vh' : '80vw');

  const handleResize = () => {
    setSize(window.innerWidth < 768 ? '190vw' : window.innerHeight < window.innerWidth  ? '80vh' : '80vw');
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 

  return (
      <ProfileProvider>
      <WheelProvider>
        <div className='Home'>
          <Profile position='absolute' top='16px' left='16px' right={['16px', 'auto', 'auto']}
            isAdmin={false}
          />
          <StatsBanner position='absolute' top={['auto', '16px', '16px']} bottom={['16px', 'auto', 'auto']} right='16px' left={['16px', 'auto', 'auto']} />
          <Roulette
            size={size}
          />
          <ParticlesComponent/> 
					<RewardModal/>
        </div>
      </WheelProvider>
      </ProfileProvider>
  );
}
