import { useState, useEffect } from "react";

import SVG from "react-inlinesvg";
import icoSearch from "../assets/icons/ico-search.svg";

function Search(props) {
  const { searchValue, cb = Function.prototype } = props;
  const [value, setValue] = useState(searchValue);

  // Function to handle pressing the Enter key in the search input
  const handleKey = (e) => {
    if (e.key === "Enter" && value.trim()) {
      handleSubmit();
    }
  };

  // Function to trigger search action
  const handleSubmit = () => {
    if (value.trim()) {
      cb(value);
    }
  };

  // Effect to update the input value whenever `searchValue` prop changes
  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  return (
    <div className="search">
      <input
        type="search"
        id="search__field"
        className="search__field"
        placeholder="Seach by category"
        onKeyDown={handleKey}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button className="search__btn" onClick={handleSubmit}>
        <SVG src={icoSearch} />
      </button>
    </div>
  );
}

export { Search };
