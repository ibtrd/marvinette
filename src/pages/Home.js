import Roulette from "../components/roulette/Roulette";
import '../App.css'
import Profile from "../components/profile/Profile";
import { WheelProvider } from "../contexts/WheelContext";


export default function Home() {

  return (
      <WheelProvider>
        <div className='Home'>
          <Profile position='absolute' top='16px' left='16px'/>
          <Roulette
            size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
          />
        </div>
      </WheelProvider>
  );
}
