import React, { useState, useEffect } from "react";
import { UserMenu } from "../../components/Layouts/UserMenu";
import { useNavigate } from "react-router-dom";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import jsPDF from "jspdf";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Function to handle download
  const handleDownload = (order) => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    console.log(auth?.user)
 
    // Add content to the PDF
    pdf.text("Invoice",90,10)
    pdf.text("User Details", 20, 30);
    pdf.text(`Name: ${auth?.user?.name}`, 20, 40);
    pdf.text(`Address: ${auth?.user?.address}`, 20, 50);

    pdf.text("Order Details", 20, 70);
    pdf.text(`Order Number: ${order._id}`, 20, 80);
    pdf.text(`Status: ${order.status}`, 20, 90);
    pdf.text(`Buyer: ${order.buyer.name}`, 20, 100);
    pdf.text(`Date: ${moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`, 20, 110);
    pdf.text(`Payment Status: ${order.payment.success ? "Success" : "Failed"}`, 20, 120);
    pdf.text(`Quantity: ${order.products.length}`, 20, 130);
   

    pdf.text("Products:", 20, 150);
    let y = 160;
    order.products.forEach((product) => {
      pdf.text(`${product.name} - Price: ${product.price}`, 20, y);
      y += 10;
    });

    // Save the PDF as a Blob
    const pdfBlob = pdf.output("blob");

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(pdfBlob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `order_${order._id}.pdf`);

    // Simulate click on the link to trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };


  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {

              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Download</th> {/* Added for download button */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDownload(o)} // Pass the order to the function
                          >
                           Invoice
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
