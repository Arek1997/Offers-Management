import { useContext } from 'react';

import TopBar from './components/TopBar';
import OfferList from './components/offers/OfferList';
import ModalForm from './components/modal/ModalForm';

import { ModalContext } from './context/ModalContext';

const App: React.FC = () => {
	const modalCtx = useContext(ModalContext);

	return (
		<main className='min-h-screen px-3 md:px-0 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-indigo-900'>
			<TopBar />
			{modalCtx.opened && <ModalForm />}
			<OfferList />
		</main>
	);
};

export default App;
