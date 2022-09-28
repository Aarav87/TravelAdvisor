import GoogleMapReact from "google-map-react";
import useStyles from "./styles.js"

const Map = () => {
    // Call useStyles hook
    const styles = useStyles()
    const coordinates = { lat: 0, lng: 0 };

    return (
        <div className={styles.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
            >
            </GoogleMapReact>
        </div>
    );
}

export default Map