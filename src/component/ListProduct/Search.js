import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Button, Icon, Input, Label } from "semantic-ui-react";

import * as actionProduct from "../../actions/book";

const Search = ({ actionProducts }) => {
  const [searchString, setSearchString] = useState("");

  const onSearchProduct = () => {
    console.log("ok");
    const { handleSetSearchString } = actionProducts;
    handleSetSearchString(searchString);
  };
  return (
    <header id="header" class="ex-header">
      <div class="container">
        <div class="row">
          <div class="col-md-12" style={{ justifyContent: "center", margin: "auto", maxWidth: "70%", display: "flex", justifyItems: "center" }}>
            <Input fluid placeholder="Search..." style={{ width: "100%" }} value={searchString} onChange={(e, { value }) => setSearchString(value)} />
            <Button as="div" labelPosition="left" style={{ marginLeft: "5px" }} onClick={() => onSearchProduct()}>
              <Label as="a" basic>
                SEARCH
              </Label>
              <Button icon>
                <Icon name="search" />
              </Button>
            </Button>
          </div>
          {/* <!-- end of col --> */}
        </div>
        {/* <!-- end of row --> */}
      </div>
      {/* <!-- end of container --> */}
    </header>
  );
};

const mapStateToProps = (state) => ({
  searchString: state.searchString.string,
});
const mapDispatchToProps = (dispatch) => ({
  actionProducts: bindActionCreators({ ...actionProduct }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Search);
