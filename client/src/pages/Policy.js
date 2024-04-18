import React from "react";
import Layout from "./../components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title = {'Privacy Policy'}>
      <div className="row privacy_policy ">
        <div style={{ textAlign: 'center',  marginTop: '20px' }}>
          <h1>Privacy Policy</h1>
          <p>Thank you for visiting our website. Protecting your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website.
          By accessing or using our website, you consent to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our website.
          </p>
          <h5>1. Information We Collect</h5>
<p>
We may collect both personally identifiable information and non-personally identifiable information from you when you visit our website. The types of information we collect may include:
<br />Personal Information: This may include your name, email address, contact information, and any other information you voluntarily provide to us.
Log Data: We may collect information that your browser sends whenever you visit our website. This may include your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
Cookies: We may use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You have the option to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website
</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;