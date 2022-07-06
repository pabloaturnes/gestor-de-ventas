
import { useNavigate } from "react-router-dom";
import "./Paginador.css"

const Paginador = () =>{

    const navigate = useNavigate();


    
    return (
        <div className="paginador">
              <button className="next-page">Previous</button>
              <button className="actual-page">1</button>
              <button className="previous-page">Next</button>
        </div>
    )


}

export default Paginador