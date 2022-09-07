import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import  Loader  from '../components/Loader'

const Contacto = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    const sendMessage = async (e) => {
        //Prevent refresh
        e.preventDefault()

        //send Logic
        let myNewData = {
            name: data.nombre,
            email: data.email,
            message: data.comentario
        }

        let res = await axios.post('https://somosmas-server.herokuapp.com//contacts',myNewData,{headers:{'Content-Type': 'application/json'}})
        setIsLoading(true)

        if(res.statusText === "OK") setIsLoading(false)
        //Clear Form
        document.getElementById("form").reset()
    }

    
    const handleInputChange = (e) =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
  return (
    <div className='mt-5'>
        <h1 className="text-center">
            Formulario de Contacto
        </h1>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6">
                <h2>What is Lorem Ipsum?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis, ligula quis molestie mattis, est massa dignissim leo, vitae tempor ex turpis venenatis libero. Aliquam et accumsan urna, id accumsan sem. Ut sed faucibus mauris. Etiam nibh nisl, viverra in odio ac, lacinia vulputate massa. Duis facilisis lectus rutrum condimentum euismod. Morbi et venenatis dolor, ut efficitur nulla. Nam vitae ornare libero. Praesent nisl risus, molestie et urna ac, gravida ultrices velit.</p>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <form onSubmit={sendMessage} id="form">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" name= "nombre" aria-describedby="emailHelp" placeholder="Nombre" required onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name= "email" placeholder="correo@correo.cl" required onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje</label>
                            <textarea className="form-control" id="mensaje" name= "comentario" placeholder="Deje su comentario aquí" style={{height: "100px"}} required onChange={handleInputChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
        {isLoading && <Loader/>}
    </div>
  )
}

export default Contacto