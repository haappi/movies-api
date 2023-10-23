import './App.css';
import {useEffect, useState} from "react";
import fetchResults from "./Utils";

function App() {
    const [movieName, setMovieName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [releaseYear, setReleaseYear] = useState(''); // Change the initial state to an empty string
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        let timer;
        const fetchData = () => {
            fetchResults(searchTerm, releaseYear).then(r => {
                if (r.results != null) {
                    setSearchResults(r.results);
                } else {
                    setSearchResults([])
                }
            });
            console.log(`Querying API for: ${searchTerm}`);
        };

        if (searchTerm) {
            clearTimeout(timer);
            timer = setTimeout(fetchData, 1000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [releaseYear, searchTerm]);

    const handleInputChange = (e) => {
        setMovieName(e.target.value);
        setSearchTerm(e.target.value);
    };

    const handleReleaseYearChange = (e) => {
        setReleaseYear(e.target.value);
    };

    const handleDropdownChange = (e) => {
        const selectedId = e.target.value;
        setSelectedItem(selectedId);
        console.log(e.target.value);

        const selectedItemData = searchResults.find((item) => item.id == selectedId);
        setItemData(selectedItemData);
        console.log(selectedItemData);
    };

    return (
        <div className="App">
            <form>
                <p>Movie Name: </p>
                <input value={movieName} onChange={handleInputChange}/>
                <p>Release Year (Optional)</p>
                <input value={releaseYear} onChange={handleReleaseYearChange}/> {/* Add onChange handler */}
            </form>
            <br/>

            <select onChange={handleDropdownChange}>
                <option value="">Select an item</option>
                {searchResults.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>

            {selectedItem && (
                <div>
                    <h3>Title: {itemData.title}</h3>
                    <h4>Description</h4>
                    <p>{itemData.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${itemData.poster_path}`} alt={itemData.title}/>
                    <h4>Release</h4>
                    <p>{itemData.release_date}</p>
                </div>
            )}
        </div>
    );
}

export default App;
