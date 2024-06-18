import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	Button
  } from '@chakra-ui/react'

export default function EditAlert({isOpen, onClose, ...props}) {

	const onRefresh = () => {
		window.location.reload();
	}

	return (
		<AlertDialog
			motionPreset='slideInBottom'
			onClose={onClose}
			isOpen={isOpen}
			isCentered
		>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>Wheel may have changed...</AlertDialogHeader>
			<AlertDialogCloseButton />
			<AlertDialogBody>
				Please refresh the page.
			</AlertDialogBody>
			<AlertDialogFooter>
				<Button colorScheme='red' ml={3} onClick={onRefresh}>
					Refresh
				</Button>
			</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
  }

