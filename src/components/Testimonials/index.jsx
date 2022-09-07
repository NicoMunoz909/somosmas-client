import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import httpService from "../../services/httpService";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./styles.css";

const service = new httpService();

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const user = useSelector((store) => store.auth.user || null);
  useEffect(() => {
    service.get("testimonials").then((res) => {
      setTestimonials(res);
    });
  }, []);

  return (
    <div className="module--testimonials">
      <h2 className="text-center fw-semibold" style={{ margin: "4.8rem 0 1.6rem 0" }}>
        Testimonios
      </h2>
      <div
        className="d-flex flex-wrap w-100 justify-content-center align-content-start"
        style={{ marginBottom: "4rem" }}
      >
        {testimonials &&
          testimonials.map((testimonial) => {
            const innerHtml = { __html: testimonial.content }
            return (
              <div className="module--testimonial" key={uuidv4()}>
                <div
                  className="rounded-4 m-2 p-3"
                  style={{
                    backgroundColor: "#FAFA88",
                  }}
                >
                  <div
                    className="card-img-top rounded-circle"
                    style={{
                      width: "90px",
                      height: "90px",
                      backgroundImage: `url(https://somosmas-server.herokuapp.com//images/${testimonial.imageUrl})`,
                      overflow: "hidden",
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "auto 100%",
                      backgroundPosition: "center center",
                    }}
                  ></div>
                  <div className="mt-3 module--testimonial-content">
                    <h5 className="fw-semibold">{testimonial.name}</h5>
                    <p className="module--testimonial-content-p" dangerouslySetInnerHTML={innerHtml}></p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="text-center d-flex flex-column mb-5">
        {user && <Link to="add"><button className="btn btn-danger px-5 py-2 fs-5 rounded-3 mb-2" >¡Agregar mi Testimonio!</button></Link>}
        <Link to="/">
          <button className="module--btnInicio button mt-5 px-5 py-2 fs-5 rounded-3 border border-1 border-dark">
            Ir a Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Testimonials;
