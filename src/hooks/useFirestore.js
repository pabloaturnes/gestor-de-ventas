import { collection, getDocs, addDoc, deleteDoc,updateDoc,doc} from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import { useState } from "react"
import { db,storage } from "../firebase"

export const useFirestore = () =>{

    const [data, setData] = useState([])
    const [error,setErr] = useState()
    const [loading,setLoading] = useState(false)

    

    const getData = async (collectionName) =>{

        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db,collectionName))
            const dataDb = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setData(dataDb)

        } catch (error) {
            console.log(error)
            setErr(error.message)
        }finally{
            setLoading(false)
        }

    }

    const addData = async (data,collectionName) =>{

        try {
            setLoading(true)
            await addDoc(collection(db, collectionName), data)

        } catch (error) {
            console.log(error)
            setErr(error.message)
        }finally{
            setLoading(false)
        }

    }

    const updateData = async (id,newData,collectionName) =>{

        try {
            setLoading(true)
            let docRef = doc(db,collectionName,id)
            await updateDoc(docRef,newData)
        } catch (error) {
            console.log(error)
            setErr(error.message)
        }finally{
            setLoading(false)
        }

    }


    const deleteData = async(id,collectionName,foto = "") =>{

        try {
            setLoading(true)
            const docRef = doc(db,collectionName,id)
            await deleteDoc(docRef)

            //si hay una foto borra el archivo asociado
            if(foto){
                const fileRef = ref(storage, foto);
                await deleteObject(fileRef)
            }


            setData(data.filter(item => item.id !== id))
        } catch (error) {
            console.log(error)
            setErr(error.message)
        }finally{
            setLoading(false)
        }

    }


    return {
        data,
        setData,
        error,
        loading,
        getData,
        addData,
        updateData,
        deleteData
    }


}