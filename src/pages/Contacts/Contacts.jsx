import React, {useEffect} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
//import moment from 'moment'

const Contacts = () => {
    const [data, setData] = React.useState([])

    useEffect(() => {
        const fetchData = async() => {
            const token = localStorage.getItem("user")
            const {data} = await axios.get("https://somosmas-server.herokuapp.com//contacts" , {headers: {Authorization: `Bearer ${token}`}})
            return data
        }
        fetchData().then((r) => setData(r))

    }, [])

    console.log(data)
  return (
    <div>
        <h1 className='text-center'>Lista de Contactos</h1>
            <div className='container mt-5'>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Fecha de Creación</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        data ? (
                            data.map((item) => (
                                <tr key={uuidv4()}>
                                    <th key={uuidv4()} scope="row">{item.id}</th>
                                    <td key={uuidv4()}>{item.name}</td>
                                    <td key={uuidv4()}>{item.phone}</td>
                                    <td key={uuidv4()}>{item.email}</td>
                                    <td key={uuidv4()}>{new Date(item.createdAt).format('DD/MM/YYYY')}</td>
                                </tr>
                                
                            ))
                        ): null
                    }
                    </tbody>
            </table>
            </div>
    </div>
  )
}

export default Contacts