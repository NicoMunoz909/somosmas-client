import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ConfirmAlert } from "../../components/Alerts";
import moment from 'moment';
import httpService from '../../services/httpService';
const service = new httpService()

const ABMUsers = () => {
    const [usersInfo, setusersInfo] = React.useState([])


    const navigate = useNavigate()


    useEffect(() => {
        const getInfo = async () => {
            const res = await service.get("users/all")
            console.dir(res)
            setusersInfo(res)
        }

        getInfo()
    }, [])

    const deleteMember = async (id) => {

        ConfirmAlert({
            text: "Esta por eliminar este miembro, ¿desea continuar?",
            onConfirm: async () => {
              await axios.delete(`https://somosmas-server.herokuapp.com//users/${id}`)
              window.location.reload()
            },
          });

    }
  return (
    <div>
        <h1 className='container text-center mt-5'>Usuarios</h1>
        <div className="container">
            <Link state={{props:0}} className="btn btn-danger btn-lg my-5 text-white fw-bold" to={"create/new"}> Crear Usuario </Link>
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
                    usersInfo && usersInfo.map((users) => (
                        <tr>
                            <th scope="row">{users.id}</th>
                            <td ><img src={`${users.image}`} style={{ width: "35px", height:"35px" }} className="img-fluid" alt={users.id} /></td>
                            <td >{users.firstName + " " + users.lastName}</td>
                            <td>{users.roleId === 1 ? "Administrador" : "Usuario"}</td>
                            <td >{moment(users.createdAt).format("DD/MM/YYYY")}</td>
                            <td
                                style={{
                                minWidth: "100px",
                                display: "flex",
                                justifyContent: "space-between",
                                }}
                            >
                                <Link state={{props:users}} className="btn btn-info text-white" to={`edit/${users.id}`}>
                                <FiEdit />
                                </Link>
                                <button
                                        className="btn btn-danger"
                                        style={{ zIndex: "10" }}
                                        value={users.id}
                                        onClick={() => deleteMember(users.id)}
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

export default ABMUsers