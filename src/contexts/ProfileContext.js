import React, { createContext, useEffect, useState} from 'react';
import { useError } from '../hooks/useError';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

	const [me, setMe] = useState();
	const { showError } = useError();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/me');
			if (response.ok)
			{
				const data = await response.json();
				setMe(data);
			}
			else
				showError("Couldn't fetch profile. Please try again later.");
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ProfileContext.Provider value={{ me }}>
			{children}
		</ProfileContext.Provider>
	);
};