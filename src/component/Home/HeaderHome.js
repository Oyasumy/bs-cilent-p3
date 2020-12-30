import React from "react";

const HeaderHome = () => {
  return (
    <>
      {/* <!-- HeaderHome --> */}
      <header id="header" class="header">
        <div class="header-content">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="text-container">
                  <h1>
                    BUSINESS <span id="js-rotating">TEMPLATE, SERVICES, SOLUTIONS</span>
                  </h1>
                  <p class="p-heading p-large">Aria is a top consultancy company specializing in business growth using online marketing and conversion optimization tactics</p>
                  <a class="btn-solid-lg page-scroll" href="#intro">
                    DISCOVER
                  </a>
                </div>
              </div>
              {/* <!-- end of col --> */}
            </div>
            {/* <!-- end of row --> */}
          </div>
          {/* <!-- end of container --> */}
        </div>
        {/* <!-- end of header-content --> */}
      </header>
      {/* <!-- end of header --> */}

      {/* <!-- end of header --> */}
    </>
  );
};

export default HeaderHome;
