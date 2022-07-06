import { useState } from "react"

export const useInputValidation = (regex) =>{

    const [inputSuccess, setInputSuccess] = useState(false)
    const [inputError,setInputError] = useState(false)


    return {
        inputSuccess,
        inputError
    }


}