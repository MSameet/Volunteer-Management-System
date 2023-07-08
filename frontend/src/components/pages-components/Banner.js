import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="hero_section">
      <div className="container">
        <div className="hero_content">
          <h4>Join Us Today</h4>

          <h1>Give a little change a lot.</h1>
          <p>
            Help today because tomorrow you may be the one who needs helping!
            <br />
            Forget what you can get and see what you can give.
          </p>
          <Link to="/signup" className="default-btn">
            Join With Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
