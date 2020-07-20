import React, { useState } from "react";
import { axiosWithAuth } from "./axios/axiosWithAuth";
const initialColor = {
  color: "",
  code: { hex: "" },
};

// const addColor = {
//   color: "",
//   code: { hex: "" },
//   id: 0,
// };

const ColorList = ({ colors, updateColors, fetchColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };
  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    let id = colorToEdit.id;
    // console.log(id);
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        //  console.log(res);
        updateColors(colors);
        fetchColors();
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    // console.log(color);
    let id = color.id;
    // console.log(id);
    axiosWithAuth()
      .delete(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        updateColors(colors);
        fetchColors();
      });
  };

  //stretch add new color to list
  const addColor = {
    color: "",
    code: { hex: "" },
    id: 0,
  };
  const [newColor, setNewColor] = useState(addColor);

  const addNewColor = (e) => {
    e.preventDefault();
    setNewColor({ ...newColor, id: Date.now });
    // console.log(addColor);

    axiosWithAuth()
      .post("/api/colors", newColor)
      .then((res) => {
        console.log(res);
        fetchColors();
      });
  };

  return (
    <div className="colors-wrap">
      <p>COLORS</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div>
        Add a Color
        <br />
        <form onSubmit={addNewColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value },
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
