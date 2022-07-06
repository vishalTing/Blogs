import "./blog.css";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
// import { Link } from "react-router-dom";
import BlogItem from "./BlogItem";

const BlogListing = () => {
  const [blogs, setBlogs] = useState();
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");
  let catslug;

  useEffect(() => {
    const query = gql`
      {
        categories {
          title
          slug
          blogs {
            img {
              height
              url
              width
            }
            slug
            title
            description
            longDescription {
              text
            }
          }
        }
      }
    `;

    request(
      "https://api-ap-south-1.graphcms.com/v2/cl4qs6ltp04lx01z6hzmlg6q5/master",
      query
    ).then((data) => {
      setBlogs(data);
      // console.log(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="leftdiv">
        <div className="header">
          <h3>Category</h3>
        </div>
        <input
          className="search"
          type="text"
          name="find"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setActiveCat("ALL");
          }}
        >
          All
        </button>
        {blogs &&
          blogs.categories.map((catItem, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveCat(catItem.title);
                }}
              >
                {catItem.title}
              </button>
            );
          })}
      </div>
      <div className="rightdiv">
        <div className="blog_wrap">
          {blogs &&
            blogs.categories.map((catItem, index) => {
              catslug = catItem.slug;

              return (
                <>
                  {catItem.blogs
                    .filter((find) => {
                      if (search === "") {
                        return find;
                      } else if (
                        find.title.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return find;
                      }
                      return null
                    })
                    .map((blogItem, id) => {
                      return (
                        <div
                          key={id}
                          className={
                            activeCat === catItem.title || activeCat === "ALL"
                              ? "active blog_item"
                              : "blog_item"
                          }
                        >
                          {/* <Link className="link" to={`details/${blogItem.slug}`}>
                          <img src={blogItem.img.url} width="300px" height="210px" alt="" />
                          <div className="content">
                          <h3>{blogItem.title}</h3>
                          <h4>{blogItem.description}</h4>
                          <button>CLICK</button>
                          </div>
                         
                        </Link> */}

                          <BlogItem catslug={catslug} blogItem={blogItem} />
                        </div>
                      );
                    })}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
