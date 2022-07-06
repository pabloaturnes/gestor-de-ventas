import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import ClienteRow from "./ClienteRow";
import Paginador from "./Paginador"
import "./Clientes.css"

function Clientes() {

const {data, error, loading, getData, deleteData} = useFirestore()
const navigate = useNavigate();

  useEffect(()=>{
    getData("clientes")
  },[])

const handleDelete = (id) =>{
  deleteData(id,"clientes")
}

const handleRedirect = (cliente) =>{
  navigate(`/clientes/editar?id=${cliente.id}&&nombre=${cliente.nombre}&&apellido=${cliente.apellido}&&dni=${cliente.dni}&&domicilio=${cliente.domicilio}&&email=${cliente.email}&&telefono=${cliente.telefono}&&`);
}

    return (
        <main>
            <h1>Estas en listado de clientes</h1>
            {loading && <p>Cargando...</p>}
            {error && <h2>Error en la peticion</h2>}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Direccion</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                {
                data.map((item,index) =>(
                  <ClienteRow fields={item} key={index} handleDelete={handleDelete} handleRedirect={handleRedirect} />
                ))
              }
                </tbody>
              </table>
            </div>
            <Paginador />
        </main>
    );
  }
  
  export default Clientes;
  