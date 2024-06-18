import FullRoulette from "../components/roulette/FullRoulette";
import '../App.css'
import { useEffect, useState } from "react";
import EditAlert from "../components/editAlert/EditAlert"
import { Button, useDisclosure } from '@chakra-ui/react'

export default function Home() {

  const [cells, setCells] = useState([])
  const [lastUpdate, setLastUpdate] = useState([])
  const [goal, setGoal] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  
	useEffect(() => {
		fetch('/cells')
    .then(async (res) => {
      if (res.status === 200)
      {
        const cells = await res.json();
        setCells(cells.cells);
        setLastUpdate(cells.lastUpdate);
      }
    })
	}, []);


  return (
    <div className='Home'>
      <Button variant='outline' colorScheme='red' position='absolute' top='16px' left='16px' href='/logout' as='a'>Logout</Button>
      <FullRoulette
        onOpen={onOpen}
        size={window.innerHeight < window.innerWidth ? '80vh' : '80vw'}
        cells={cells} goal={goal}
        setGoal={setGoal} lastUpdate={lastUpdate}
      />
      <EditAlert isOpen={isOpen} onClose={onClose}/>
    </div>
    
  );
}
