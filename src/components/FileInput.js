
import { useState } from "react";


function FileInput({label, name, foto}) {
    
    const [fileUrl, setFileUrl] = useState(foto)
    

    const handleChange = async (e) =>{



        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onload = function (oFREvent) {
            const fileUrl1 = oFREvent.target.result;
            setFileUrl(fileUrl1) ;
        };
        

    }


    return (
        <div className="file-input">
            <label>
                {label[0].toUpperCase() + label.substring(1) + ":"}
            </label>
            <input type="file" name={name} accept="image/png, image/jpeg" onChange={handleChange}></input>
            {fileUrl && <img src={fileUrl}></img>}
        </div>
    );
  }
  
  export default FileInput;