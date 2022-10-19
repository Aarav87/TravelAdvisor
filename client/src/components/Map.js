import { GoogleMap, InfoBox } from "@react-google-maps/api";
import { useMemo } from "react";
import { Paper, Typography, Rating } from "@mui/material";

const Map = ({ coordinates, onCenterChanged, onBoundsChanged, setMapRef, places }) => {
    // Map options and theme
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }), []);

    // Set map reference
    const handleOnLoad = (map) => {
        setMapRef(map);
    };

    return (
        <GoogleMap
            zoom={10}
            center={coordinates}
            options={options}
            mapContainerClassName="map"
            onLoad={(map) => {handleOnLoad(map)}}
            onBoundsChanged={onBoundsChanged}
        >
            {places?.map((place, i) => (
                <InfoBox
                    className="marker-container"
                    position={{ lat: place.latitude, lng: place.longitude }}
                    key={i}
                >
                    <Paper elevation={3} className="place-preview">
                        <Typography className="name" variant="subtitle2" gutterBottom>
                            {place.name}
                        </Typography>
                        <img
                            className="image"
                            src={place.photo ? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
                            alt={place.name}
                        />
                        <Rating size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                </InfoBox>
            ))}
        </GoogleMap>
    );
}

export default Map;