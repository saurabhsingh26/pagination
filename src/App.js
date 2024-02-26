import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const json = await res.json();
    setProducts(json?.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span key={product.id} className="App">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
