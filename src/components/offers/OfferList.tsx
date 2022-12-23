import React, { useContext } from 'react';

import OfferItem from './OfferItem';
import { OfferContext } from '../../context/OfferContext';

const OfferList: React.FC = (props) => {
	const offerCtx = useContext(OfferContext);

	return (
		<section className='offers py-16'>
			<div className='container md:px-8 flex gap-8 flex-wrap justify-center sm:justify-start items-center'>
				{offerCtx.offersArr.map((offer, i) => (
					<OfferItem
						title={offer.title}
						text={offer.text}
						key={offer.title + `-${i}`}
					/>
				))}
			</div>
		</section>
	);
};

export default OfferList;
