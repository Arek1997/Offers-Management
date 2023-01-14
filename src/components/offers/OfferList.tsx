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
			<p className='grow text-center text-xl font-semibold  text-stone-700 dark:text-slate-50'>
				No offers found
			</p>
		);
	}

	return (
		<section className='offers py-16'>
			<div className='animate container flex flex-wrap items-start justify-center gap-8 sm:justify-start md:px-8'>
				{content}
			</div>
		</section>
	);
};

export default OfferList;
