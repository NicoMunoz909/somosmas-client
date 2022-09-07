import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import img2 from "../../images/loginimg.jpg";
import axios from 'axios'
import {v4 as uuidv4 } from 'uuid'

const Home = () => {

  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    axios.get('https://somosmas-server.herokuapp.com//members')
    .then((res) => {
      setMembers(res.data);
    })
    .catch((err) => {
      setMembers(null)
    })
  }, [])

  useEffect(() => {
    axios.get('https://somosmas-server.herokuapp.com//testimonials')
    .then((res) => {
      setTestimonials(res.data);
    })
    .catch((err) => {
      setTestimonials(null)
    })
  }, [])

  useEffect(() => {
    axios.get('https://somosmas-server.herokuapp.com//news')
    .then((res) => {
      setNews(res.data);
    })
    .catch((err) => {
      setNews(null)
    })
  }, [])

  return (
    <div className='container mt-5'>

      <div className='d-flex'>
        <div className='container w-50' style={{height: 'fit-content', alignSelf: 'center'}}>
          <h2 className='h1'>Hola! Bienvenidx</h2>
          <p className='lead'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe pariatur ut consectetur minima reiciendis iste quibusdam aliquam rerum, autem vitae, aperiam animi magnam aspernatur. Pariatur ea expedita earum saepe inventore.</p>
          <button className='btn btn-danger px-4 py-2 fw-bolder shadow-sm' onClick={() => navigate("/contacto")}>Contactanos</button>
        </div>
        <div className='container w-50'>
          <img className='img-fluid rounded' src={img2} alt="" />
        </div>
      </div>

      <div className='mt-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='h2'>Nuestro Staff</h2>
          <Link to='nosotros'>Ver todos &gt;</Link>
        </div>
        <div className='row'>
          {members === null ?
          <h2>Could not load data</h2> :
          members.slice(0,4).map((members) => (
            <div key={uuidv4()} className='card border-0 col-4 col-md-3 col-lg-2 m-1 mb-5' style={{width:"20%"}}>
                  <img key={uuidv4()} className=' imagen-card img-fluid rounded-5 shadow' src={`https://somosmas-server.herokuapp.com//images/${members.image}`} alt={members.image} />
                  <div className='card-img-overlay d-flex justify-content-end flex-column'>
                    <p className='m-0 text-light fw-bolder fs-5 text-center' key={uuidv4()}>{members.name}</p>
                    <p className='m-0 text-light fs-8 text-center' key={uuidv4()}>{members.role}</p>
                  </div>
                </div>
            )
          )}
        </div>
      </div>

      <div className='mt-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='h2'>Testimonios</h2>
          <Link to='testimonios'>Ver todos &gt;</Link>
        </div>
        <div className='row row-cols-5'>
          {testimonials === null ?
          <h2>Could not load data</h2> :
          testimonials.slice(0,5).map((testimonial) => (
            <div key={testimonial.id} className='card border-0 col m-2 rounded-4' style={{backgroundColor: '#FAFA88'}}>
              <img className='card-img-top w-50 mt-3 rounded-circle shadow ' src={`https://somosmas-server.herokuapp.com//images/${testimonial.imageUrl}`} alt='' />
              <div className='card-body d-flex flex-column align-items-center justify-content-end text-start'>
                <p className='fw-bolder fs-5'>{testimonial.name}</p>
                <p className=''>{testimonial.content}</p>
              </div>
            </div>)
          )}
        </div>
      </div>

      <div className='mt-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='h2'>Novedades</h2>
          <Link to='novedades'>Ver todos &gt;</Link>
        </div>
        <div className='row row-cols-3'>
          {news === null ?
          <h2>Could not load data</h2> :
          news.slice(0,2).map((item) => (
          <div className="card mb-3 py-3 m-2 border-0 rounded-4" style={{maxWidth: "540px", backgroundColor: "#9AC9FB"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`https://somosmas-server.herokuapp.com//images/${item.image}`} className="img-fluid rounded-3 shadow" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">{item.content}</p>
                  <button className='btn btn-primary w-100 f-bolder shadow' onClick={() => navigate(`news/${item.id}`)}>Ver Novedad</button>
                </div>
              </div>
            </div>
          </div>)
          )}
        </div>
      </div>

    </div>
  )
}

export default Home