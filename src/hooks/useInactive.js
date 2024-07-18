import { useState, useEffect, useContext } from 'react';
import { useError } from './useError';
import { ProfileContext } from '../contexts/ProfileContext';

export const useInactive = () => {
	
	const [value, setValue] = useState();

	useEffect(() => {
		const fetchValue = async () => {
			const response = await fetch(`/nofun/data`);
			const data = await response.json();
			setValue(data);
		};
		fetchValue();
	}, []);

	return value;
};