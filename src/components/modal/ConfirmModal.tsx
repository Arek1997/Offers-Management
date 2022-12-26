import { useContext } from 'react';

import { Modal, Button, Group, Text } from '@mantine/core';

import { ConfirmContext } from '../../context/ConfirmContext';

const ConfirmModal: React.FC = () => {
	const confirmCtx = useContext(ConfirmContext);

	return (
		<>
			<Modal
				opened={confirmCtx.opened}
				onClose={confirmCtx.toggleModal}
				size='auto'
				title='Delete Offer'
				overlayBlur={2}
				transition='fade'
				transitionDuration={500}
			>
				<Text>Are you sure you want to delete this offer?</Text>

				<Group mt='xl' position='apart'>
					<Button variant='outline' onClick={confirmCtx.toggleModal}>
						Cancel
					</Button>
					<Button variant='outline' color='red'>
						Delete offer
					</Button>
				</Group>
			</Modal>
		</>
	);
};

export default ConfirmModal;
