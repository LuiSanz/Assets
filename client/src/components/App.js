import React from "react";
import { Route, Link } from "react-router-dom";
import { render } from "react-dom";
import Home from "./Home";
import Form from "./Form";
import InventoryList from "./InventoryList";
import axios from "axios";
import InventoryDisplay from "./InventoryDisplay";

class App extends React.Component {
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
    const payload = await axios.post("http://localhost:3000/api/getassets");
    const { assets } = payload.data;
    this.setState({ assets });
  }
  //This function adds a new item
  addAsset = async item => {
    const assets = { ...this.state.assets };
    const timeStamp = Date.now();

    const savedItem = await axios.post("http://localhost:3000/api/saveform", {
      ...item
    });
    assets[`item-${timeStamp}`] = savedItem.data.newAsset;

    this.setState({ assets });
  };
  editAsset = async (asset, hideForm) => {
    const newasset = await axios.post("http://localhost:3000/api/editasset", {
      ...asset
    });

    const assets = { ...this.state.inventory.assets };
    assets[asset.ikey] = { ...newasset.data.updatedAsset };
    this.setState({ inventory: { assets } });
  };

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div>
          <Link to="/Form"> Form</Link>
        </div>
        <div>
          <Link to="/InventoryList"> Inventory List</Link>
        </div>

        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/Form"
          render={() => {
            return <Form addAsset={this.addAsset} />;
          }}
        />
        <Route
          exact
          path="/InventoryList"
          render={() => {
            return <InventoryDisplay assets={this.state.assets} />;
          }}
        />
      </div>
    );
  }
}

export default App;
