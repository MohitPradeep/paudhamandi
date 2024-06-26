import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">  ₹ {p.price}</p>
                    <p className="card-text">
                    {p?.quantity === 0 ? (
                    <h3 style={{ color: "red" }}>Out of Stock</h3>
                    ) : (
                   <h3 style={{ color: "green" }}>In Stock</h3>
                    )}
                    </p>
                    <p className="card-text"> {[1, 2, 3, 4, 5].map((r) => {
                if (r <= p?.rating) {
                if (r === Math.floor(p?.rating)) {
        
                return "⭐";
                } else if (p?.rating - r > 0.5) {
     
                return "⭐";
                }
               }
  
               return "☆";
               })}
              ({p?.numReviews})
               </p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
  className="btn btn-dark ms-1"
  onClick={() => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item._id === p._id);
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increase its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Quantity Updated in cart");
    } else {
      // If the product is not in the cart, add it to the cart
      setCart([...cart, { ...p, quantity: 1 }]);
      localStorage.setItem("cart", JSON.stringify([...cart, { ...p, quantity: 1 }]));
      toast.success("Item Added to cart");
    }
  }}
>
  ADD TO CART
</button>

                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;