
function ClienteRow({fields, handleDelete,handleRedirect}) {

    return (
        <tr>
                <td>{fields.nombre}</td>
                <td>{fields.apellido}</td>
                <td>{fields.dni}</td>
                <td>{fields.domicilio}</td>
                <td>{fields.email}</td>
                <td>{fields.telefono}</td>
                <td>
                    <div className="clients-buttons-container">
                        <button className="delete-client" onClick={ () => handleDelete(fields.id)}>
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="edit-client" onClick={ ()=> handleRedirect(fields)}>
                            <i className="bi bi-pencil"></i>
                        </button>
                    </div>
                </td>
        </tr>
    );
  }
  
  export default ClienteRow;
  