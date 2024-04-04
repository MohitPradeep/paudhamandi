import React from "react";
import Layout from "./../components/Layouts/Layout";

const About = () => {
  return (
    <Layout title = {'about us - Paudha Mandi'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          At Paudha Mandi, we're passionate about cultivating connections between 
          plant enthusiasts, nurseries, and green businesses worldwide. 
          Our platform offers a seamless digital marketplace where users can 
          discover, buy, and sell a diverse array of plants, gardening supplies, 
          and related products. Whether you're a seasoned gardener, a budding 
          plant parent, or a business looking to expand your reach, Paudha Mandi
           provides a vibrant community and robust e-commerce infrastructure to 
           support your green journey. Join us in fostering a greener, more 
           connected world through plants.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;