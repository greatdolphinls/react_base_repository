import React from 'react';

const Home = () => {
  return(
    <div>
      <header className="masthead text-center text-white d-flex">
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1 className="text-uppercase">
                <strong>Your Favorite Source of Free Bootstrap Themes</strong>
              </h1>
              <hr />
            </div>
            <div className="col-lg-8 mx-auto">
              <p className="text-faded mb-5">Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>
              <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;