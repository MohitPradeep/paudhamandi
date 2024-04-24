// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layouts/Layout";
// import axios from "axios";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/CategoryProductStyles.css"
// import Products from "./Admin/Products";
// const ProductDetails = () => {
//   const [cart, setCart] = useCart();
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //initalp details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);
//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className="row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top"
//             alt={product.name}
//             height="400"
//             width={"300px"}
//           />
//         </div>
//         <div className="col-md-6 ">
//           <h1 className="text-center">Product Details</h1>
//           <h6>Name : {product.name}</h6>
//           <h6>Description : {product.description}</h6>
//           <h6>Price : ₹ {product.price}</h6>
//           <h6>Category : {product?.category?.name}</h6>
//           <button className="btn btn-dark ms-1"
//           onClick={() => {
//             setCart([...cart, product]);
//             localStorage.setItem(
//               "cart",
//               JSON.stringify([...cart, product])
//             );
//             toast.success("Item Added to cart");
//           }}>
//                 ADD TO CART
//           </button>
//         </div>
//   </div> 
//       <hr />
//       <div className="row container">
//         <h6>Similar Products</h6>
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products found</p>
//         )}
//         <div className="d-flex flex-wrap">
//           {relatedProducts?.map((p) => (
//             <div className="card m-2" style={{ width: "18rem" }}>
//               <img
//                 src={`/api/v1/product/product-photo/${p?._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text"> ₹ {p.price}</p>
//                 <button
//                   className="btn btn-primary ms-1"
//                   onClick={() => navigate(`/product/${p.slug}`)}
//                 >
//                   More Details
//                 </button>
                      
//                 <button class="btn btn-secondary ms-1"
//                 onClick={() => {
//                   setCart([...cart, p]);
//                   localStorage.setItem(
//                     "cart",
//                     JSON.stringify([...cart, p])
//                   );
//                   toast.success("Item Added to cart");
//                 }}>ADD TO CART</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Rate } from "antd"; // Import Rate component for rating
import "../styles/CategoryProductStyles.css";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [review, setReview] = useState(""); // State for review
  const [rating, setRating] = useState(0); // State for rating

  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Initialize details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle review text change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Submit review and rating
  const submitReview = async () => {
    try {
      await axios.put(`/api/v1/product/review/${product._id}`, {
        review,
        rating,
      });
      toast.success("Review submitted successfully");
      // Refresh product details after submitting review
      getProduct();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  // Toggle display of reviews
  const toggleReviews = () => {
    setShowReviews(!showReviews);
    if (!showReviews) {
      // Fetch reviews if not already fetched
      fetchReviews();
    }
  };

  // Fetch reviews from database
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/review/${product._id}`);
      setReviews(data?.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400"
            width={"300px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹ {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
         
          {/* Rating UI */}
          <div className="text-center">
            <Rate value={product.avgRating} disabled />
          </div>
          {/* Review and Rating input */}
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Enter your review"
            className="form-control ms-1"
          />
          <div className="text-center">
            <Rate value={rating} onChange={handleRatingChange} />
          </div>
          <button
            className="btn btn-dark ms-1"
            onClick={submitReview}
          >
            Submit Review
          </button>
          <button className="btn btn-dark ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast.success("Item Added to cart");
            }}>
            Add to Cart
          </button>
          {/* Button to show/hide reviews */}
          <button className="btn btn-primary ms-1" onClick={toggleReviews}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
          {/* Display reviews if showReviews is true */}
          {showReviews && (
            <div>
              <hr />
              <h6>Reviews:</h6>
              {reviews.length === 0 ? (
                <p>No reviews available</p>
              ) : (
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id}>
                      <p>{review.review}</p>
                      <p>
                        {[1, 2, 3, 4, 5].map((r) => {
                          return r <= review.rating ? '⭐' : '☆';
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> ₹ {p.price}</p>
                <p className="card-text">
                    {p?.quantity === 0 ? (
                    <h3 style={{ color: "red" }}>Out of Stock</h3>
                    ) : (
                   <h3 style={{ color: "green" }}>In Stock</h3>
                    )}
                  </p>
                <p className="card-text">
                  {[1, 2, 3, 4, 5].map((r) => {
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
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
