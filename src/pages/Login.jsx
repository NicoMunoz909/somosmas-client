import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import img2 from "../images/loginimg.jpg";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { ErrorAlert } from "../components/Alerts";

import axios from 'axios'

import httpService from "../services/httpService";
import { useNavigate } from "react-router-dom";
let http = new httpService();

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Formato Incorrecto").required("Campo requerido"),
    password: yup.string().min(6, "Necesita al menos 6 caracteres").required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("https://somosmas-server.herokuapp.com//auth/login", { ...values })
        .then((res) => {
          console.log(res.data)
          setIsLoading(false);
          dispatch(login({ user: { ...res.data.data }, token: res.data.token }));
          navigate("/backoffice");
        })
        .catch((err) => {
          setIsLoading(false);
          ErrorAlert({ text: err.message });
        });
    },
  });

  return (
    <div className="d-flex justify-content-center">
      {isLoading && <Loader />}
      <div className="row align-items-center m-0">
        <div
          className="col-12 col-md-6 d-flex justify-content-center"
          style={{ height: "100vh", alignItems: "center" }}
        >
          <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
            <p className="m-0">Bienvenido</p>
            <h2>Inicia sesión en tu cuenta!</h2>
            <input
              className="form-control mx-auto"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}

            <input
              className="form-control mx-auto mt-2"
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-danger mt-2 rounded">
                Inicia Sesión
              </button>
            </div>
            <p className="mt-2 text-center">
              No tienes una cuenta?{" "}
              <strong>
                <a className="text-danger text-decoration-none" href="http://">
                  Registrate
                </a>
              </strong>
            </p>
          </form>
        </div>
        <div className="d-none d-md-block col-md-6 p-0">
          <img
            src={img2}
            alt=""
            className=""
            style={{ maxWidth: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
