import GoogleMap from "google-map-react";
import useStyles from "./styles.js"

const Map = () => {
    const coordinates = { lat: 0, lng: 0 };
    const { classes } = useStyles();
    // Map options
    const options = {
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "14b7d8385338d844"
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMap
                options={options}
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
            >
            </GoogleMap>
        </div>
    );
}

export default Map