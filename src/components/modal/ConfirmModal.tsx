import { Modal, Button, Group, Text } from '@mantine/core';

import { ConfirmInterface } from '../../interface/ConfirmInterface';

interface ConfirmModalProps extends ConfirmInterface {
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	title,
	text,
	confirmButtonText,
	onClose,
	onConfirm,
}) => {
	return (
		<>
			<Modal
				opened={isOpen!}
				onClose={onClose}
				size='auto'
				title={title}
				overlayBlur={2}
				transition='fade'
				transitionDuration={500}
			>
				<Text>{text}</Text>

				<Group mt='xl' position='apart'>
					<Button variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Button variant='outline' color='red' onClick={onConfirm}>
						{confirmButtonText}
					</Button>
				</Group>
			</Modal>
		</>
	);
};

export default ConfirmModal;
