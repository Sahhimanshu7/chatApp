import { SearchIcon } from "@heroicons/react/solid";
import "../../assests/search.css";

export default function SearchUsers({ handleSearch }) {
  return (
    <div className="search">
      <SearchIcon className="search-icon" aria-hidden="true" />
      <input
        id="search"
        name="search"
        className="search-box"
        placeholder="Search"
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
