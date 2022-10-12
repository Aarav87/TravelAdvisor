import {useEffect, useMemo, useState} from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import { useLoadScript } from "@react-google-maps/api";

const App = () => {
    const libs = useMemo(() => (["places"]), []);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

    // Load api key
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libs
    });

    // Get coordinates of user for centering map
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords}) => {
            setCoordinates({ lat: coords["latitude"], lng: coords["longitude"] })
        })
    }, []);

    // Display loading screen if api key has not loaded
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="app">
            <div className="places-list">
                <SearchBar setCoordinates={setCoordinates}/>
            </div>
            <div className="map-container">
                <Map coordinates={coordinates}/>
            </div>
        </div>
    );
}

export default App;
