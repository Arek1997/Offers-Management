import React, { useContext } from 'react';

import {
	Card,
	Text,
	Group,
	CopyButton,
	ActionIcon,
	Tooltip,
	Menu,
	Button,
} from '@mantine/core';

import { useToggle } from '@mantine/hooks';

import { showNotification } from '@mantine/notifications';

import { IconCopy, IconCheck, IconSettings, IconTrash } from '@tabler/icons';

import { OfferInterface } from '../../interface/OfferInterface';

import { OfferContext } from '../../context/OfferContext';
import { useConfirmModal } from '../../context/ConfirmContext';

import { useModal } from '../../context/ModalContext';

const OfferItem: React.FC<OfferInterface> = (props) => {
	const offerCtx = useContext(OfferContext);
	const showModal = useModal();

	const handleShow = useConfirmModal();

	const [value, toggle] = useToggle([5, 0] as const);

	const showAllTextHandler = () => toggle();

	const editOfferHandler = () =>
		showModal({
			title: props.title,
			text: props.text,
			edit: true,
			editItemId: props.id,
		});

	const deleteOfferHandler = async () => {
		const choice = await handleShow({
			title: 'Delete offer',
			text: 'Are you sure you want to delete this offer?',
			confirmButtonText: 'Delete',
		});

		if (choice) {
			offerCtx.deleteOffer(props.id!);
			showNotification({
				title: 'Deleted',
				message: 'Your offer has been successfully deleted!',
				color: 'red',
			});
		}
	};

	return (
		<Card
			shadow='sm'
			p='lg'
			radius='md'
			withBorder
			id={props.id}
			className='min-w-full min-h-[235px] sm:min-w-[auto] sm:w-[320px] overflow-auto bg-transparent dark:bg-indigo-200 border-transparent  dark:border-indigo-200'
		>
			<Group position='right' className='mb-3'>
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<Button className='bg-indigo-500'>Options</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item
							icon={<IconSettings size={14} />}
							onClick={editOfferHandler}
						>
							Edit
						</Menu.Item>

						<Menu.Divider />

						<Menu.Item
							color='red'
							icon={<IconTrash size={14} />}
							onClick={deleteOfferHandler}
						>
							Delete offer
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>

				<CopyButton value={props.text!} timeout={2000}>
					{({ copied, copy }) => (
						<Tooltip
							label={copied ? 'Text copied' : 'Copy text'}
							withArrow
							position='bottom'
						>
							<ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
								{copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</Group>
			<Text weight={500} className='mb-3'>
				{props.title}
			</Text>

			<Text
				size='sm'
				color='dimmed'
				lineClamp={value}
				className='text-slate-800 cursor-pointer break-words'
				onClick={showAllTextHandler}
			>
				{props.text}
			</Text>
		</Card>
	);
};

export default OfferItem;
