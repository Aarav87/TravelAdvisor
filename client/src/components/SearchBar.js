import { InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react";

const SearchBar = ({ setCoordinates, onBoundsChanged }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
        onBoundsChanged();

    }

    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Paper className="search-bar">
                <InputBase className="input-box"
                           placeholder="Search Travel App"
                           inputProps={{ 'aria-label': 'search travel app' }}
                />
                <SearchIcon className="search-icon"/>
            </Paper>
        </Autocomplete>
    );
}

export default SearchBar;