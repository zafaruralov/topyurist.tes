import React from "react";
import { Link } from "react-router-dom";

const Index = ({ crumbs }) => {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__list">
        {crumbs.map((item, i) => (
          <li className="breadcrumbs__item" key={`${item.title} - ${i}`}>
            {i === length ? (
              <span> {item.title} </span>
            ) : (
              <Link to={item.link}>{item.link}</Link>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Index;
