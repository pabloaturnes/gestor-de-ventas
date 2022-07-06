import FormInput from "./FormInput";
import "./ClientesAgregar.css";
import { useFormValidation } from "../hooks/useFormValidation";
import { useLocation} from "react-router-dom";





function ClientesAgregar({title, successMsj, btnValue}) {


    const { search } = useLocation();
    const query = new URLSearchParams(search)
    
    let initialForm = {
        nombre : "",
        apellido: "",
        dni : "",
        domicilio: "",
        telefono: "",
        email : ""
    }

    let initialErrors = {
        nombre : true,
        apellido: true,
        dni : true,
        domicilio: true,
        telefono: true,
        email : true
    }

    let id = ""
    let edit = false

    const collectionName = "clientes"

    if(query.toString()){
         initialForm = {
            nombre : query.get("nombre"),
            apellido: query.get("apellido"),
            dni : query.get("dni"),
            domicilio: query.get("domicilio"),
            telefono: query.get("telefono"),
            email : query.get("email")
        }

        id = query.get("id")
        edit = true

        initialErrors = {
            nombre : "",
            apellido: "",
            dni : "",
            domicilio: "",
            telefono: "",
            email : ""
        }
    }




    const {form, formSuccess, handleChange,formHandleBlur,handleSubmit} = useFormValidation(initialForm,initialErrors, id, edit,collectionName)  


    return (
        <main className="clientes-agregar">
            <h2>{title}</h2>
            <form className="main-form" id="clientesAgregar" onSubmit={handleSubmit}>
                <FormInput name="nombre" type="text" length="20" errorMsj="Solo se permiten letras" regex={"^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"} handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.nombre} formSuccess={formSuccess} />
                <FormInput name="apellido" type="text" errorMsj="Solo se permiten letras" regex={"^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"} length="20" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.apellido} formSuccess={formSuccess}  />
                <FormInput name="dni" type="number" regex={"^[0-9]{8}$"} errorMsj="D.N.I. incorrecto" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.dni} formSuccess={formSuccess}/>
                <FormInput name="domicilio" type="text" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.domicilio} formSuccess={formSuccess} />
                <FormInput name="email" type="text" regex={"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"}  errorMsj="Email incorrecto" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.email} formSuccess={formSuccess} />
                <FormInput name="telefono" type="number"regex={"^[0-9]{10}$"} errorMsj="Telefono incorrecto" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.telefono} formSuccess={formSuccess} />
                <div>
                    <input type="submit" value={btnValue}/>
                    <div>
                        {formSuccess.err && <p className="form-err">Debe completar correctamente todos los campos</p>}
                        {formSuccess.succ && <p className="form-succ">{successMsj}</p>}
                    </div>      
                </div>
            </form>
        </main>
    );
  }
  
  export default ClientesAgregar;


