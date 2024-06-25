import { useEffect, useState } from "react";
import { useError } from "./useError";

export const useNextForce = () => {
	
	const [cells, setCells] = useState([]);
	const {showError, showSuccess} = useError();

	useEffect(() => {
		const fetchCells = async () => {
			const response = await fetch('/admin/cells');
			const data = await response.json();
			setCells(data.cells);
		};
		fetchCells();
	}, []);

	const forceNext = async (cell) => {
		const response = await fetch('/admin/global', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ index: cell.id })
		});
		if (response.ok) 
			showSuccess('Next forced : ' + cell.id);
		else 
			showError('Error forcing next : ' + cell.id);
	}

	return [ cells, forceNext ];
};