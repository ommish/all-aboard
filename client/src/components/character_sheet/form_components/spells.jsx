import React from "react";
import ReactQuill from "react-quill";
import "./quill.snow.css";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    ["link"],
    [{ font: [] }],
    ["clean"]
  ]
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "color",
  "background",
  "align",
  "clean",
  "image",
  "link"
];

function Spells({ onChange, value }) {
  return [
    <link rel="stylesheet" href="quill.snow.css" />,
    <ReactQuill
      theme="snow"
      modules={quillModules}
      formats={quillFormats}
      value={value}
      onChange={onChange}
    />
  ];
}

export default Spells;
