import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { useLocation } from "react-router-dom";
import "../pages/details.css";
import BlogItem from "../components/BlogItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Details = () => {
  const [single, setSingle] = useState("");

  const location = useLocation();

  const path = location.pathname.split("/")[3];
  // console.log(path);
  const catslug = location.pathname.split("/")[2];

  // blogs(where: {slug: "${path}"}) {
  //   img {
  //     url
  //     width
  //     height
  //   }
  //   title
  //   description
  //   longDescription {
  //     text
  //   }
  //   slug
  // }


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,


    responsive: [{
 
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
 
    }, {
 
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true,
      },
  }]
    
  };




  useEffect(() => {
    const query = gql`
      {
        categories (where: {slug: "${catslug}"})  {
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
      setSingle(data.categories[0]);
    });
  }, [catslug]);

  console.log(single)

  return (
    <>

      {single &&
        single?.blogs
            .filter((item) => item.slug === path)
            .map((el) => {
              return (
                <>
                  <div className="full_information">
                    <div className="image">
                      <img src={el.img.url} alt="" />
                    </div>
                    <div className="content_information">
                      <h1>{el.title}</h1>
                      <p>{el.longDescription.text}</p>
                    </div>
                  </div>
                </>
              );
            })
          }
      <hr />

      <h1>Related</h1>

     


<Slider {...settings}>
{single &&
        single.blogs
              .filter((item) => item.slug !== path)
              .map((el) => {
                return (
                  <>
                    <div className="relative_wrap">
                    <BlogItem blogItem={el} catItem={el.slug}/>
                      {/* <div className="relative_image"> */}
                        {/* <img src={el.img.url} alt="" width="250px" height="150px" /> */}
                      {/* </div> */}
                      {/* <div className="relative_information"> */}
                        {/* <h5>{el.title}</h5> */}
                      {/* </div> */}
                    </div>
                  
                  </>
                );
              ;
          })}
    </Slider>
    </>
  );
};

export default Details;
