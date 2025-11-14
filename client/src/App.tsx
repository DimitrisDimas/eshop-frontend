import { useEffect, useState } from "react"
import type { Product } from "./app/models/product";

function App() {

  const [products, setProducts] = useState<Product[]>([]) ;

  /*
  useEffect(() => {
    const fetchData = async () => {
      
      try{
        const response = await fetch('http://localhost:8081/api/products') ;
        if(!response.ok){
          throw new Error('Failed to fetch the data');
        }

        const data = await response.json() ;
        setProducts(data.content) ;

      }catch(error){
        console.error('Error Fetching Data:', error) ;
      }
    };

    fetchData() ;
  }, []);
  */


  useEffect(() => {

    fetch('http://localhost:8081/api/products')
    .then(response => response.json())
    .then(data => setProducts(data.content));

  }, []);

  return (
    <div>
      <h1>Koutsianikoulis Sport</h1>
      
      {products.map(product => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}€</p>
          <p>Brand: {product.productBrand}</p>
          <p>Type: {product.productType}</p>
        </div>
      ))}

    </div>
      
  )
}

export default App
