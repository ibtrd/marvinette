import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text
  } from '@chakra-ui/react'

export default function RewardModal({isOpen, onClose, reward, ...props}) {

	return (
		<Modal isOpen={isOpen} onClose={onClose} {...props}>
        <ModalOverlay />
        <ModalContent bg='black' mixBlendMode='difference'>
          <ModalHeader>
            {reward.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{reward.name}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
	);
  }

