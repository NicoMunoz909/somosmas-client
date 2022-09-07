import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from 'react'
import axios from 'axios';

const Slider = () => {
 const [sliderContent, setSliderContent] = React.useState([])


 useEffect(() => {
    const setInfo = async () => {
      const {data} =  await axios.get("https://somosmas-server.herokuapp.com/slides")
      setSliderContent(data)
    }
    setInfo()
 }, [])
  return (
    <div className="container-fluid p-0">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          {sliderContent.map((item, index) =>
            index === 0 ? (
              <button
                key={uuidv4()}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
            ) : (
              <button
                key={uuidv4()}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                aria-current="true"
              ></button>
            )
          )}
        </div>
        <div className="carousel-inner">
          {sliderContent.map((item, index) =>
            item.order === 1 ? (
              <div key={uuidv4()} className="carousel-item active" style={{transition: "all 1s ease-out"}}>
                <img
                  src={item.imageUrl}
                  className="d-block w-100"
                />
                <div
                  key={uuidv4()}
                  className="carousel-caption d-none d-md-block"
                >
                  <h4>{item.text}</h4>
                </div>
              </div>
            ) : (
              <div key={uuidv4()} className="carousel-item" style={{transition: "all 1s ease-out"}}>
                <img
                  key={uuidv4()}
                  src={item.imageUrl}
                  className="d-block w-100 img-fluid"
                  alt={item.imageUrl}
                />
                <div
                  key={uuidv4()}
                  className="carousel-caption d-none d-md-block"
                >
                  <h4>{item.text}</h4>
                </div>
              </div>
            )
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden" id="nextSlider">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Slider
