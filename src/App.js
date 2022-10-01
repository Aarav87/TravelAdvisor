import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { useLoadScript } from "@react-google-maps/api";

function App() {
    // Load api key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    // Display loading screen if api key has not loaded
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="app">
            <div className="places-list">
                <SearchBar />
            </div>
            <div className="map-container">
                <Map />
            </div>
        </div>
    );
}

export default App;
