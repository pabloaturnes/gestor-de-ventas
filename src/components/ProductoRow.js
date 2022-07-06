
function ProductoRow({fields, handleDelete,handleRedirect}) {

    return (
        <tr> 
                <td>{fields.id}</td>
                <td>{fields.nombre}</td>
                <td>{fields.marca}</td>
                <td>
                    <div className="producto-descripcion">
                        <p>{fields.descripcion}</p>
                    </div>
                </td>
                <td>{fields.stock}</td>
                <td>${fields.precio}</td>
                <td>
                    <img src={fields.foto} />
                </td>
                <td>
                    <div className="products-buttons-container">
                        <button className="delete-product" onClick={ () => handleDelete(fields.id,fields.foto)}>
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="edit-product" onClick={ ()=> handleRedirect(fields)}>
                            <i className="bi bi-pencil"></i>
                        </button>
                    </div>
                </td>
        </tr>
    );
  }
  
  export default ProductoRow;
  