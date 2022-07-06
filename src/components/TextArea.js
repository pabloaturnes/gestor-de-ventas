import { useInputValidation } from "../hooks/useInputValidation";
import { useState, useEffect } from "react";
import "./FormInput.css"

function TextArea({name, rows, cols, handleChange, formHandleBlur,formSuccess, value}) {
    

    const [validationResult, setValidationResult] = useState(null)



    const handleBlur = (e) =>{

        let value = e.target.value.trim()

        if(!value){
            setValidationResult({err:"El campo esta vacio"})
            formHandleBlur(e,true)//cuando hay error 
        } else{
            setValidationResult({succ:true})
            formHandleBlur(e,"")// cuando esta ok 
        }

    }


    useEffect(()=>{

        setValidationResult(null)

    },[formSuccess,value])

    return (
        <div className="text-area">
            <label>
                {name[0].toUpperCase() + name.substring(1) + ":"}
            </label>
            <textarea
                className={ validationResult? validationResult.err?  "form-input-err"  : "form-input-ok"  : "" } 
                placeholder={name[0].toUpperCase() + name.substring(1)} 
                name={name}
                rows = {rows}
                cols = {cols}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
            {validationResult && validationResult.err && <p className="input-err">{validationResult.err}</p> }
        </div>
    );
  }
  
  export default TextArea;