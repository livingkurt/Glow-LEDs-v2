import React, { useState, useEffect, useCallback } from 'react';
import { PrevButton, NextButton } from './EmblaCarouselButtons';
import { useEmblaCarousel } from 'embla-carousel/react';
// import { mediaByIndex } from '../media';
// import '../css/embla.css';

const EmblaCarousel = ({ children }) => {
	const [ EmblaCarouselReact, embla ] = useEmblaCarousel({ loop: true });
	const [ prevBtnEnabled, setPrevBtnEnabled ] = useState(false);
	const [ nextBtnEnabled, setNextBtnEnabled ] = useState(false);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [ embla ]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [ embla ]);
	const onSelect = useCallback(
		() => {
			if (!embla) return;
			setPrevBtnEnabled(embla.canScrollPrev());
			setNextBtnEnabled(embla.canScrollNext());
		},
		[ embla ]
	);

	useEffect(
		() => {
			if (!embla) return;
			embla.on('select', onSelect);
			onSelect();
		},
		[ embla, onSelect ]
	);

	return (
		<div className="embla">
			<EmblaCarouselReact className="embla__viewport">
				<div className="embla__container">{children}</div>
			</EmblaCarouselReact>
			<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
			<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
		</div>
	);
};

export default EmblaCarousel;
