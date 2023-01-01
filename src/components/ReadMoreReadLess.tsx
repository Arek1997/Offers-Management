import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	ReactNode,
} from 'react';

import { Text } from '@mantine/core';

import { OfferInterface } from '../interface/OfferInterface';
import { OfferContext } from '../context/OfferContext';

const MAX_TEXT_HEIGHT = 110;

interface Props extends OfferInterface {
	children?: ReactNode;
	value: number;
	showAllTextHandler: () => void;
}

const ReadMoreReadLess: React.FC<Props> = (props) => {
	const [isTextTooHigh, setIsTextTooHigh] = useState(false);
	const textRef = useRef<string>();

	const offerCtx = useContext(OfferContext);

	useEffect(() => {
		if (props.text?.length !== textRef.current?.length) {
			const textContainer = document
				.getElementById(`${props.id}`)
				?.querySelector('.offer-text') as HTMLDivElement;

			const isTextContainerTooHeight =
				textContainer.scrollHeight > MAX_TEXT_HEIGHT;

			setIsTextTooHigh(isTextContainerTooHeight);
			textRef.current = props.text;
		}
	}, [offerCtx.offersArr]);

	return (
		<>
			<Text
				size='sm'
				color='dimmed'
				lineClamp={isTextTooHigh ? props.value : 0}
				className='offer-text break-words leading-[22px] text-slate-800'
				onClick={props.showAllTextHandler}
			>
				{props.text}
			</Text>
			{isTextTooHigh && (
				<Text
					className='mt-2 inline-block cursor-pointer text-base hover:underline'
					onClick={props.showAllTextHandler}
				>
					{props.value === 5 ? 'Show more' : 'Show less'}
				</Text>
			)}
		</>
	);
};

export default ReadMoreReadLess;
