import "./App.css";
import React from "react";
import { fetchData, } from "./Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchData()); 
  }, [dispatch]);  


  return (
    <div className="app-container">
      <Header />      
      {data && <Main data={data} /> }
    </div>
  );
}

export default App;
