import React,{useState,useEffect,useRef} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import httpService from "../../services/httpService";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Loader from '../../components/Loader';
import axios from 'axios'

const service = new httpService();

const TestimonialsForm = () => {
    const {id} = useParams()
    const Navigate = useNavigate()
    const inputFile = useRef()
    const [isLoading, setIsLoading] = useState(false);
    let [mydata, setMyData] = useState({
        name: '',
        imageUrl: ''
    })
    let [files, setFiles] = useState()
    let [myContent, setMyContent] = useState()

    useEffect(()=>{
        service.get(`testimonials`, id)
            .then(res => {
                let myObject = {
                    name : id ? res.name : '',
                    content : id ? res.content : '',
                    imageUrl : id ? res.imageUrl : '',
                }
                setMyData(myObject)
            })
    },[id])


    const getUrlImg = async () => {
            //Get URL image first
            let data = null;

            const formData = new FormData()
            formData.append("image",files)
        
            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                },
              };
              
            setIsLoading(true);
            data = await service.post("images",formData,config)
            if(data != null) setIsLoading(false)
            
            console.log(data)
            clearInputFile()
            setMyData({
                ...mydata,
                imageUrl: data.data.imagePath
            })
    }

    const handleChange = (e) => {
        setMyData({
            ...mydata,
            name : e.target.value
        })
    }

    const handleUpload = (e) =>{
        e.preventDefault()

        getUrlImg()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(id){
            //Edit
                setIsLoading(true)
                let res = await axios.put(`https://somosmas-server.herokuapp.com//testimonials/${id}`,{
                    name: mydata.name,
                    content: myContent,
                    imageUrl: mydata.imageUrl
                })
                if(res.data[0] === 1) {
                    setIsLoading(false)
                    alert('Testimonio editado con exito')
                }
            Navigate('/testimonios')
        }else{
            //create
            console.log('create')
            let res = await axios.post('https://somosmas-server.herokuapp.com//testimonials',{
                name: mydata.name,
                content: myContent,
                imageUrl: mydata.imageUrl
            })

            if(res.statusText === "OK"){
                alert('USUARIO CREADO CON EXITO')
                Navigate('/testimonios')
            }
            console.log(res)
        }
    }

    const handleFile = (e) => {
        setFiles(e.target.files[0])
    }

    const clearInputFile = () => {
        inputFile.value = undefined
    }

  return (
    <div className='container d-flex flex-column align-items-center'>
        <h1 className='text-center mt-5'>Editar Testimonio</h1>
        <form onSubmit={handleUpload}>
        </form>

        <form className=' w-50 m-50' onSubmit={handleSubmit}>
            <label className='form-label'>Nombre</label>
            <input type="text" name='name' className='form-control' placeholder={id ? mydata.name : ''} onChange={handleChange}/>
            <input className=' my-2 form-control' type="file" onChange={handleFile} ref={inputFile}/>
            {isLoading && <Loader />}
            <div className='mb-1'>
                <CKEditor
                    name="content" 
                    editor={ ClassicEditor }
                    data={id ? mydata.content : ''}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setMyContent(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
            <input type="submit" className='btn btn-danger' value={id ? 'Editar' : 'create'}/>
        </form>
    </div>
  )
}

export default TestimonialsForm