import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
import './styles.css';

const CreateTestimonio = () => {
    const navigate = useNavigate()
    const user = useSelector(store => store.auth.user || null)
    
    //States
    const [name, setName] = useState(user.firstName + " " + user.lastName)
    const [content, setContent] = useState("")
    const [image, setImage] = useState(user.image)

    //Crear testimonios
    const createTestimonial = async(ev) => {
        ev.preventDefault()

        try {
            const formData = {}
            formData.imageUrl= image
            formData.name = name
            formData.content = content
            console.log(formData)
            const form = document.getElementById("formulario")
            const { data } = await axios.post('https://somosmas-server.herokuapp.com//testimonials', formData)
            form.reset()
            navigate(-1)
        } catch (e) {
            console.log(e)
        }
    }
    
  return (
    <div>
                <div className='container mt-5'>
                    <div className='container d-flex justify-content-center'>
                        <form id='formulario' className='fw-semibold' onSubmit={createTestimonial}>
                        <label className='label-form mt-3'>Contenido</label>
                        <CKEditor   
                                    
                                    editor={ ClassicEditor }
                                    data={content}
                                    onChange={(event, editor) => {
                                        setContent(editor.getData())
                                    }}
                                />
                                <button type='submit' className="btn btn-danger mt-4 w-100 text-center">Crear</button>
                        </form>
                    </div>
                </div>
    </div>
  )
}

export default CreateTestimonio