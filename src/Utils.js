import axios from "axios";

const fetchResults = async (query, year = -1) => {
    try {
        const extra = year != -1 ? '&primary_release_year=' + year : ''
        const url = `https://api.themoviedb.org/3/search/movie?api_key=42d0ee61c93ca4fd6e3a26cb1e371f65&query=${encodeURIComponent(query)}&include_adult=false&language=en-US${extra}`;
        console.log(url)

        const cache = await caches.open('v1');
        const cachedResponse = await cache.match(query);
        if (cachedResponse) {
            return await cachedResponse.json();
        }

        const response = await axios.get(url);

        let thing = JSON.stringify(response.data)

        caches.open('v1').then((cache) => {
            cache.put(query, new Response(thing));
        });
        return thing;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchResults;