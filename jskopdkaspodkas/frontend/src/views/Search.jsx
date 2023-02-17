import SearchInput from "../components/SearchInput";
import Navbar from "../components/Navbar";
import Selector from "../components/Selector";

function Search() {
  const prefs = ["Light", "Sleep", "Organization", "Friends"];
  return (
    <div className="">
      <Navbar />
      <div className=" flex flex-row">
        <div className="w-1/3 sm:w-1/5 mt-20 ">
          {/* <FilterList /> */}
          {prefs.map((pref) => {
            return <Selector name={pref} />;
          })}
        </div>
        <div className="w-3/4 sm:w-4/5">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
export default Search;
