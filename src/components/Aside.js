import { Link } from "react-router-dom";
import "./Aside.css"


document.addEventListener("click", (e)=>{
    if(e.target.matches(".link-button")){
        e.target.classList.toggle("button-active")
        e.target.nextSibling.classList.toggle("active")
        e.target.lastElementChild.classList.toggle("icon-rotate")
    }  
})



function Aside() {
    return (
        <aside>
            <div>
                <Link to="/"> <i className="bi bi-house-door-fill"></i> Home</Link>
            </div>

            <div>
                <button className="link-button"> <i className="bi bi-people-fill"></i> Clientes <i className="bi bi-arrow-right-circle-fill"></i> </button>
                <div className="links-container">
                <Link to="/clientes/listado">Listado</Link>
                <Link to="/clientes/agregar">Agregar</Link>
                </div>
                <button className="link-button"> <i className="bi bi-gift-fill"></i> Productos <i className="bi bi-arrow-right-circle-fill"></i> </button>
                <div className="links-container">
                <Link to="/productos/listado">Listado</Link>
                <Link to="/productos/agregar">Agregar</Link>
                </div>
                <button className="link-button"> <i className="bi bi-cart-check-fill"></i> Ventas <i className="bi bi-arrow-right-circle-fill"></i> </button>
                <div className="links-container">
                <Link to="/ventas/listado">Listado</Link>
                <Link to="/ventas/agregar">Agregar</Link>
                </div>
            </div>

            
            
        </aside>
    );
  }
  
  export default Aside;
  