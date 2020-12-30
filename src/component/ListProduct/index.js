import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Grid, List, Pagination, Select } from "semantic-ui-react";

// import SingleProductCard from "../Home/SingleProductCard";
import Content from "./Content";
import NavBarList from "./NavBarList";
import CopyRight from "../Home/CopyRight";
import ListCard from "./List";
import NavBarDetail from "../Detail/NavBarDetail";
import { loadAuthor, loadCategory, loadData } from "../../commons/callApi";
import * as actionProduct from "../../actions/book";

const ListProduct = ({ productState, authorState, cateState, actionProducts, searchString }) => {
  const [product, setProduct] = useState(productState);
  // Sort
  const [activeAuthor, setActiveAuthor] = useState("");
  const [activeCate, setActiveCate] = useState("");
  const [activePrice, setActivePrice] = useState([0, 9999]);

  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(6);
  const [pageNumber, setPageNumber] = useState(0);
  // console.log(product, productState);
  const countryOptions = [
    { key: "1", value: 1, text: "< 50$" },
    { key: "2", value: 2, text: "from 50$ to 100$" },
    { key: "3", value: 3, text: "from 100$ to 200$" },
    { key: "4", value: 4, text: "All" },
  ];

  // function
  const { handleSetProducts, handleSetAuthors, handleSetCategories } = actionProducts;
  useEffect(() => {
    initData();
  }, []);

  // Sort data with search string
  useEffect(() => {
    const newPro = productState.filter((a) => a.NameAuthor.includes(searchString) || a.NameCategory.includes(searchString) || a.NameProduct.includes(searchString));
    setProduct(newPro);
  }, [searchString]);

  // load data
  const initData = async () => {
    // Load books
    const resB = await loadData();
    if (resB) {
      handleSetProducts(resB);
    }
    // Load Author
    const resA = await loadAuthor();
    if (resA) {
      handleSetAuthors(resA);
    }
    // Load Category
    const resC = await loadCategory();
    if (resC) {
      handleSetCategories(resC);
    }
  };

  // Sort
  const sortByAuthor = (name) => {
    if (activeAuthor === name) {
      setActiveAuthor("");
      return;
    }
    setActiveAuthor(name);
    // console.log(newPro);
  };

  const sortByCate = (name, i) => {
    if (activeCate === name) {
      setActiveCate("");
      return;
    }
    setActiveCate(name);
  };
  const sortByPrice = (value) => {
    if (parseInt(value) === 1) {
      setActivePrice([0, 50]);
    } else if (parseInt(value) === 2) {
      setActivePrice([50, 100]);
    } else if (parseInt(value) === 3) {
      setActivePrice([100, 200]);
    } else {
      setActivePrice([0, 9999]);
    }
  };

  // Sort new Product with condition
  useEffect(() => {
    const newPro = productState.filter((a) => a.NameAuthor.includes(activeAuthor) && a.NameCategory.includes(activeCate) && a.PriceProduct >= activePrice[0] && a.PriceProduct <= activePrice[1]);
    setProduct(newPro);
  }, [activeAuthor, activeCate, productState, activePrice]);

  // Pagination
  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(product.length / postPage));
  }, [product, pageNumber, postPage]);

  // Set current page
  const handlePagination = (data) => {
    setCurrentPage(data.activePage);
  };

  // components
  const showList = (arr) => {
    var result = null;
    result = arr.map((pro, i) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-6 col-sx-12">
          {/* <SingleProductCard product={pro} /> */}
          <ListCard product={pro} />
        </div>
      );
    });
    return result;
  };

  var hideData = [...product];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = hideData.splice(indexOfFirstPost, postPage);
  return (
    <>
      <NavBarDetail />
      <Content />

      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4} style={{ padding: "30px" }}>
            <h3>Author</h3>
            <List>
              {authorState
                ? authorState.map((au, i) => {
                    var active = activeAuthor ? (activeAuthor === au.NameAuthor ? { backgroundColor: " #FF9800", padding: " 5px", borderRadius: "10px", width: "fit-content", color: "white", fontWeight: 900 } : null) : null;
                    return (
                      <List.Item key={i} style={active} onClick={() => sortByAuthor(au.NameAuthor)}>
                        {au.NameAuthor}
                      </List.Item>
                    );
                  })
                : null}
            </List>
            <h3>Category</h3>
            <List>
              {cateState
                ? cateState.map((au, i) => {
                    var active = activeCate ? (activeCate === au.NameCategory ? { backgroundColor: " #FF9800", padding: " 5px", borderRadius: "10px", width: "fit-content", color: "white", fontWeight: 900 } : null) : null;

                    return (
                      <List.Item key={i} style={active} onClick={() => sortByCate(au.NameCategory)}>
                        {au.NameCategory}
                      </List.Item>
                    );
                  })
                : null}
            </List>
            <h3>Price</h3>
            <Select placeholder="Select your Price" options={countryOptions} onChange={(e, { value }) => sortByPrice(value)} />
          </Grid.Column>
          <Grid.Column width={12}>
            {/* // Card */}
            {/* <Grid columns="three" style={{ display: "flex", justifyContent: "center" }}>
              <Grid.Row>{product ? showList(currentPost) : null}</Grid.Row>
            </Grid> */}
            <div className="row">{product ? showList(currentPost) : null}</div>
            {/* // End Card */}
            <Pagination defaultActivePage={currentPage} pointing secondary totalPages={pageNumber} onPageChange={(e, d) => handlePagination(d)} style={{ display: "flex", justifyContent: "center", marginTop: "3em" }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <CopyRight />
    </>
  );
};

const mapStateToProps = (state) => ({
  productState: state.productList.data,
  authorState: state.authorList.data,
  cateState: state.categoryList.data,
  searchString: state.searchString.string,
});
const mapDispatchToProps = (dispatch) => ({
  actionProducts: bindActionCreators({ ...actionProduct }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ListProduct);
