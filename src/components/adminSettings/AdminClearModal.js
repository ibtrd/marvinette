import {Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Text,
	Button,
	ModalCloseButton } from '@chakra-ui/react';
import { useError } from '../../hooks/useError';

export default function AdminClearModal({isOpen, onClose}) {

	const { showError } = useError();

	const onClear = async () => {
		const res = await fetch('/admin/logout-all');
		if (res.ok) {
			onClose();
		}
		else {
			showError('Error while clearing all users');
		}
	}


	return (
	<Modal
		isOpen={isOpen}
		onClose={onClose}
		isCentered
	>
	<ModalOverlay />
		<ModalContent>
			<ModalHeader>Are you sure ?</ModalHeader>
			<ModalCloseButton />
			<ModalFooter>
			<Button mr={3} onClick={onClose} variant='ghost'>
				Close
			</Button>
			<Button
				colorScheme='red'
				onClick={onClear}
			>
				Logout all users
			</Button>
			</ModalFooter>
		</ModalContent>
    </Modal>
	);
  }

