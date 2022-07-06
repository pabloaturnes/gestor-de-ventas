

import VentasAgregarTable from "./VentasAgregarTable";
import CartRow from "./CartRow";
import Paginador from "./Paginador"
import {useState, useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore"
import { writeBatch, doc } from "firebase/firestore"
import { db } from "../firebase"
import "./VentasAgregar.css";
import { async } from "@firebase/util";



function VentasAgregar() {

    const {data, setData, addData,updateData, getData} = useFirestore()
    const [cart, setCart] = useState([])
    const [msj, setMsj] = useState(null)

    useEffect(()=>{ 
        getData("productos")
    },[])

    const addCart = (product,index) =>{

        // tiene que restar en 1 el producto: 
        let restarProducto = Object.assign({},product) // copio el objeto
        restarProducto.stock = restarProducto.stock - 1 //le resto uno a stock

        let newProductsData = [...data] //copio el array de datos
        newProductsData[index] = restarProducto // reemplazo el producto que se modificó

        setData(newProductsData) //cambio el estado
   
        setMsj({})

        // actualiza estado de cart
        let newArray = [...cart,product]
        setCart(newArray)
    }

    const deleteCart = (index, id) =>{

        const productoARestar = data.find(product => product.id == id);
        productoARestar.stock = productoARestar.stock + 1

        let newProductsData = [...data, productoARestar] //copio el array de datos y lo combino con el nuevo producto
        setData(newProductsData) //cambio el estado



        let cartCopy = [...cart]
        cartCopy.splice(index,1)
        setCart(cartCopy)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        let productosVendidos = { productos : cart } // crea un objeto con el parametro productos = a lo que contiene el carrito
        let total = { total : cart.reduce((acum,actual) =>{ return acum + parseInt(actual.precio)},0 ) } // crea un objeto con el parametro total = a la suma de los precios de los productos del carrito
        let objCart = Object.assign({}, productosVendidos, total) // combina los dos objetos anteriores en uno nuevo
        objCart = Object.assign(objCart,total)


        //actualizo los stocks de cada producto que hay en la venta
        updateStock(objCart)

        //agrego la venta en la base de datos
        addData(objCart,"ventas") 
        setCart([])
        getData()
        setMsj({succ: true})
    }

    const updateStock = async ( objCart) =>{
        const batch = writeBatch(db);
        objCart.productos.forEach(producto =>{
            const docRef = doc(db, "productos", producto.id);
            batch.update(docRef, {"stock": producto.stock-1});
        })
        await batch.commit();

    }


    return (
        <main className="ventas-agregar">
            <h2>Registra una nueva venta</h2>
            <div className="table-container">
                <VentasAgregarTable addCart={addCart} data={data} />
            </div>

            <Paginador />

            <div>
                {msj && msj.succ && <p className="form-succ">La venta se ha registrado exitosamente!</p>}
            </div>

            {cart.length != 0? (
                <>
                <h2>Productos en el carrito</h2>
                <div className="table-container">
                    <table className="cart">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Producto</td>
                                <td>Precio</td>
                                <td></td>
    
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((product,index) => <CartRow key={index} fields={product} deleteCart={deleteCart} indice={index}  />)
                            }
                        </tbody>
                    </table>
                </div>
                
                <h2 className="total-compra">El total de la compra es: ${cart.reduce((acum,actual) =>{ return acum + parseInt(actual.precio)},0 )}</h2>
                
                <form className="main-form" id="VentasAgregar" onSubmit={handleSubmit}>
                <input className="ventas-submit" type="submit" value="Registrar"/>      
            </form>
                </>
            ): ("")}
            
            
            
        </main>
    );
}
  
  export default VentasAgregar;
