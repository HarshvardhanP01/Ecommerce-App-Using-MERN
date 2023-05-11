import React from 'react'
import Layout from '../components/Layouts/Layout'

const About = () => {
    return (
      <Layout title={"About us -Ecommerce App"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/about.jpeg"
              alt="contact_us"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">
              TE-11 (M11) WADL PROJECT USING MERN :<i class="fas fa-smile    "></i>
            </p>
          </div>
        </div>
      </Layout>
    );
  };

export default About