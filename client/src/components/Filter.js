import { FormControl, MenuItem, Select } from "@mui/material";

const Filter = ({ filter, setFilter }) => {
    return (
        <FormControl className="filter">
            <Select
                className="choices"
                value={filter}
                onChange={(event) => {
                    setFilter(event.target.value)
                }}
            >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Filter;