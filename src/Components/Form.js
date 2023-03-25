import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const FormComponent = () => {
  const location = useLocation();
  const [apiData, setApiData] = useState({
    id: 1,
    title: "",
    body: "",
  });
  useEffect(() => {
    if (location.state) {
      setApiData(() => {
        return {
          id: location.state.id,
          title: location.state.title,
          body: location.state.body,
        };
      });
    }
  }, [location.state]);
  const chng = (e) => {
    setApiData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form className="formval">
      <input type="number" value={apiData.id} onChange={chng} name="id" />
      <textarea
        type="text"
        value={apiData.title}
        onChange={chng}
        name="title"
      />
      <textarea type="text" value={apiData.body} onChange={chng} name="id" />
      <button>{location.state ? location.state.form : "Add"}</button>
    </form>
  );
};
export default FormComponent;
