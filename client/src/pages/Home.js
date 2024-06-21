import FullRoulette from "../components/roulette/FullRoulette";
import '../App.css'
import Profile from "../components/profile/Profile";


export default function Home() {

  return (
      <div className='Home'>
        <Profile position='absolute' top='16px' left='16px'/>
        <FullRoulette
          size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
        />
      </div>
  );
}
