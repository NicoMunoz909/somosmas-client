import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from "formik";
import httpService from "../../services/httpService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let http = new httpService();

const FormOrganizacion = ({data}) => {
  let [sendForm, setSendForm] = useState(false);
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-column ms-20 text-center align-items-center">
        <h1>Editar organización</h1>
        <img src="/images/Group33.png" alt="" height={50} width={90} />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
      <Formik
        initialValues={{
          welcomeText: data.welcomeText,
          image: data.image,
          phone:data.phone,
          welcomeImage: data.welcomeImage,
          welcomeTitle: data.welcomeTitle,
          email:data.email

        }}
        onSubmit={async (values, { resetForm }) => {
          resetForm();
          //Aqui va la peticion fetch para actualizar la organización en la base de datos EJ:
          /*
        fetch('/organization', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        */
        try{
          let message = await axios.put("https://somosmas-server.herokuapp.com//organizations/edit/1",values)
          

           setSendForm(true);
           setError(null);
           setTimeout(() => {
             setSendForm(false);
             setError(false);
           }, 2000);
           
           if(message) navigate('/Backoffice/Organizacion')

        }catch(err){
          if (err.errors) setError(err.errors);
          console.log(err);
        }

        }}
      >
        {({ errors, touched }) => (
          <Form className="d-lg-flex flex-lg-column justify-content-lg-center align-items-lg-center w-50 fw-bold">
            <div className="mb-3 w-50">
              <label htmlFor="welcomeText" className="form-label">
                Text de bienvenida
              </label>
              <Field
                component="textarea"
                rows="4"
                type="textarea"
                className="form-control"
                id="welcomeText"
                name="welcomeText"
              />
              {touched.welcomeText && errors.welcomeText && (
                <div className="alert alert-danger" role="alert">
                  {errors.welcomeText}
                </div>
              )}
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <Field type="text" className="form-control" id="phone" name="phone" placeholder={data.phone}/>
              {touched.phone && errors.phone && (
                <div className="alert alert-danger" role="alert">
                  {errors.phone}
                </div>
              )}
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <Field type="text" className="form-control" id="email" name="email" placeholder={data.email}/>
              {touched.email && errors.email && (
                <div className="alert alert-danger" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="welcomeTitle" className="form-label">
                Title Welcome
              </label>
              <Field type="text" className="form-control" id="welcomeTitle" name="welcomeTitle" placeholder={data.welcomeTitle}/>
              {touched.welcomeTitle && errors.welcomeTitle && (
                <div className="alert alert-danger" role="alert">
                  {errors.welcomeTitle}
                </div>
              )}
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="welcomeImage" className="form-label">
                Welcome Image
              </label>
              <Field type="text" className="form-control" id="welcomeImage" name="welcomeImage" />
              {touched.welcomeImage && errors.welcomeImage && (
                <div className="alert alert-danger" role="alert">
                  {errors.welcomeImage}
                </div>
              )}
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="image" className="form-label">
                Image Principal
              </label>
              <Field type="text" className="form-control" id="image" name="image" />
              {touched.image && errors.image && (
                <div className="alert alert-danger" role="alert">
                  {errors.image}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-50 fw-bold"
              style={{ backgroundColor: "#FF0000" }}
            >
              Actualizar
            </button>
            {error ? (
              <div>Error unsuccess</div>
            ) : (
              sendForm && (
                <div className="alert alert-success" role="alert">
                  Información actualizada con éxito!
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

export default FormOrganizacion;
