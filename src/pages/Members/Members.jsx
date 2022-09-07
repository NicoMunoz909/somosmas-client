import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MembersCards from '../../components/MembersCards';
import img3 from "../../images/img3.jpg";

const Members = () => {

    const [member, setMember] = useState({
        name: 'Roberto Martinez',
        role: 'Rol que desempeña',
        description: 'Ullamco nisi Lorem amet excepteur irure commodo eu elit tempor sit et. Non velit Lorem Lorem consectetur qui ex occaecat occaecat et occaecat quis. Cupidatat tempor eiusmod laboris laborum elit culpa adipisicing nulla ut sit qui. Labore veniam cillum do veniam nostrud mollit pariatur pariatur. Anim ipsum nostrud consectetur quis tempor in nulla do adipisicing culpa esse officia tempor. Aliqua eu excepteur commodo irure consectetur deserunt.',
        image: '25b08fbf03657faa9b34f257a6bb49ab'
    })

    // useEffect(() => {
    //     fetch('https://somosmas-server.herokuapp.com//members/1')
    //     .then((res) => setMember)
    // })

  return (
    <div>
        <h1 className='text-center mt-5'>¡Nuestro Staff!</h1>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-12 col-lg-6'>
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.description}</p>
                    <a type='button' className='mb-5 mt-5 btn btn-danger btn-lg' href="/registro">¡Quiero ser parte!</a>
                </div>
                <div className='col-sm-12 col-lg-6'>
                    <img className='img-fluid rounded-5' src={`https://somosmas-server.herokuapp.com//images/${member.image}`} alt={img3} />
                </div>
            </div>
        </div>
            <div className='container mt-5'>
            <MembersCards onClick={(data) => setMember(data)}/>
            </div>
    </div>
  )
}

export default Members