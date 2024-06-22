import React, { createContext, useEffect, useState} from 'react';
import { useError } from '../hooks/useError';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

	const [me, setMe] = useState({
		nextSpin: 0,
	});
	const { showError } = useError();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/me');
			if (response.ok)
			{
				const data = await response.json();
				console.log('profile', data);
				setMe(data);
			}
			else
				showError("Couldn't fetch profile. Please try again later.");
		};
		fetchData();
	}, []);

	const setLastReward = (reward) => {
		setMe({...me, lastReward: reward});
	};

	const setNextSpin = (time) => {
		console.log('time', time);
		setMe({...me, nextSpin: time});
	};

	return (
		<ProfileContext.Provider value={{me, setLastReward, setNextSpin}}>
			{children}
		</ProfileContext.Provider>
	);
};