import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'

const EditSlide = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }


    //States
    const [image, setImage] = React.useState(state.props.imageUrl)
    const [text, setText] = React.useState(state.props.text)
    const [order, setOrder] = React.useState(state.props.order)

    //function
    const editSlide = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("image", image)
            formData.append("text", text)
            formData.append("order", order)
            const form = document.getElementById("formulario")
            const { data } = await axios.put(`https://somosmas-server.herokuapp.com/slides/${state.props.id}`, formData, config)
            form.reset()
            navigate(-1)
        } catch (e) {
            console.log(e)
        }

    }
  return (
    <div>
        <h1 className='container text-center mt-5'>
            Editar
        </h1>
        <div className='container'>
            <div className='container d-flex justify-content-center'>

                    <form id='formulario' onSubmit={editSlide}>
                        <input type="hidden" defaultValue={state.props.id} />
                        <label className='label-form'>Orden</label>
                        <select name='order' value={order} onChange={e => setOrder(e.target.value)} class="form-select" aria-label="Default select example">
                            <option>Selecciona el Orden</option>
                            <option value="1">Primero</option>
                            <option value="2">Segundo</option>
                            <option value="3">Tercero</option>
                        </select>
                        <label className="form-label mt-2">Selecciona una imagen</label>
                        <input type="file" name="image" onChange={e => setImage(e.target.files[0])} accept="image/*" className="form-control"/>
                        <label className='label-form mt-2'>Texto</label>
                        <textarea className='form-control' type="text" name="text" value={text} onChange={e => setText(e.target.value)}></textarea>
                        <button type='submit' className="btn btn-warning mt-2">Editar Slide</button>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default EditSlide