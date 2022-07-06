
function CartRow({fields, indice, deleteCart}) {

    return (
        <tr>
                <td>{fields.id}</td>
                <td>{fields.nombre}</td>
                <td>${fields.precio}</td>
                <td>
                    <button className="remove-from-cart" onClick={()=> deleteCart(indice,fields.id)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                </td>
        </tr>
    );
  }
  
  export default CartRow;
  