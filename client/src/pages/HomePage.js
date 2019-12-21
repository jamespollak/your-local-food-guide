import React, { useState } from "react";
import chefLogo from "../images/chef.png";

export default function({ history, ...props }) {
  const [query, setQuery] = useState("");

  const onSubmitHandler = e => {
    e.preventDefault();
    if (query) history.push(`/city/${query}`);
  };
  console.log(props);
  return (
    <div className="search">
      <form onSubmit={onSubmitHandler}>
        <img src={chefLogo} />
        <h2 className="title">YOUR GLOBAL LOCAL FOOD GUIDE</h2>
        <input
          type="text"
          placeholder="Search a city"
          name="city"
          onChange={e => setQuery(e.target.value)}
        ></input>
        <button type="submit">GO</button>
        <p>
          Want to <a href="/signup">Signup?</a>
        </p>
      </form>
    </div>
  );
}
