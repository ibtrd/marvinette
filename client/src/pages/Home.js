import FullRoulette from "../components/roulette/FullRoulette";
import '../App.css'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
// import RewardModal from '../components/RewardModal'

export default function Home() {

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // useEffect(() => {
  //   onOpen();
  // }, [])

  return (
      <div className='Home'>
        <Button variant='outline' colorScheme='red' position='absolute' top='16px' left='16px' href='/auth/logout' as='a'>Logout</Button>
        <FullRoulette
          size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
        />
        {/* <RewardModal
          isOpen={isOpen}
          onClose={onClose}
          reward={{name: 'Welcome to the Roulette!', description: 'Click on the wheel to spin and get a reward!'}}
        /> */}
      </div>
  );
}
