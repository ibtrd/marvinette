import {
  Button,
} from '@chakra-ui/react'
import './RewardModal.css'
import { useSpring, animated, easings } from 'react-spring';
import { useEffect, useState } from 'react';

export default function RewardModal({onClose, reward}) {

	const [time, setTime] = useState(Math.floor((reward.nextSpin / 1000)) - Math.floor((Date.now() / 1000)));

	useEffect(() => {
		const timer = setInterval(() => {
      const nextSpin = Math.floor((reward.nextSpin / 1000)) - Math.floor((Date.now() / 1000));  
			if (nextSpin <= 0)
			{
				setTime(0);
				clearInterval(timer);
			}
			else{
				setTime(nextSpin);
			}
		}, 1000);
		return () => {
			clearInterval(timer);
		}
	}, [reward]);

	const [spring, api] = useSpring(() => ({
    from: {
      scale: 0
    },
    to: {
      scale: 1
    },
    config: {
      duration: 200,
      ease: easings.easeInOutExpo,
    }
  }));

  const onClick = () => {
    if (time > 0)
      return;
    api.start({
			from: {
				scale: 1,
			},
			to: {
				scale: 0,
			},
			config: {
				duration: 200,
			},
			onRest: () => {
				onClose();
			}
    });
  }

	return (
        <animated.div div className='RewardModal' style={{...spring}}>
          <div className='RewardModalContainer'>
            <img src={reward.img} alt={reward.alt} />
            <p>{reward.description}</p>
          </div>
          <Button
            colorScheme='blue' onClick={() => onClick()}
            boxShadow='0 0 10px rgba(0, 0, 0, 0.1)'
            bg={time > 0 ? 'blue.800' : 'blue.500'}
          >
            {time > 0 ?
              Math.floor(time / 60).toString().padStart(2, '0') + ':' + (time % 60).toString().padStart(2, '0')
            : 'Close'}
          </Button>
        </animated.div>
	);
  }

