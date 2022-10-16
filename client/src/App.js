import { useEffect, useMemo, useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const App = () => {
    const libs = useMemo(() => (["places"]), []);
    const [mapRef, setMapRef] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState(null);
    const [places, setPlaces] = useState([]);
    const [type, setType] = useState("attractions");
    const [rating, setRating] = useState("");

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

    // Send bounds to server and retrieve places data
    useEffect(() => {
        if (!bounds) return;
        axios
            .post(process.env.REACT_APP_SERVER_URL, {
                bounds,
                type
            })
            .then((data) => {
                setPlaces(data["data"].filter((place) => place.name && place.num_reviews > 0));
            })
            .catch(err => {
                console.log(err)
            })
    }, [bounds, type]);

    // Update center coordinates
    const handleOnCenterChanged = () => {
        if (!mapRef) return;
        const center = mapRef.getCenter();
        setCoordinates({ lat: center.lat(), lng: center.lng() });
    };

    // Update bounds
    const handleOnBoundsChanged = () => {
        if (!mapRef) return;
        const bounds = mapRef.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        setBounds({ ne: [northEast.lat(), northEast.lng()],  sw: [southWest.lat(), southWest.lng()] });
    };

    // Display loading screen if api key has not loaded
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="app">
            <div className="header">
                <SearchBar
                    setCoordinates={setCoordinates}
                    onBoundsChanged={handleOnBoundsChanged}
                />
                <Filter
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </div>
            <div className="map-container">
                <Map
                    setMapRef={setMapRef}
                    coordinates={coordinates}
                    onCenterChanged={handleOnCenterChanged}
                    onBoundsChanged={handleOnBoundsChanged}
                />
            </div>
        </div>
    );
}

export default App;
