import { useContext, useEffect } from 'react';

import { useForm } from '@mantine/form';
import { Modal, Group, Button, TextInput, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { OfferContext } from '../../context/OfferContext';
import { OfferInterface } from '../../interface/OfferInterface';

interface Props {
	isOpen: boolean;
	edit?: boolean;
	editItemId?: string;
	title?: string;
	text?: string;
	onClose: () => void;
}

const ModalForm = ({
	isOpen,
	edit,
	editItemId,
	title,
	text,
	onClose,
}: Props) => {
	const offerCtx = useContext(OfferContext);

	const initialValues = {
		title: title ? title : '',
		text: text ? text : '',
	};

	const form = useForm({
		initialValues: { ...initialValues },

		validate: {
			title: (value) =>
				value!.length < 2 ? 'Title must have at least 2 letters' : null,

			text: (value) =>
				value!.length < 10 ? 'Message must have at least 10 letters' : null,
		},
	});

	useEffect(() => {
		form.clearErrors();
		form.reset();
	}, [isOpen]);

	const onSubmitHandler = (offer: OfferInterface) => {
		if (edit) {
			offerCtx.editOffer(editItemId!, offer);
			showNotification({
				title: 'Edited',
				message: 'Your offer has been successfully edited!',
			});
		} else {
			offerCtx.addOffer(offer);
			showNotification({
				title: 'Added',
				message: 'New offer has been successfully added!',
			});
		}

		onClose();
	};

	return (
		<>
			<Modal
				size='lg'
				opened={isOpen}
				onClose={onClose}
				title={edit ? 'Edit your offer' : 'Add your new offer'}
				overlayBlur={2}
				transition='fade'
				transitionDuration={500}
			>
				<div className='form-container'>
					<form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
						<TextInput
							label='Offer title'
							placeholder={edit ? 'Edit offer title' : 'Enter offer title'}
							className='mb-5'
							{...form.getInputProps('title')}
						/>

						<Textarea
							label='Offer message'
							placeholder={edit ? 'Edit offer message' : 'Enter offer message'}
							autosize
							minRows={2}
							className='mb-5'
							{...form.getInputProps('text')}
						/>

						<Group position='right'>
							<Button
								type='button'
								variant='outline'
								color='gray'
								onClick={onClose}
							>
								Cancel
							</Button>

							<Button type='submit' variant='outline'>
								{edit ? 'Apply changes' : 'Add'}
							</Button>
						</Group>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default ModalForm;
