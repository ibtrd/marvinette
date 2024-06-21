import { useToast } from '@chakra-ui/react'

export const useError = () => {
	
	const toast = useToast();

	const showError = (message) => {
		toast({
			title: 'Error',
			description: message,
			status: 'error',
			duration: 9000,
			isClosable: true,
		})
	};

	const showSuccess = (message) => {
		toast({
			title: 'Success',
			description: message,
			status: 'success',
			duration: 9000,
			isClosable: true,
		})
	}

	const showWarning = (message) => {
		toast({
			title: 'Warning',
			description: message,
			status: 'warning',
			duration: 9000,
			isClosable: true,
		})
	}

	return { showError, showSuccess, showWarning };
};