import { useState, useEffect } from 'react';
import { useError } from './useError';

export const useSettings = (key) => {
	
	const [value, setValue] = useState();
	const { showError, showSuccess } = useError();

	useEffect(() => {
		const fetchValue = async () => {
			const response = await fetch(`/admin/settings/${key}`);
			const data = await response.json();
			setValue(data);
		};
		fetchValue();
	}, []);

	const updateValue = async () => {
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

	const handleValue = (e) => {
		setValue(e.target.value);
	}

	return [ value, handleValue, updateValue ];
};