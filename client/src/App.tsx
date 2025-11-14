import { useState } from "react"

function App() {

  const [products, setProducts] = useState([
    {id: 1, name: 'Product 1', price: 10},
    {id: 2, name: 'Product 2', price: 20},
    {id: 3, name: 'Product 3', price: 30},
  ]);

  return (
    <div>
      <h1>Koutsianikoulis Sport</h1>
      
      {products.map(product => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}€</p>
        </div>
      ))}

    </div>
      
  )
}

export default App
