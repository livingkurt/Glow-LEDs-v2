// import React, { useState } from 'react';

// const omit = (obj, omitKey) =>
// 	Object.keys(obj).reduce((result, key) => {
// 		if (key !== omitKey) {
// 			result[key] = obj[key];
// 		}
// 		return result;
// 	}, {});

// const overlayStyles = {
// 	position: 'absolute',
// 	filter: 'blur(1px)',
// 	transition: 'opacity ease-in 1000ms',
// 	clipPath: 'inset(0)'
// };

// const ProgressiveImage = () => {
// 	const [ highResImageLoaded, set_highResImageLoaded ] = useState(false);

// 	const overlaySrc = props.overlaySrc;
// 	// const { highResImageLoaded } = this.state;
// 	let filteredProps = omit(props, 'overlaySrc');

// 	return (
// 		<span>
// 			<img
// 				{...filteredProps}
// 				onLoad={() => {
// 					set_highResImageLoaded(true);
// 				}}
// 				ref={(img) => {
// 					highResImage = img;
// 				}}
// 				src={props.src}
// 			/>
// 			<img
// 				{...filteredProps}
// 				className={`${props.className} ${overlayStyles}`}
// 				{...highResImageLoaded && { style: { opacity: '0' } }}
// 				src={overlaySrc}
// 			/>
// 		</span>
// 	);
// };

// export default ProgressiveImage;

import React, { useState, useEffect } from 'react';

const ImageLoad = React.memo(({ src, placeholder, alt = '' }) => {
	const [ loading, setLoading ] = useState(true);
	const [ currentSrc, updateSrc ] = useState(placeholder);

	useEffect(
		() => {
			// start loading original image
			const imageToLoad = new Image();
			imageToLoad.src = src;
			imageToLoad.onload = () => {
				// When image is loaded replace the src and set loading to false
				setLoading(false);
				updateSrc(src);
			};
		},
		[ src ]
	);

	return (
		<img
			src={currentSrc}
			style={{
				opacity: loading ? 0.5 : 1,
				transition: 'opacity .15s linear',
				height: 300,
				width: 300
			}}
			alt={alt}
		/>
	);
});

export default ImageLoad;
