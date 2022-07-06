import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Clientes from "./components/Clientes";
import ClientesAgregar from "./components/ClientesAgregar";
import Productos from "./components/Productos";
import ProductosAgregar from "./components/ProductosAgregar"
import Header from "./components/Header";
import Aside from "./components/Aside";

import "./App.css"
import Ventas from "./components/Ventas";
import VentasAgregar from "./components/VentasAgregar";


function App() {


  return (
    <>
    <Header/>
    <Aside />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="clientes/listado" element={<Clientes />} />
      <Route path="clientes/agregar" element={<ClientesAgregar title={"Registrar Nuevo Cliente"} successMsj="El cliente se ha agregado exitosamente" btnValue="Registrar" />} />
      <Route path="clientes/editar" element={<ClientesAgregar title={"Editar Cliente"} successMsj="El cliente se ha editado exitosamente" btnValue="Editar" />} />
      <Route path="productos/listado" element={<Productos />} />
      <Route path="productos/agregar" element={<ProductosAgregar title={"Registrar Nuevo Producto"} successMsj="El Producto se ha agregado exitosamente" btnValue="Registrar" />}  />
      <Route path="productos/editar" element={<ProductosAgregar title={"Editar Producto"} successMsj="El Producto se ha editado exitosamente" btnValue="Editar" />} />
      <Route path="ventas/listado" element={<Ventas />} />
      <Route path="ventas/agregar" element={<VentasAgregar  />} />
    </Routes>
    </>
  );
}

export default App;
