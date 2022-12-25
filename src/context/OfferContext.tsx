import { useState, createContext } from 'react';

import { OfferInterface } from '../interface/OfferInterface';

const defaultValue = {
	offersArr: [
		{
			id: 'offer-1',
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},

		{
			id: 'offer-2',
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},

		{
			id: 'offer-3',
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},
	] as OfferInterface[],

	addOffer: (newOffer: OfferInterface) => {},
	editOffer: (id: string, data: OfferInterface) => {},
};

export const OfferContext = createContext(defaultValue);

interface OfferContextProviderProps {
	children: React.ReactNode;
}

const OfferContextProvider: React.FC<OfferContextProviderProps> = (props) => {
	const [offersArr, setOffersArr] = useState(defaultValue.offersArr);

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

	const providerValue = {
		offersArr,
		addOffer: addOfferHandler,
		editOffer: editOfferHandler,
	};

	return (
		<OfferContext.Provider value={providerValue}>
			{props.children}
		</OfferContext.Provider>
	);
};

export default OfferContextProvider;
