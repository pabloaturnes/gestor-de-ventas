
function VentaRow({fields, handleDelete}) {

    return (
        <tr>
                <td>{fields.id}</td>
                <td>
                    {fields.productos.map((producto,index) => <div key={index}>{producto.nombre}</div>)}
                </td>
                <td>${fields.total}</td>
                <td>
                    <div className="ventas-buttons-container">
                        <button className="delete-venta" onClick={()=> handleDelete(fields.id)}>
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="see-venta" >
                            <i className="bi bi-eye-fill"></i>
                        </button>
                    </div>
                </td>
        </tr>
    );
  }
  
  export default VentaRow;
  