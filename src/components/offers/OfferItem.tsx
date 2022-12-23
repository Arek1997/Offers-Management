import React from 'react';

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

import { IconCopy, IconCheck, IconSettings, IconTrash } from '@tabler/icons';

interface OfferListProps {
	title: string;
	text: string;
}

const OfferItem: React.FC<OfferListProps> = (props) => {
	return (
		<Card
			shadow='sm'
			p='lg'
			radius='md'
			withBorder
			className='max-w-[320px] overflow-auto bg-transparent dark:bg-indigo-200 border-transparent  dark:border-indigo-200'
		>
			<Group position='right' className='mb-3'>
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<Button className='bg-indigo-500'>Options</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>

						<Menu.Divider />

						<Menu.Item color='red' icon={<IconTrash size={14} />}>
							Delete offer
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>

				<CopyButton value={props.text} timeout={2000}>
					{({ copied, copy }) => (
						<Tooltip
							label={copied ? 'Copied' : 'Copy'}
							withArrow
							position='right'
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

			<Text size='sm' color='dimmed' lineClamp={5} className='text-slate-800'>
				{props.text}
			</Text>
		</Card>
	);
};

export default OfferItem;
