import React, { useState, useContext, useEffect } from "react";
import SearchResults from "./SearchResults";
import UserResults from "./UserResults";
import { API_URL } from "./Globals.js";
import Header from "./Header";
import { AuthContext } from "./Context";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const [ISBN, setISBN] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const storedName = ctx.email;
  console.log(storedName, ctx);

  function validateISBN(isbn) {
    if (isbn[0] != "9") {
      setErrorMessage("Starting Digit should be 9");
      return "Starting Digit should be 9";
    }

    if (!/^\d{13}$/.test(isbn)) {
      setErrorMessage("Please enter 13-digit ISBN");
      return "Please enter 13-digit ISBN";
    }

    var sum = 0;
    for (var i = 0; i < 12; i++) {
      var digit = parseInt(isbn.charAt(i));
      sum += i % 2 == 0 ? digit : digit * 3;
    }

    var checksum = (10 - (sum % 10)) % 10;
    console.log("CHECKSUM DIGIT", checksum);
    if (checksum == parseInt(isbn.charAt(12))) {
      return "TRUE";
    } else {
      setErrorMessage("Please enter a valid check-sum digit");
      return "Please enter a valid check-sum digit";
    }
  }

  useEffect(() => {
    if (storedName) {
      setEmail(storedName);
      let emailId = storedName;
      if (email != undefined && userResults.length == 0) {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        let URL = `${API_URL}/user/books/${storedName}`;
        fetch(URL, options)
          .then(function (response) {
            response.json().then(function (value) {
              if (value.status != 200) {
                alert("failure");
              } else {
                setUserResults(value.response);
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    let sendISBN = ISBN.replace(/-/g, "");
    let response = validateISBN(sendISBN);

    if (response == "TRUE") {
      try {
        setErrorMessage("");
        const response = await fetch(`${API_URL}/book/${sendISBN}`);
        const data = await response.json();
        if (data.response == null) {
          async function fetchFromGoogle(isbn) {
            let URL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

            let response = await fetch(URL);

            if (!response.ok) {
              throw response.error;
            }

            let data = await response.json();
            let sendData = {};

            sendData["title"] = data["items"][0]["volumeInfo"]["title"];
            sendData["author"] =
              data["items"][0]["volumeInfo"]["authors"].join(",");
            sendData["pages"] = data["items"][0]["volumeInfo"]["pageCount"];
            sendData["ISBN"] = isbn;

            return sendData;
          }

          async function addBookToDatabase(bookData) {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookData),
            };

            await fetch(`${API_URL}/book/add`, options);
          }

          let googleResponse = await fetchFromGoogle(sendISBN);

          await addBookToDatabase(googleResponse);

          navigate(`/viewBookDetails/${sendISBN}`);
        }
        setSearchResults(data.response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setISBN(e.target.value);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="home-container">
        <h1>Welcome to My App</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={ISBN}
            onChange={handleInputChange}
            placeholder="Search for something..."
          />
          <button type="submit">Search</button>
        </form>
        {/* {loading && <p>Loading...</p>} */}
        {errorMessage && <p className="b">Error: {errorMessage}</p>}

        {Object.keys(searchResults).length > 0 && (
          <SearchResults results={searchResults} />
        )}

        {ctx.isAuthenticated() && <UserResults results={userResults} />}
      </div>
    </div>
  );
}

export default Home;
