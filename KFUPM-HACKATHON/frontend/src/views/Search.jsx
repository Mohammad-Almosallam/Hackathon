import SearchInput from "../components/SearchInput";
import Navbar from "../components/Navbar";
import Selector from "../components/Selector";
import { getAllUsers } from "../auth/authService";
import { getAllPreferences } from "../auth/packageService";
import { useState, useEffect } from "react";

function Search() {
  const prefs = ["Light", "Sleep", "Organization", "Friends"];
  const [allUsers, setUser] = useState([]);
  const [allPreferences, setallPreferences] = useState([]);

  useEffect(() => {
    render();
  }, []);
  // console.log(allUsers);
  // console.log(allPreferences);
  async function render() {
    const users = await getAllUsers();
    const prefs = await getAllPreferences();

    setUser(users);
    setallPreferences(prefs);
  }
  function getUsersPreferences(userId) {
    return allPreferences.filter((eachPref) => eachPref.user === userId);
  }

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
          {allUsers.map((user) => {
            console.log(user);
            const userId = user._id;
            const pref = getUsersPreferences(userId)[0];
            console.log(pref);
            return (
              <ul>
                <li>{user.name}</li>
                <li>{user.phoneNumber}</li>
                <li>
                  {pref != undefined &&
                    pref.hasOwnProperty("light") &&
                    pref.light}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Search;
