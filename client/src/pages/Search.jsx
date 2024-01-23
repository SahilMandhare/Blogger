import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [query, setQuery] = useState({
    search: "",
    type: "all",
  });

  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const type = params.get("type");

    console.log(search);

    setQuery({ ...query, search, type });
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("search", query.search);
    params.set("type", query.type);

    const newQuery = params.toString()

    navigate(`/search?${newQuery}`)
  };
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.id]: e.target.value });
  };

  console.log(query);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              defaultValue={query.search}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={query.type}
              id="type"
              className="border rounded-lg p-3"
            >
              <option value="all">All</option>
              <option value="travel">Travel</option>
              <option value="business">Business</option>
              <option value="lifestyle">LifeStyle</option>
              <option value="food">Food</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {/* {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )} */}

          {/* {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))} */}

          {/* {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Search;
