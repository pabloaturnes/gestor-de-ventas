
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Ventas.css"
import VentaRow from "./VentaRow";
import Paginador from "./Paginador"

const Ventas = () =>{

    const {data, error, loading, getData, deleteData} = useFirestore()
    const navigate = useNavigate();


    useEffect(()=>{
        getData("ventas")
      },[])


    const handleDelete = (id) =>{
        deleteData(id,"ventas")
    }

    return (
        <main>
            <h1>Estas en listado de ventas</h1>
            {loading && <p>Cargando...</p>}
            {error && <h2>Error en la peticion</h2>}
            <div className="table-container">
                <table >
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                data.map((item) =>(
                    <VentaRow fields={item} key={item.id} handleDelete={handleDelete} />
                ))
                }
                    </tbody>
                </table>
            </div>
            <Paginador />
        </main>
    )


}

export default Ventas