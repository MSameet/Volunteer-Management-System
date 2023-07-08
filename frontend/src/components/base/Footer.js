import React from "react";
import logo from "../../assets/i/footer_logo.png";
// import { Autoplay } from "swiper";
// import InvozoneLogo from "../images/Logo.webp";
// import {Link} from 'react-router-dom';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <section className="section padding">
        <div className="container">
          <div className="col-lg-12 row">
            <div className="col-lg-4 xs-padding">
              <div className="widget_content">
                <img src={logo} alt="" />
                <p>
                  The secret to happiness lies in helping others. <br /> Never
                  underestimate the difference You can make in the lives of the
                  poor.
                </p>
              </div>
            </div>
            <div className="col-lg-4 xs-padding">
              <div className="widget_content">
                <h3>Recent Compaigns</h3>
                <ul className="widget_link">
                  <li>
                    <Link to="/">
                      First charity activity of this summer.{" "}
                      <span>-1 Year Ago</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Big charity: build school for poor children.{" "}
                      <span>-2 Year Ago</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Clean-water system for rural poor.{" "}
                      <span>-2 Year Ago</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Nepal earthqueak donation campaigns.{" "}
                      <span>-3 Year Ago</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 xs-padding">
              <div className="widget_content">
                <h3>Related Links</h3>
                <ul className="address">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">Events</Link>
                  </li>
                  <li>
                    <Link to="/">Volunteers</Link>
                  </li>
                  <li>
                    <Link to="/">Organizers</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 sm-padding">
              <div className="copyright">
                © 2021 Charitify Powered by DynamicLayers
              </div>
            </div>
            <div className="col-md-6 sm-padding">
              <ul className="footer_social">
                <li>
                  <Link to="/">Orders</Link>
                </li>
                <li>
                  <Link to="/">Terms</Link>
                </li>
                <li>
                  <Link to="/">Report Problem</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}

export default Footer;
