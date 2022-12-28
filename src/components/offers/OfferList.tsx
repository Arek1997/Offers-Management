import React, { ReactNode, useContext } from 'react';

import OfferItem from './OfferItem';
import { OfferContext } from '../../context/OfferContext';
import { OfferInterface } from '../../interface/OfferInterface';

let content: OfferInterface[] | ReactNode;

const OfferList: React.FC = () => {
	const offerCtx = useContext(OfferContext);

	const filteredArr = offerCtx.filterOffers();

	if (filteredArr.length > 0) {
		content = filteredArr.map((offer) => (
			<OfferItem
				key={offer.id}
				id={offer.id}
				title={offer.title}
				text={offer.text}
			/>
		));
	} else {
		content = (
			<p className='text-slate-50 text-xl text-center grow'>No offers found</p>
		);
	}

	return (
		<section className='offers py-16'>
			<div className='container md:px-8 flex gap-8 flex-wrap justify-center sm:justify-start items-start'>
				{content}
			</div>
		</section>
	);
};

export default OfferList;
