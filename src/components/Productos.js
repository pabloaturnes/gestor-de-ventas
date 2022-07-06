import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import ProductoRow from "./ProductoRow";
import "./Productos.css"
import Paginador from './Paginador';

function Productos() {

const {data, error, loading, getData, deleteData} = useFirestore()
const navigate = useNavigate();

  useEffect(()=>{
    getData("productos")
  },[])

const handleDelete = (id,foto) =>{
  deleteData(id,"productos",foto)
}

const handleRedirect = (producto) =>{
  navigate(`/productos/editar?id=${producto.id}&&nombre=${producto.nombre}&&marca=${producto.marca}&&descripcion=${producto.descripcion}&&stock=${producto.stock}&&precio=${producto.precio}&&foto=${producto.foto}`);
}

    return (
        <main>
            <h1>Listado de productos</h1>
            {loading && <p>Cargando...</p>}
            {error && <h2>Error en la peticion</h2>}
            <div className="table-container">
              <table >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Descripcion</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Foto</th>
                    <th colSpan={1}>Accion</th>
                  </tr>
                </thead>
                <tbody>
                {
                data.map((item,index) =>(
                  <ProductoRow fields={item} key={index} handleDelete={handleDelete} handleRedirect={handleRedirect} />
                ))
              }
                </tbody>
              </table>
            </div>
            <Paginador />
        </main>
    );
  }
  
  export default Productos;
  