import FullRoulette from "../components/roulette/FullRoulette";
import '../App.css'
import { Button } from '@chakra-ui/react'
import { WheelProvider } from "../contexts/WheelContext";
import ConfettiFirework from "../components/confetti/ConffetiFirework";

export default function Home() {

  return (
    <WheelProvider>
      <div className='Home'>
        <Button variant='outline' colorScheme='red' position='absolute' top='16px' left='16px' href='/logout' as='a'>Logout</Button>
        <FullRoulette
          size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
        />
        <ConfettiFirework />
      </div>
    </WheelProvider>
  );
}
