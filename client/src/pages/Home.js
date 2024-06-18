import Roulette from "../components/roulette/Roulette";
import '../App.css'
import RoulettePointer from "../components/roulette/RoulettePointer";
import { useEffect, useState } from "react";

export default function Home() {

  // const [cells, setCells] = useState([])
  // const [lastUpdate, setLastUpdate] = useState([])
  // const [goal, setGoal] = useState([])

  const cells = [
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png', color:'888888'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png', color:'111111'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png', color:'AAAAAA'},
    {name: 'name', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png', color:'FFFFFF'},
  ]

	// useEffect(() => {
  //   try {
  //     fetch(`http://localhost:4000/session/status`,
  //       {
  //         credentials: 'include',
  //       }
  //     )
  //     .then(async (res) => {
  //       if(res.status === 200)
  //       {
  //         const status = (await res.json()).loggedIn;
  //         console.log(status);
  //         if (false === status)
  //           {
  //             window.location.replace(`/`);
  //             return ;
  //           }
  //       }
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
	// 	fetch('http://localhost:4000/cells')
  //   .then(async (res) => {
  //     if (res.status === 200)
  //     {
  //       const cells = await res.json();
  //       setCells(cells.cells);
  //       setLastUpdate(cells.lastUpdate);
  //     }
  //     else
  //       console.error('Error')
  //   })
	// }, []);

  const goal = 2;

  return (
    <div className='Home'>
      <Roulette cells={cells} goal={goal}
        // setGoal={setGoal} lastUpdate={lastUpdate}
      />
      <RoulettePointer />
    </div>
    
  );
}
