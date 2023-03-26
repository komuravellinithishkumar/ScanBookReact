import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "./Globals";
import "./BookDetails.css";
import Header from "./Header";
import { AuthContext } from "./Context";

function BookDetailsPage() {
  const [bookDetails, setBookDetails] = useState(null);
  const [notes, setNotes] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const ctx = useContext(AuthContext);
  let { isbn } = useParams();

  let email = ctx.email;
  useEffect(() => {
    fetchBookDetails(isbn);
  }, []);

  const fetchBookDetails = async (isbn) => {
    try {
      let response;
      if (email == "" || email == undefined) {
        response = await fetch(`${API_URL}/book/${isbn}`);
      } else {
        let url = (response = await fetch(
          `${API_URL}/user/book/${isbn}/${email}`
        ));
      }

      const bookDetailsData = await response.json();
      setBookDetails(bookDetailsData);
      setNotes(bookDetailsData.BookNotes);
      setIsChecked(bookDetailsData.BookFinished);
    } catch (error) {
      console.log(error);
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }
  function toggleCheckbox() {
    let c = isChecked;

    if (c) {
      c = false;
    } else {
      c = true;
    }
    setIsChecked(c);
    handleMarkHasDone(c);
  }
  const handleAddBook = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        ISBN: isbn.toString(),
      }),
    };

    fetch(`${API_URL}/user/book/add`, options)
      .then(function (response) {
        response.json().then(function (value) {
          if (value.status != 200) {
            alert("failure");
          } else {
            window.location.reload();
            // ReactDOM.render(<Home />, document.getElementById("root"));
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleNotes = async (event) => {
    event.preventDefault();
    console.log(email, isbn, notes);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        ISBN: isbn.toString(),
        notes: notes.toString(),
      }),
    };

    fetch(`${API_URL}/user/book/notes`, options)
      .then(function (response) {
        console.log("Response", response);

        response.json().then(function (value) {
          console.log("JSON", value);

          if (value.status != 200) {
            alert("failure");
          } else {
            console.log("done"); // ReactDOM.render(<Home />, document.getElementById("root"));
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDeleteBook = async (event) => {
    event.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        ISBN: isbn.toString(),
      }),
    };

    fetch(`${API_URL}/user/book/delete`, options)
      .then(function (response) {
        console.log("Response", response);

        response.json().then(function (value) {
          console.log("JSON", value);

          if (value.status != 200) {
            alert("failure");
          } else {
            window.location.reload();
            console.log("done");
            // ReactDOM.render(<Home />, document.getElementById("root"));
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleMarkHasDone = async (c) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        ISBN: isbn.toString(),
        finished: c,
      }),
    };

    fetch(`${API_URL}/user/book/read`, options)
      .then(function (response) {
        console.log("Response", response);

        response.json().then(function (value) {
          console.log("JSON", value);

          if (value.status != 200) {
            alert("failure");
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div id="root" className="book-details">
      <div>
        <Header />
      </div>
      {bookDetails.bookstatus ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Book Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{bookDetails.BookDetails.bookTitle}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{bookDetails.BookDetails.bookAuthor}</td>
              </tr>
              <tr>
                <td>Pages</td>
                <td>{bookDetails.BookDetails.bookPages}</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>{bookDetails.BookDetails.isbn}</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleNotes}>
            <label>
              Enter Notes:
              <input
                type="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <div className="tablealign">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={toggleCheckbox}
                style={{
                  backgroundColor: isChecked ? "green" : "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {isChecked ? "Read" : "Mark As Read"}
              </button>
            </label>
            <button onClick={handleDeleteBook}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Book Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{bookDetails.BookDetails.bookTitle}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{bookDetails.BookDetails.bookAuthor}</td>
              </tr>
              <tr>
                <td>Pages</td>
                <td>{bookDetails.BookDetails.bookPages}</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>{bookDetails.BookDetails.isbn}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleAddBook}>AddBook</button>
        </div>
      )}
    </div>
  );
}

export default BookDetailsPage;
