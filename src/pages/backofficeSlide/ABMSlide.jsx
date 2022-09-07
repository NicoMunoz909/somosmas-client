import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import moment from 'moment';

const ABMSlide = () => {
    const [slideInfo, setSlideInfo] = React.useState([])

    useEffect(() => {
        const setInfo = async () => {
            const {data} =  await axios.get("https://somosmas-server.herokuapp.com//slides")
            setSlideInfo(data)
          }
          setInfo()
    }, [])
  return (
    <div>
        <h1 className='container text-center mt-5'>
            Slides
        </h1>
        <div className='container'>
        <table className="table ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Imagen</th>
                <th scope="col">Contenido</th>
                <th scope="col">Posición</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
        
            <tbody>
                {
                    slideInfo.map((slide) => (
                        <tr>
                            <th scope="row">{slide.id}</th>
                            <td ><img src={slide.imageUrl} style={{ width: "35px" }} className="img-fluid" alt={slide.id} /></td>
                            <td >{slide.text}</td>
                            <td>{slide.order}</td>
                            <td >{moment(slide.createdAt).format("DD/MM/YYYY")}</td>
                            <td
                                style={{
                                minWidth: "100px",
                                display: "flex",
                                justifyContent: "space-between",
                                }}
                            >
                                <Link state={{props:slide}} className="btn btn-info text-white" to={`edit/${slide.id}`}>
                                <FiEdit />
                                </Link>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ABMSlide