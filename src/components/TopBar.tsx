import React, { useEffect, useContext } from 'react';
import {
	TextInput,
	Button,
	Switch,
	Group,
	useMantineTheme,
} from '@mantine/core';
import { useLocalStorage, useDebouncedState } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons';

import { OfferContext } from '../context/OfferContext';

import { useModal } from '../context/ModalContext';

const TopBar: React.FC = () => {
	const [darkMode, setDarkMode] = useLocalStorage({
		key: 'dark-mode',
		defaultValue: 'dark',
	});
	const offerCtx = useContext(OfferContext);

	const [value, setValue] = useDebouncedState('', 200);

	const theme = useMantineTheme();

	const showModal = useModal();

	const openModalHandler = () => showModal();

	useEffect(() => {
		if (darkMode === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	const filterOffersHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
		setValue(e.currentTarget.value);

	useEffect(() => {
		offerCtx.setFilterValue(value);
	}, [value]);

	return (
		<div className='container md:px-8 pt-6 2xl:pt-10 flex flex-col sm:flex-row justify-between'>
			<div className='search-input mb-4 sm:mb-0 grow sm:max-w-[300px]'>
				<TextInput
					type='search'
					placeholder='Enter search offer'
					onChange={filterOffersHandler}
				/>
			</div>
			<div className='action-buttons flex gap-5'>
				<Button
					color='indigo'
					uppercase
					className='bg-indigo-500'
					onClick={openModalHandler}
				>
					Add new offer
				</Button>
				<Group position='center'>
					<Switch
						size='md'
						color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
						onLabel={
							<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />
						}
						offLabel={
							<IconMoon size={16} stroke={2.5} color={theme.colors.blue[6]} />
						}
						onClick={() =>
							setDarkMode((current) => (current === 'dark' ? 'light' : 'dark'))
						}
					/>
				</Group>
			</div>
		</div>
	);
};

export default TopBar;
