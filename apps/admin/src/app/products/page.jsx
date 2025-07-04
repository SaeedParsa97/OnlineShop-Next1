import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";



export default async function Products() {
  const response = await fetch(`http://localhost:3001/api/products`); //API_URL = http://localhost:3001 (.env.local)
  const products = await response.json();

  
  return(
    <div>
        <h1>This is product page</h1>
        <Link href="/products/new">
            <button>Add new product</button>
        </Link>

        <table>
            <thead>
                <tr>
                    <th>Product name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(
                        (product)=>(
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>
                                    <Link href={`/products/edit/${product._id}`}><FiEdit/></Link>
                                    <Link href={`/products/delete/${product._id}`}><FiTrash2/></Link>
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
