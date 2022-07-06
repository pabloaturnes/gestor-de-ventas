
import { useState } from "react"
import { useFirestore } from "./useFirestore"
import { storage } from "../firebase"
import {  ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const useFormValidation = (initialForm,initialErrors, id, edit, collectionName) =>{

    const [form, setForm] = useState(initialForm)
    const [formErrors,setFormErrors] = useState(initialErrors)
    const [formSuccess, setFormSuccess] = useState({})
    const {addData, updateData} = useFirestore()

    const handleChange = (e) =>{
        const {name,value} = e.target
        setForm({...form, [name] : value})
    }

    const formHandleBlur = (e,value) =>{
        handleChange(e)
        const {name} = e.target
        setFormErrors({...formErrors, [name] : value })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        //cuando hago el submit tengo que preguntar si hay algo en file, luego subir la foto, luego actualizar el objeto form y recien al final mandar add o edit

        edit? editData(e) : add(e)   
    }

    const editData = async (e) =>{
        for(let input in formErrors){
            if(formErrors[input]){
                setFormSuccess({err: "ok"})
                return
            }
        }


        if(e.target.foto && e.target.foto.files[0]){   //preguntamos si se subio algun archivo al input tipo file

            //si viene un nuevo file tenemos que borrar el antiguo file, pero antes preguntamos si habia un antiguo file
            if(form.foto){
                const fileRef = ref(storage, form.foto);
                await deleteObject(fileRef)
            }

            //subimos el nuevo archivo
            let timestampId = Date.now()
            let archivo =  e.target.foto.files[0]
            let archivoExtension = archivo.name.substr( (archivo.name.lastIndexOf(".")+1 - archivo.name.length) ) ;

            //copiamos el archivo y lo renombramos
            const archivoRenombrado = new File([archivo], `${timestampId}.${archivoExtension}`);

            //creamos una referencia
            const archivoRef = ref(storage, archivoRenombrado.name);

            //lo subimos
            await uploadBytes(archivoRef, archivoRenombrado)

            const filePath =  await getDownloadURL(archivoRef)
            let {name} = e.target.foto

              const imgUrl = {
                [name]: filePath  
              }
            
            //tenemos que actualizar form con el nuevo foto
            setForm(Object.assign(form,imgUrl))
        }

        //hacemos el update
        setFormSuccess({succ: "ok"})
        updateData(id,form,collectionName)
  
    }

    const add = async (e) =>{

        
        for(let input in formErrors){
            if(formErrors[input]){
                setFormSuccess({err: "ok"})
                return
            }
        }

        setFormSuccess({succ: "ok"})


        if(e.target.foto && e.target.foto.files[0]){

            let timestampId = Date.now()
            let archivo =  e.target.foto.files[0]
            let archivoExtension = archivo.name.substr( (archivo.name.lastIndexOf(".")+1 - archivo.name.length) ) ;

            //copiamos el archivo y lo renombramos
            const archivoRenombrado = new File([archivo], `${timestampId}.${archivoExtension}`);

            //creamos una referencia
            const archivoRef = ref(storage, archivoRenombrado.name);

            //lo subimos
            await uploadBytes(archivoRef, archivoRenombrado)

            //obtenemos la url del archivo en la nube
            const filePath =  await getDownloadURL(archivoRef)

            //actualizamos el objeto form con el campo imgUrl
            let {name} = e.target.foto

              const imgUrl = {
                [name]: filePath  
              }
              
            setForm(Object.assign(form,imgUrl))
        }

        addData(form,collectionName)
        setFormErrors(initialErrors)
        setForm(initialForm)
    }




    return {
        form,
        formSuccess,
        handleChange,
        formHandleBlur,
        handleSubmit
    }


}