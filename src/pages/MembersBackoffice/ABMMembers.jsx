import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ConfirmAlert } from "../../components/Alerts";
import moment from 'moment';

const ABMMembers = () => {
    const [membersInfo, setMembersInfo] = React.useState([])


    const navigate = useNavigate()


    useEffect(() => {
        const getInfo = async () => {
            const {data} = await axios.get("https://somosmas-server.herokuapp.com//members")
            setMembersInfo(data)
        }

        getInfo()
    }, [])

    const deleteMember = async (id) => {

        ConfirmAlert({
            text: "Esta por eliminar este miembro, ¿desea continuar?",
            onConfirm: async () => {
              await axios.delete(`https://somosmas-server.herokuapp.com//members/${id}`)
              window.location.reload()
            },
          });

    }
  return (
    <div>
        <h1 className='container text-center mt-5'>Miembros</h1>
        <div className="container">
            <Link state={{props:0}} className="btn btn-danger btn-lg my-5 text-white fw-bold" to={"create/new"}> Crear Miembro </Link>
        </div>
        <div className='container'>
        <table className="table ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Puesto</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
        
            <tbody>
                {
                    membersInfo.map((members) => (
                        <tr>
                            <th scope="row">{members.id}</th>
                            <td ><img src={`https://somosmas-server.herokuapp.com//images/${members.image}`} style={{ width: "35px", height:"35px" }} className="img-fluid" alt={members.id} /></td>
                            <td >{members.name}</td>
                            <td>{members.role}</td>
                            <td >{moment(members.createdAt).format("DD/MM/YYYY")}</td>
                            <td
                                style={{
                                minWidth: "100px",
                                display: "flex",
                                justifyContent: "space-between",
                                }}
                            >
                                <Link state={{props:members}} className="btn btn-info text-white" to={`edit/${members.id}`}>
                                <FiEdit />
                                </Link>
                                <button
                                        className="btn btn-danger"
                                        style={{ zIndex: "10" }}
                                        value={members.id}
                                        onClick={() => deleteMember(members.id)}
                                        >
                                            <FiTrash2 />
                                </button>
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

export default ABMMembers