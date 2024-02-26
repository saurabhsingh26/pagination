import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const json = await res.json();
    setProducts(json?.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span key={product.id} className="App">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          )}

          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          {page < products.length / 10 && (
            <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
