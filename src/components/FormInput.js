import { useState, useEffect } from "react";
import "./FormInput.css"

function FormInput({name,type,errorMsj,regex,length = "", handleChange, formHandleBlur,formSuccess, value}) {
    

    const [validationResult, setValidationResult] = useState(null)



    const handleBlur = (e) =>{

        let pattern = new RegExp(regex);
        let value = e.target.value.trim()

        if(!value){
            setValidationResult({err:"El campo esta vacio"})
            formHandleBlur(e,true)//cuando hay error 
        }else if(!pattern.test(value)) {
            setValidationResult({err:errorMsj})
            formHandleBlur(e,true)//cuando hay error 
        } else{
            setValidationResult({succ:true})
            formHandleBlur(e,"")// cuando esta ok 
        }

                //aca arriba tengo que hacer una funcion que mande un error a la funcion formHandleBlur
    }


    useEffect(()=>{

        setValidationResult(null)

    },[formSuccess,value])

    return (
        <div>
            <label>
                {name[0].toUpperCase() + name.substring(1) + ":"}
            </label>
            <input
                className={ validationResult? validationResult.err?  "form-input-err"  : "form-input-ok"  : "" }
                type={type} 
                placeholder={name[0].toUpperCase() + name.substring(1)} 
                name={name}
                maxLength={length}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
            {validationResult && validationResult.err && <p className="input-err">{validationResult.err}</p> }
        </div>
    );
  }
  
  export default FormInput;