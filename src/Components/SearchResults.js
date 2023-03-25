import React from "react";
import Card from "./Cards";
import "./Cards.css";
import InfiniteScroll from "react-infinite-scroll-component";

function SearchResults(props) {
  const { results } = props;
  let isbn = String(results.isbn);

  return (
    <div>
      <h2>Search Results</h2>
      <div className="card-list">
        <Card key={results.isbn} data={results} />
      </div>
    </div>
  );
}

export default SearchResults;
