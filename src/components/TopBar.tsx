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
		<div className='container flex flex-col justify-between pt-6 sm:flex-row md:px-8 2xl:pt-10'>
			<div className='search-input mb-4 grow sm:mb-0 sm:max-w-[300px]'>
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
					className='border-2 border-slate-200 bg-slate-200 text-slate-800 hover:border-slate-100 hover:bg-slate-100 dark:border-indigo-500 dark:bg-indigo-500 dark:text-slate-100 dark:hover:border-indigo-600 dark:hover:bg-indigo-600'
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
