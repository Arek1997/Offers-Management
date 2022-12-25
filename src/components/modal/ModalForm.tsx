import { useContext, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Modal, Button, TextInput, Textarea } from '@mantine/core';

import { ModalContext } from '../../context/ModalContext';
import { OfferContext } from '../../context/OfferContext';
import { OfferInterface } from '../../interface/OfferInterface';

const ModalForm: React.FC = () => {
	const modalCtx = useContext(ModalContext);
	const offerCtx = useContext(OfferContext);

	const initialValues = {
		title: modalCtx.edit ? modalCtx.editableItem.title : '',
		text: modalCtx.edit ? modalCtx.editableItem.text : '',
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
	}, [modalCtx.opened]);

	const onSubmitHandler = (offer: OfferInterface) => {
		if (modalCtx.edit) {
			offerCtx.editOffer(modalCtx.editableItem.id!, offer);
		} else {
			offerCtx.addOffer(offer);
		}

		form.reset();
		modalCtx.toggleModal(false);
	};

	return (
		<>
			<Modal
				size='lg'
				opened={modalCtx.opened}
				onClose={modalCtx.toggleModal.bind(null, false)}
				title={modalCtx.edit ? 'Edit your offer' : 'Add your new offer'}
				overlayBlur={2}
				transition='fade'
				transitionDuration={500}
			>
				<div className='form-container'>
					<form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
						<TextInput
							label='Offer title'
							placeholder={
								modalCtx.edit ? 'Edit offer title' : 'Enter offer title'
							}
							className='mb-5'
							{...form.getInputProps('title')}
						/>

						<Textarea
							label='Offer message'
							placeholder={
								modalCtx.edit ? 'Edit offer message' : 'Enter offer message'
							}
							autosize
							minRows={2}
							className='mb-5'
							{...form.getInputProps('text')}
						/>

						<Button type='submit' className='block ml-auto bg-indigo-400'>
							{modalCtx.edit ? 'Apply changes' : 'Add'}
						</Button>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default ModalForm;
