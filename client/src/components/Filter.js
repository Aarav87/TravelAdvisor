import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Filter = ({ type, setType }) => {
    return (
        <div className="filter-container">
            <FormControl className="type-filter">
                <InputLabel id="type">Type</InputLabel>
                <Select
                    className="choices"
                    value={type}
                    onChange={(event) => {
                        setType(event.target.value)
                    }}
                >
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Filter;