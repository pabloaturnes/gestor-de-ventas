
import "./ProductosAgregar.css";
import FormInput from "./FormInput";
import TextArea from "./TextArea"
import FileInput from "./FileInput";
import { useFormValidation } from "../hooks/useFormValidation";
import { useLocation} from "react-router-dom";



function ProductosAgregar({title, successMsj, btnValue}) {


    const { search } = useLocation();
    const query = new URLSearchParams(search)
    
    let initialForm = {
        nombre : "",
        marca: "",
        descripcion : "",
        stock: 0,
        precio: 0,
        foto : ""
    }

    let initialErrors = {
        nombre : true,
        marca: true,
        descripcion : true,
        stock: true,
        precio: true
    }

    let id = ""
    let edit = false

    const collectionName = "productos"

    if(query.toString()){
         initialForm = {
            nombre : query.get("nombre"),
            marca: query.get("marca"),
            descripcion : query.get("descripcion"),
            stock: query.get("stock"),
            precio: query.get("precio"),
            foto : query.get("foto")
        }

        id = query.get("id");
        edit = true;

        initialErrors = {
            nombre : "",
            marca: "",
            descripcion : "",
            stock: "",
            precio: ""
        }
    }

    const {form, formSuccess, handleChange,formHandleBlur,handleSubmit} = useFormValidation(initialForm,initialErrors, id, edit,collectionName)  



    return (
        <main className="productos-agregar">
            <h2>{title}</h2>
            <form className="main-form" id="productosAgregar" onSubmit={ handleSubmit}>
                <FormInput name="nombre" type="text" length="20" errorMsj="Solo se permiten letras" regex={"^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"} handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.nombre} formSuccess={formSuccess} />
                <FormInput name="marca" type="text" errorMsj="Solo se permiten letras" regex={"^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"} length="20" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.marca} formSuccess={formSuccess} />
                <FormInput name="stock" type="number" regex={"[0-9]"} errorMsj="Solo se admiten numeros" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.stock} formSuccess={formSuccess}/>
                <FormInput name="precio" type="number" regex={"[0-9]"} errorMsj="Solo se admiten numeros" handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.precio} formSuccess={formSuccess}/>
                <TextArea  name="descripcion" cols={6} rows={4} handleChange={handleChange} formHandleBlur={formHandleBlur} value={form.descripcion} formSuccess={formSuccess} />
                <FileInput label="Fotografia del Producto" name="foto" foto={form.foto}  />
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
  
  export default ProductosAgregar;
