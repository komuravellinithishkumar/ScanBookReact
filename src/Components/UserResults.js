import React from "react";
import Card from "./Cards";
import "./Cards.css";
import InfiniteScroll from "react-infinite-scroll-component";

function UserResults(props) {
  const { results } = props;
  // const [cards, setCards] = useState([]);

  return (
    <div>
      <h2>User Results</h2>
      <ul>
        <div className="card-list">
          {results.map((card, index) => (
            <Card key={index} data={card.book} />
          ))}
        </div>
      </ul>
    </div>
  );
}

export default UserResults;
