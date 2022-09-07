import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {v4 as uuidv4 } from 'uuid'

const MembersCards = (props) => {

  const [members, setMembers] = useState([])
  useEffect(() => {
    const getMembers = async() => {
      const {data} = await axios.get("https://somosmas-server.herokuapp.com/members")
      return data
    }
    getMembers().then((r) => setMembers(r))
  }, [])


  return (
    <div className='container'>
      <div className='mt-2'>
        <div className='row'>
          {
            members && (
              members.map((item) => (
                <div key={uuidv4()} className='card border-0 col-4 col-md-3 col-lg-2 mx-2 mb-5' style={{width:"20%"} } onClick={() => props.onClick(item)}>
                  <img key={uuidv4()} className=' imagen-card img-fluid rounded-5 shadow' src={`https://somosmas-server.herokuapp.com/images/${item.image}`} alt={item.image} />
                  <div className='card-img-overlay d-flex justify-content-end flex-column'>
                    <p className='m-0 text-light fw-bolder fs-5 text-center' key={uuidv4()}>{item.name}</p>
                    <p className='m-0 text-light fs-8 text-center' key={uuidv4()}>{item.role}</p>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}
export default MembersCards