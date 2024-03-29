import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [query, setQuery] = useState({
    search: "",
    type: "all",
  });

  const [blogs, setBlogs] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();

  const filterData = async (newQuery) => {
    try {
      const response = await fetch("/api/blogs/filter?" + newQuery);
      const data = await response.json();

      console.log(data);

      if (data.success === false) {
        return;
      }
      setBlogs(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const type = params.get("type") || "all";

    const newQuery = params.toString();

    setQuery({ ...query, search, type });

    filterData(newQuery);
    setRefresh(false)
  }, [location.search, refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("search", query.search);
    params.set("type", query.type);

    const newQuery = params.toString();

    navigate(`/search?${newQuery}`);
  };

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
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
              value={query.search}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              value={query.type}
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
          <button className="bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-orange-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap max-md:items-center max-md:justify-center gap-4">
          {blogs &&
            blogs.map((blog) => (
              <ListingItem
                key={blog._id}
                blog={blog}
                setRefresh={setRefresh}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;