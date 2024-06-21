import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Flex
} from '@chakra-ui/react'

export default function RewardModal({isOpen, onClose, reward}) {

	

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
		<Flex width='10vw' height='30vh' background='red'>
			{reward.name}
		</Flex>
        {/* <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent> */}
      </Modal>
	);
  }

