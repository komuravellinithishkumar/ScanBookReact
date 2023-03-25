import React from "react";
import { CLIENT_URL } from "./Globals";
import "./Cards.css";

function Card(props) {
  const { bookAuthor, bookTitle, isbn } = props.data;
  let URL = `${CLIENT_URL}/viewBookDetails/${isbn}`;

  return (
    <div className="card">
      <div>
        <span>
          <b>Title</b>: {bookTitle}
        </span>
      </div>
      <div>
        <span>
          <b>Author</b>: {bookAuthor}
        </span>
      </div>
      <div>
        <span>
          <b>ISBN</b>: {isbn}
        </span>
      </div>
      <h2>
        <a className="b" href={URL}>
          View Details
        </a>
      </h2>
    </div>
  );
}

export default Card;
