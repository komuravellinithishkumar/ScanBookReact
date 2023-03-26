import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import FormComponent from "./Components/Form";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
// import Card from "./Components/AddBook";
import BookDetailsPage from "./Components/BookDetails";

function App() {
  document.title = "ScanBuy";
  return (
    <div className="box">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/viewBookDetails/:isbn" element={<BookDetailsPage />} />
        {/* <Route path="/card/:id" element={<Card />} /> */}
      </Routes>
    </div>
  );
}

export default App;
