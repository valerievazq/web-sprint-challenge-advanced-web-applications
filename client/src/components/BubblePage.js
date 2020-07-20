import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "./axios/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    fetchColors();
  }, []);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const fetchColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        // console.log("GET Response: ", res);
        setColorList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        fetchColors={fetchColors}
      />{" "}
      <Bubbles colors={colorList} />
    </>
  );
};
export default BubblePage;
