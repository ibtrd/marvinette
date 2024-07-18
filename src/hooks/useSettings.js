import { useState, useEffect, useContext } from 'react';
import { useError } from './useError';
import { ProfileContext } from '../contexts/ProfileContext';

export const useSettings = (key) => {
	
	const [value, setValue] = useState();
	const { showError, showSuccess } = useError();
	const { me } = useContext(ProfileContext);

	useEffect(() => {
		const fetchValue = async () => {
			const response = await fetch(`/admin/settings/${key}`);
			const data = await response.json();
			setValue(data);
		};
		if (me && me.admin)
			fetchValue();
	}, [me, key]);

	const updateValue = async () => {
		if (me && me.admin) {
			const response = await fetch(`/admin/settings/${key}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ value })
			});
			if (response.ok) {
				showSuccess(`Settings updated: ${key}`);
			}
			else {
				showError(`Failed to update ${key}`);
			}
		}
	}

	const handleValue = (e) => {
		console.log(e);
		setValue(e.target.value);
	}

	return [ value, handleValue, updateValue ];
};