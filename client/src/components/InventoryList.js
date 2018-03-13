import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";

class InventoryList extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      key: "",
      currentPage: 1,
      assetsPerPage: 10,
      assets: {},
      assetsCount: 0,
      assetsToShow: {},
      searchAssets: {}
    };
  }
  async componentWillMount() {
    const payload = await axios.post("http://localhost:3000/api/getassets", {
      pageSize: this.state.assetsPerPage,
      pageNo: this.state.currentPage
    });
    const { assets, count } = payload.data;

    const start = 10 * (1 - 1);
    const end = 10 * this.state.currentPage;
    const assetsToShow = Object.entries(assets)
      .slice(start, end)
      .map(x => x[1]);
    this.setState({
      assets,
      assetsCount: count,
      assetsToShow
    });
  }
  /** (Description: This function moves next and previous pagination)
   *
   */
  handlePage = async e => {
    e.preventDefault();
    let page = this.state.currentPage;
    const searchAssets =
      !Object.keys(this.state.searchAssets).length === 0
        ? {}
        : { ...this.state.searchAssets };
    if (!(Object.keys(searchAssets).length === 0)) {
      const searchCount = Object.keys(this.state.searchAssets).length;
      const searchPages = Math.ceil(searchCount / this.state.assetsPerPage);
      if (e.target.name === "next" && this.state.currentPage >= searchPages)
        return;
      if (e.target.name === "previous" && this.state.currentPage <= 1) return;
      if (e.target.name === "next") page++;
      if (e.target.name === "previous") page--;
      this.assetsToDisplay(page, this.state.assetsPerPage, searchAssets);
      return;
    }
    const pages = Math.ceil(this.state.assetsCount / this.state.assetsPerPage);
    if (e.target.name === "next" && this.state.currentPage >= pages) return;
    if (e.target.name === "previous" && this.state.currentPage <= 1) return;
    if (e.target.name === "next") page++;
    if (e.target.name === "previous") page--;

    this.assetsToDisplay(page);
  };
  handleSearch = async e => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      const searchAssets = {};
      this.setState({ searchAssets });
      this.assetsToDisplay(1, 0, searchAssets);
      return;
    }
    const payload = await axios.post("http://localhost:3000/api/searchTerm", {
      searchTerm
    });
    const searchResults = { ...payload.data };
    this.setState({ searchAssets: searchResults });
    this.assetsToDisplay(1, 0, searchResults);
  };
  /** (Description: This function handles the size of the list to display)
    It receives the size value and updates the state.
    It then resets the current page to one
    Then it calls the assetsToDisplay with the parameters needed 
    to display the correct pageNo and count of items to display  **/

  handlePagingSize = async e => {
    const assetsPerPage = parseInt(e.target.value, 10);
    const currentPage = 1;
    const searchAssets = { ...this.state.searchAssets };
    if (!(Object.keys(searchAssets).length === 0)) {
      this.setState({ assetsPerPage, currentPage });
      this.assetsToDisplay(currentPage, assetsPerPage, searchAssets);
      return;
    }
    this.setState({ assetsPerPage, currentPage });
    this.assetsToDisplay(currentPage, assetsPerPage);
  };
  /** (Description: This function handles the data that needs to be displayed)
   * it verifies the size of the list, as well as the current page number.
   * It then sets the state for the list of assets that need to be shown.
   */
  assetsToDisplay = async (pageNo = 1, assetpp = 0, searchResults = {}) => {
    const assetsPerPage = assetpp ? assetpp : this.state.assetsPerPage;
    const start = assetsPerPage * (pageNo - 1);
    const end = assetsPerPage * pageNo;

    let assetsToDisplay = {};
    if (!(Object.keys(searchResults).length === 0)) {
      assetsToDisplay = { ...searchResults };
    }
    if (
      !(Object.keys(searchResults).length === 0) &&
      !(Object.keys(this.state.searchAssets).length === 0)
    ) {
      assetsToDisplay = { ...this.state.searchAssets };
    }
    if (Object.keys(assetsToDisplay).length === 0) {
      assetsToDisplay = { ...this.state.assets };
    }

    const assetsToShow = Object.entries(assetsToDisplay)
      .slice(start, end)
      .map(x => x[1]);

    this.setState({
      assetsToShow,
      currentPage: pageNo
    });
  };
  /** (Description: This function updates the state when an asset has been modified)
   * The function is passed down as a prop to the <Form /> component to update state when an asset has been edited  */
  updateState = asset => {
    const assets = { ...this.state.assets };
    assets[asset.ikey] = { ...asset };
    this.setState({ assets });
  };
  handleEdit = assetKey => {
    const currentMode = this.state.editing;
    this.setState({ editing: !currentMode, key: assetKey });
  };
  handleDelete = async assetKey => {
    const assetId = this.state.assets[assetKey]._id;
    const deletedAsset = await axios.post(
      "http://localhost:3000/api/deleteasset",
      { assetId }
    );
    const assets = { ...this.state.assets };
    delete assets[assetKey];
    this.setState({ assets });
  };

  hideOnSubmit = () => {
    this.setState({ editing: false, id: "" });
  };

  renderItemEdit = () => {
    if (this.state.editing)
      return (
        <Form
          {...this.state.assets[this.state.key]}
          editAsset={this.props.editAsset}
          hideOnSubmit={this.hideOnSubmit}
          ikey={this.state.key}
          updateState={this.updateState}
        />
      );
  };

  render() {
    const columnStyle = {
      paddingRight: "20px"
    };
    return (
      <React.Fragment>
        <form name="search" onSubmit={this.handleSearch}>
          <input
            onChange={this.handleSearch}
            name="search"
            placeholder="Search"
            type="text"
          />
          <button>find</button>
        </form>
        <table>
          <tbody>
            <tr>
              <th style={columnStyle}>Brand</th>
              <th style={columnStyle}>Item Type</th>
              <th style={columnStyle}>Model</th>
              <th style={columnStyle}>Green Tag</th>
              <th style={columnStyle}>Serial No.</th>
              <th style={columnStyle}>Item Status</th>
              <th style={columnStyle}>Location</th>
              <th style={columnStyle}>Assigned to</th>
              <th style={columnStyle}>Branch</th>
              <th style={columnStyle}>Comments</th>
              <th style={columnStyle}>Actions</th>
            </tr>
            {Object.keys(this.state.assetsToShow).map(assetKey => {
              const {
                assignedTo,
                assetType,
                brand,
                model,
                comment,
                status,
                serial,
                location,
                branch,
                greenTag
              } = this.state.assetsToShow[assetKey];

              return (
                <React.Fragment key={assetKey}>
                  <tr>
                    <td>{brand}</td>
                    <td>{assetType}</td>
                    <td>{model}</td>
                    <td>{greenTag}</td>
                    <td>{serial}</td>
                    <td>{status}</td>
                    <td>{location}</td>
                    <td>{assignedTo}</td>
                    <td>{branch}</td>
                    <td>{comment}</td>
                    <td>
                      <button onClick={() => this.handleEdit(assetKey)}>
                        Edit
                      </button>
                      |
                      <button onClick={() => this.handleDelete(assetKey)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div>
          <button name="previous" onClick={this.handlePage}>
            Previous Page
          </button>
          Current Page {this.state.currentPage}
          <button name="next" onClick={this.handlePage}>
            Next Page
          </button>
          <select onChange={this.handlePagingSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
        {this.renderItemEdit()}
      </React.Fragment>
    );
  }
}

export default InventoryList;
