import React, { useEffect } from "react";
import image1 from "../../../images/Novedad1.png";
import { v4 as uuidv4 } from 'uuid'
import { Link } from "react-router-dom";
import "./styles.css";

function NovedadesItem({ image, content, id, name }) {
  const text = (content) => {
    const div = document.getElementById("contenido").innerHTML = content
    return div
  }

  useEffect(() => {
    text(content)
  }, [])
  return (
    <div className="col-12 col-sm-6 col-xl-6" key={uuidv4()}>
      <div
        className="card m-2 p-3 ms-md-0 me-md-3 rounded-4"
        style={{
          backgroundColor: "#7E9AFD",
          border: "1px solid #0038FF",
        }}
        key={uuidv4()}
      >
        <div className="row g-0 d-flex align-items-center align-items-lg-stretch">
          <div
            className="module--image-div col-lg-6 bg-cover d-flex justify-content-center align-items-center align-self-stretch rounded-4"
            style={{
              overflow: "hidden",
              flexGrow: "1",
              backgroundImage: `url(https://somosmas-server.herokuapp.com//images/${image})`,
              objectFit: "contain",
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto 100%",
              backgroundPosition: "center center",
            }}
          >
            {/* 
            <img src={img1} className="img-fluid rounded-4 h-100" alt={`imagen-${name}`} /> */}
          </div>
          <div className="col-lg-6 d-lg-flex align-self-lg-stretch">
            <div className="d-flex flex-column justify-content-between pt-2 ps-lg-4 align-items-center">
              <p
                className="card-text fs-5"
                style={{
                  lineHeight: "1.7rem",
                }}
                key={uuidv4()}
                id="contenido"
              >
              </p>
              <Link
                className="btn btn-primary mx-auto rounded-3 px-3 py-2 px-lg-5 py-lg-2"
                style={{
                  backgroundColor: "#0038FF",
                  border: "none",
                  boxShadow: "0px 4px 4px 0px #00000040",
                }}
                to={`news/${id}`}
              >
                Ver novedad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovedadesItem;
