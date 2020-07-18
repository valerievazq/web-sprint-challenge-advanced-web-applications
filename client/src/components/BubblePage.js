import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "./axios/axiosWithAuth";
import { useParams } from "react-router-dom";

const BubblePage = (id) => {
  const [colorList, setColorList] = useState([]);
  const params = useParams();
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const fetchData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchData(params.id);
  }, [params.id]);
  if (!colorList) {
    return (
      <>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </>
    );
  }
};

export default BubblePage;
