import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // using backend api
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const json = await res.json();
    setProducts(json?.products);
    setTotalPages(json.total / 10);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span key={product.id} className="App">
                <img src={product.thumbnail} alt={product.title} />
                <span className="title">{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {page > 1 ? (
            <span
              onClick={() => selectPageHandler(page - 1)}
              style={{ width: "10%", cursor: "pointer" }}
            >
              <LeftOutlined />
            </span>
          ) : (
            <span style={{ width: "10%" }}></span>
          )}

          <span style={{ width: "80%" }}>
            {[...Array(totalPages)].map((_, i) => (
              <span
                style={{ cursor: "pointer" }}
                className={[
                  page === i + 1 ? "pagination__selected" : "not_selected",
                ]}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            ))}
          </span>

          {page < totalPages ? (
            <span
              onClick={() => selectPageHandler(page + 1)}
              style={{ width: "10%", cursor: "pointer" }}
            >
              <RightOutlined />
            </span>
          ) : (
            <span style={{ width: "10%" }}></span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
