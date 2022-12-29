import TopBar from './components/TopBar';
import OfferList from './components/offers/OfferList';

const App: React.FC = () => {
	return (
		<main className='min-h-screen bg-slate-300 px-3 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-indigo-900 md:px-0'>
			<TopBar />
			<OfferList />
		</main>
	);
};

export default App;
