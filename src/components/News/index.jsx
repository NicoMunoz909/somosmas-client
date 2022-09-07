import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpService from "../../services/httpService";
import axios from "axios";
import moment from "moment";
import 'moment/locale/es-mx'
import { v4 as uuidv4 } from 'uuid'

const http = new httpService();

const News = () => {
  const navigate = useNavigate()
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getData() {
      let {data} = await axios.get("https://somosmas-server.herokuapp.com//news");
      setNews(data);
    }

    getData();
    
  }, []);

  return (
    <div>
      <h1 className="container text-center mt-5">Novedades</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {news &&
          news.map((e) => {
            return (
              <div className="card mb-3 p-3 m-2 mt-5 border-0 rounded-4" style={{maxWidth: "540px", backgroundColor: "#9AC9FB"}}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={`https://somosmas-server.herokuapp.com//images/${e.image}`} className="img-fluid rounded-3 shadow" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">{e.content}</p>
                    <Link className='btn btn-primary w-100 f-bolder shadow' to={`${e.id}`}>Ver Novedad</Link>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
