import React from "react";

export default function Card({ val, index, click, visible }) {
  return (
    <div
      className="card"
      key={index}
      onClick={click}
      data-value={val}
      data-index={index}
    >
      <span className={visible ? "visible" : "invisible"}>{val}</span>
    </div>
  );
}
