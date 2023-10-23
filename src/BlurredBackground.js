import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlurredBackground({ path }) {
	const [imageURL, setImageURL] = useState('');

	useEffect(() => {
		setImageURL(`https://image.tmdb.org/t/p/w500/${path}.jpg`);
	}, [path]);

	const backgroundStyle = {
		backgroundImage: `url(${imageURL})`,
		filter: 'blur(10px)',
		// backgroundAttachment: 'fixed', // Set the background attachment to 'fixed'
	};

	return (
		<div
			className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
			style={backgroundStyle}
		>
			<div className="absolute inset-0 bg-black opacity-50" style={{filter: 'blue(0px)'}}></div>
			<div className="relative z-10 p-4 text-white">
				<h1 className="text-4xl font-semibold">Blurred Background</h1>
				<p className="text-xl mt-4">Your content here</p>
			</div>
		</div>
	);
}

export default BlurredBackground;
