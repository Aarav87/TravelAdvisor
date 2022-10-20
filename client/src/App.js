import { useEffect, useMemo, useState } from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import PlaceInfo from "./components/PlaceInfo";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import {CircularProgress} from "@mui/material";

const App = () => {
    const libs = useMemo(() => (["places"]), []);
    const [mapRef, setMapRef] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({});
    const [places, setPlaces] = useState([]);
    const [type, setType] = useState("attractions");
    const [rating, setRating] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        axios
            .post(process.env.REACT_APP_SERVER_URL, {
                bounds,
                type
            })
            .then((data) => {
                setPlaces(data["data"].filter((place) => place.name && place.num_reviews > 0));
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [bounds, type]);

    // Update bounds
    const handleOnBoundsChanged = () => {
        if (!mapRef) return;
        const bounds = mapRef.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        setBounds({ ne: [northEast.lat(), northEast.lng()],  sw: [southWest.lat(), southWest.lng()] });
    };

    // Loading progress
    const loading = () => {
        return (
            <div className="loading">
                <CircularProgress size="3rem" />
            </div>
        )
    }

    // Display loading screen if api key has not loaded
    if (!isLoaded) return loading()

    return (
        <div className="app">
            <div className="header">
                <SearchBar
                    setCoordinates={setCoordinates}
                />
                <Filter
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
                <div className="places-list">
                    {isLoading ? loading() : (
                        <>
                            {places?.map((place, i) => (
                                <PlaceInfo key={i} place={place}/>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="map-container">
                <Map
                    setMapRef={setMapRef}
                    coordinates={coordinates}
                    onBoundsChanged={handleOnBoundsChanged}
                    places={places}
                />
            </div>
        </div>
    );
}

export default App;
