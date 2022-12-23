import { useContext, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Modal, Button, TextInput, Textarea } from '@mantine/core';

import { ModalContext } from '../../context/ModalContext';
import { OfferContext } from '../../context/OfferContext';
import { OfferInterface } from '../../interface/OfferInterface';

const ModalForm: React.FC = () => {
	const modalCtx = useContext(ModalContext);
	const offerCtx = useContext(OfferContext);

	const form = useForm({
		initialValues: { title: '', text: '' },

		validate: {
			title: (value) =>
				value.length < 2 ? 'Title must have at least 2 letters' : null,

			text: (value) =>
				value.length < 2 ? 'Message must have at least 10 letters' : null,
		},
	});

	useEffect(() => {
		form.clearErrors();
		form.reset();
	}, [modalCtx.opened]);

	const onSubmitHandler = (offer: OfferInterface) => {
		offerCtx.addOffer(offer);
		form.reset();
	};

	return (
		<>
			<Modal
				size='lg'
				opened={modalCtx.opened}
				onClose={modalCtx.toggleModal}
				title='Add your new offer'
				overlayBlur={2}
				transition='fade'
				transitionDuration={500}
			>
				<div className='form-container'>
					<form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
						<TextInput
							label='Offer title'
							placeholder='Enter offer title'
							className='mb-5'
							{...form.getInputProps('title')}
						/>

						<Textarea
							placeholder='Enter offer message'
							label='Offer message'
							autosize
							minRows={2}
							className='mb-5'
							{...form.getInputProps('text')}
						/>

						<Button type='submit' className='block ml-auto bg-indigo-400'>
							Add
						</Button>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default ModalForm;
