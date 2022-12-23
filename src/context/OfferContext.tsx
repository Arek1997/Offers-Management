import { useState, createContext } from 'react';

import { OfferInterface } from '../interface/OfferInterface';

const defaultValue = {
	offersArr: [
		{
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},

		{
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},

		{
			title: 'Oferta do formy xyz',
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tenetur sint possimus soluta nihil nisi iste esse ipsam, similique, repudiandae qui distinctio dolor quam porro, minus rerum facilis voluptas architecto.',
		},
	] as OfferInterface[],

	addOffer: (newOffer: OfferInterface) => {},
};

export const OfferContext = createContext(defaultValue);

interface OfferContextProviderProps {
	children: React.ReactNode;
}

const OfferContextProvider: React.FC<OfferContextProviderProps> = (props) => {
	const [offersArr, setOfferArr] = useState(defaultValue.offersArr);

	const addOfferHandler = (newOffer: OfferInterface) => {
		setOfferArr((prevState) => [...prevState, newOffer]);
	};

	const providerValue = {
		offersArr,
		addOffer: addOfferHandler,
	};

	return (
		<OfferContext.Provider value={providerValue}>
			{props.children}
		</OfferContext.Provider>
	);
};

export default OfferContextProvider;
