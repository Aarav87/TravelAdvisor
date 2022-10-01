import { InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";

function SearchBar() {
    return (
        <Paper className="search-bar">
            <InputBase className="input-box"
                       placeholder="Search Travel App"
                       inputProps={{ 'aria-label': 'search travel app' }}
            />
            <SearchIcon className="search-icon"/>
        </Paper>
    );
}

export default SearchBar;