import React from "react";
import Layout from "./../components/Layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title = {'Contact Us'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any query or info about product, feel free to contact us.
          </p>
          <p className="mt-3">
            <BiMailSend /> : help247@paudhamandi.in
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 7488829332
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-5487-2457 (Toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;