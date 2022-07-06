import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogItem = ({blogItem,catslug}) => {
  return (
    <>
      {/* <div className="active blog_item"> */}
      <img src={blogItem.img.url} alt="" width="300px" height="210px" />
      <div className="content">
        
        <h3>{blogItem.title}</h3>
        <h4>{blogItem.description}</h4>

        <Link className="link" to={`details/${catslug}/${blogItem.slug}`}>
          <button>click</button>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
};

export default BlogItem;
