import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CreateUser = () => {
  let [sendForm, setSendForm] = useState(false);
  let [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Crear Usuario</h1>
      </div>
      <div className="container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            let { firstName, lastName, email, password } = values;

            let myErrors = {};

            //Validate a name:
            if (!firstName) {
              myErrors.firstName = "Por favor ingrese su nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(firstName)) {
              myErrors.firstName = "El nombre sólo puede contener letras y/o espacios";
            }

            //Validate a lastName:
            if (!lastName) {
              myErrors.lastName = "Por favor ingrese su apellido";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(lastName)) {
              myErrors.lastName = "Su apellido sólo debe contener letras y/o espacios";
            }

            //Validate email:
            if (!email) {
              myErrors.email = "Por favor ingrese un correo válido";
            } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
              myErrors.email = "El correo sólo debe contener letras, números y puntos";
            }

            //validate a password:
            if (!password) {
              myErrors.password = "Por favor ingrese una contraseña válida";
            } else if (password.length < 6) {
              myErrors.password = "La contraseña de contener al menos 6 caracteres";
            }

            return myErrors;
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            //Aqui va la peticion fetch para crear el usuario en la base de datos EJ:
            /*
          fetch('/users/auth/register', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          */

            axios.post("https://somosmas-server.herokuapp.com//auth/register", { ...values })
              .then((res) => {
                if (res.errors) setError(res.errors);
                navigate("/backoffice");
              })
              .catch((err) => {
                console.log(err);
              });

            setSendForm(true);
            setError(null);
            setTimeout(() => {
              setSendForm(false);
              setError(false);
            }, 2000);
          }}
        >
          {({ errors, touched }) => (
            <Form className="container col-6">
              <div className="">
                <label htmlFor="firstName" className="form-label fw-bold">
                  Nombre
                </label>
                <Field type="text" className="form-control" id="firstName" name="firstName" placeholder="Ej: Ignacio" />
                {touched.firstName && errors.firstName && (
                  <div className="alert alert-danger" role="alert">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Apellido
                </label>
                <Field type="text" className="form-control" id="lastName" name="lastName" placeholder="Ej: Moenen" />
                {touched.lastName && errors.lastName && (
                  <div className="alert alert-danger" role="alert">
                    {errors.lastName}
                  </div>
                )}
              </div>
              <div className="">
                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
                  Correo
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  placeholder="Ej: correo@correo.com"
                />
                <ErrorMessage
                  name="email"
                  component={() => {
                    return (
                      <div className="alert alert-danger" role="alert">
                        {errors.email}
                      </div>
                    );
                  }}
                />
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>
              <div className="">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">
                  Constraseña
                </label>
                <Field
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Ingrese una contraseña"
                />
                <ErrorMessage
                  name="password"
                  component={() => {
                    return (
                      <div className="alert alert-danger" role="alert">
                        {errors.password}
                      </div>
                    );
                  }}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-danger fw-bold mt-2"
                >
                  Crear
                </button>

              </div>
              {error ? (
                <div>Error unsuccess</div>
              ) : (
                sendForm && (
                  <div className="alert alert-success" role="alert">
                    Register Success
                  </div>
                )
              )}
            </Form>
          )}
        </Formik>

      </div>
    </>
  );
};

export default CreateUser;