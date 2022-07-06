

const VentasAgregarTable = ({addCart, data}) =>{

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Foto</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((item,index) =>(
                        <tr key={index}>
                            <td>{item.nombre}</td>
                            <td>{item.marca}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.stock}</td>
                            <td>${item.precio}</td>
                            <td>
                                <img src={item.foto}></img>
                            </td>
                            <td>
                                <button
                                    className="add-to-cart"
                                    onClick={()=>addCart(item,index)}
                                    disabled={item.stock == 0? true : false}
                                >
                                        <i className="bi bi-bag-plus-fill" ></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
              </tbody>
            </table>
        </>
    )


}

export default VentasAgregarTable