import Roulette from "../components/roulette/Roulette";
import '../App.css'
import Profile from "../components/profile/Profile";
import { WheelProvider } from "../contexts/WheelContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import ParticlesComponent from "../components/particules/ParticlesComponent";
import RewardModal from "../components/rewardModal/RewardModal";


export default function Home() {

  const size = window.innerWidth < 768 ? '190vw' : window.innerHeight < window.innerWidth  ? '80vh' : '80vw';
 

  return (
      <ProfileProvider>
      <WheelProvider>
        <div className='Home'>
          <Profile position='absolute' top='16px' left='16px' right={['16px', 'auto', 'auto']} />
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
