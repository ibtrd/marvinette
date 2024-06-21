import FullRoulette from "../components/roulette/FullRoulette";
import '../App.css'
import { Button } from '@chakra-ui/react'

export default function Home() {

  

  return (
      <div className='Home'>
        <Button variant='outline' colorScheme='red' position='absolute' top='16px' left='16px' href='/logout' as='a'>Logout</Button>
        <FullRoulette
          size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
        />
      </div>
  );
}
