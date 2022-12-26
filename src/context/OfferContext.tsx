import { useState, createContext } from 'react';

import { useLocalStorage } from '@mantine/hooks';

import { OfferInterface } from '../interface/OfferInterface';

const defaultValue: defaultValueInterface = {
	offersArr: [
		{
			id: 'offer-1',
			title: 'Demo offer 1',
			text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, similique numquam molestias velit tenetur quisquam tempore maxime eveniet quos neque!',
		},

		{
			id: 'offer-2',
			title: 'Demo offer 2',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},

		{
			id: 'offer-3',
			title: 'Demo offer 3',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam asperiores explicabo illum quae, numquam aut sed obcaecati quibusdam neque consequuntur soluta aliquam provident eius officiis fuga aperiam repellat reiciendis earum vel pariatur adipisci at accusantium incidunt! Quisquam tempora sunt optio autem. Dolore quae voluptatum pariatur voluptatibus ducimus dolores nostrum cupiditate exercitationem rem minima commodi hic maiores atque, amet, autem odio!',
		},
	],

	addOffer: (newOffer: OfferInterface) => {},
	editOffer: (id: string, data: OfferInterface) => {},
	deleteOffer: (id: string) => {},
	filterOffers: (dataToFilter: OfferInterface[]) => [],
	filterValue: '',
	setFilterValue: (value: string) => {},
};

export const OfferContext = createContext(defaultValue);

interface defaultValueInterface {
	offersArr: OfferInterface[];
	addOffer: (newOffer: OfferInterface) => void;
	editOffer: (id: string, data: OfferInterface) => void;
	deleteOffer: (id: string) => void;
	filterOffers: (dataToFilter: OfferInterface[]) => OfferInterface[];
	filterValue: string;
	setFilterValue: (value: string) => void;
}

interface OfferContextProviderProps {
	children: React.ReactNode;
}

const OfferContextProvider: React.FC<OfferContextProviderProps> = (props) => {
	const [offersArr, setOffersArr] = useLocalStorage({
		key: 'offers',
		defaultValue: defaultValue.offersArr,
	});
	const [filterValue, setFilterValue] = useState(defaultValue.filterValue);

	const setFilterValueHandler = (value: string) => setFilterValue(value);

	const addOfferHandler = (newOffer: OfferInterface) => {
		const newOfferWithId = {
			id: crypto.randomUUID(),
			...newOffer,
		};

		setOffersArr((prevState) => [...prevState, newOfferWithId]);
	};

	const editOfferHandler = (id: string, data: OfferInterface) => {
		const newState = [...offersArr];
		const offerToEdit = newState.find((offer) => offer.id === id);

		offerToEdit!.title = data.title;
		offerToEdit!.text = data.text;

		setOffersArr(newState);
	};

	const deleteOfferHandler = (id: string) => {
		const updatedState = offersArr.filter((offer) => offer.id !== id);
		setOffersArr(updatedState);
	};

	const filterOffersHandler = (dataToFilter: OfferInterface[]) =>
		dataToFilter.filter((data) =>
			data.title?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
		);

	const providerValue = {
		offersArr,
		addOffer: addOfferHandler,
		editOffer: editOfferHandler,
		deleteOffer: deleteOfferHandler,
		filterOffers: filterOffersHandler,
		filterValue,
		setFilterValue: setFilterValueHandler,
	};

	return (
		<OfferContext.Provider value={providerValue}>
			{props.children}
		</OfferContext.Provider>
	);
};

export default OfferContextProvider;
