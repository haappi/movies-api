import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query) {
				if (query.length < 3) return;
				fetchResults(encodeURIComponent(query));
			}
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [query]);

	const fetchResults = async (queryy) => {
		setLoading(true);
		try {
			const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=42d0ee61c93ca4fd6e3a26cb1e371f65&query=${queryy}&include_adult=false&language=en-US&page=1`);
			setResults(response.data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	const dropdownEntries = Array.isArray(results.results) ? results.results.slice(0, 6) : [];

	// Handle redirection without reloading
	const handleRedirect = (url) => {
		window.location.href = url;
	};

	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-64 px-4 py-2 rounded-full border outline-none"
			/>
			{loading && <div className="absolute top-12 left-0 right-0 bg-white p-2">Loading...</div>}
			{results.results && results.results.length > 0 && (
				<ul className="absolute top-12 w-64 bg-white border border-gray-300 z-10">
					{results.results.map((result) => (
						<li
							key={result.id}
							className="p-2 border-b border-gray-300 cursor-pointer"
							onClick={() => handleRedirect(`https://example.com/${result.id}`)}
						>
							{result.title}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default SearchBar;
