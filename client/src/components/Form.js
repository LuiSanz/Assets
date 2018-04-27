import React, { Component } from "react";
import axios from "axios";
class Form extends Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      assignedTo: "",
      assetType: "",
      brand: "",
      model: "",
      comment: "",
      status: "",
      serial: "",
      greenTag: "",
      branch: "",
      locationf: ""
    };
  }
  handleChange = e => {
    e.preventDefault();
    if (e.target.name === "brand") {
      this.setState({ brand: e.target.value });
      return;
    }
    if (e.target.name === "assetType") {
      this.setState({ assetType: e.target.value });
      return;
    }
    if (e.target.name === "assignedTo") {
      this.setState({ assignedTo: e.target.value });
      return;
    }
    if (e.target.name === "model") {
      this.setState({ model: e.target.value });
      return;
    }
    if (e.target.name === "comment") {
      this.setState({ comment: e.target.value });
      return;
    }
    if (e.target.name === "status") {
      this.setState({ status: e.target.value });
      return;
    }
    if (e.target.name === "serial") {
      this.setState({ serial: e.target.value });
      return;
    }
    if (e.target.name === "greenTag") {
      this.setState({ greenTag: e.target.value });
      return;
    }
    if (e.target.name === "branch") {
      this.setState({ branch: e.target.value });
      return;
    }
    if (e.target.name === "locationf") {
      this.setState({ locationf: e.target.value });
      return;
    }
  };
  handleForm = e => {
    e.preventDefault();
    const asset = {
      brand: this.state.brand,
      assetType: this.state.assetType,
      model: this.state.model,
      serial: this.state.serial,
      comment: this.state.comment,
      status: this.state.status,
      assignedTo: this.state.assignedTo,
      location: this.state.locationf,
      branch: this.state.branch,
      greenTag: this.state.greenTag,
      id: this.props._id,
      ikey: this.props.ikey
    };
    if (this.props.ikey) {
      this.props.editAsset(asset, this.props.hideOnSubmit);
      this.props.updateState(asset);
    }
    if (!this.props.ikey) {
      this.props.addAsset(asset);
    }
    this.setState({
      formData: {},
      assignedTo: "",
      assetType: "",
      brand: "",
      model: "",
      comment: "",
      status: "",
      serial: "",
      greenTag: "",
      branch: "",
      locationf: ""
    });
  };

  async componentWillMount() {
    const prom = await axios.get("http://localhost:3000/api/fetchformdata");
    this.setState({
      formData: prom.data
    });
    if (this.props.ikey) {
      this.setState({
        assignedTo: this.props.assignedTo,
        assetType: this.props.assetType,
        brand: this.props.brand,
        model: this.props.model,
        comment: this.props.comment,
        status: this.props.status,
        serial: this.props.serial,
        greenTag: this.props.greenTag,
        branch: this.props.branch,
        locationf: this.props.location
      });
    }
  }

  render() {
    const {
      assetTypes,
      brands,
      branches,
      locations,
      statuses
    } = this.state.formData;

    return (
      <div>
        <form onSubmit={this.handleForm}>
          <div>
            <div>
              <label>Select Brand:</label>
            </div>
            <select
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
            >
              <option />
              {brands &&
                Object.keys(brands).map(key => {
                  return (
                    <option key={brands[key]._id}>{brands[key].brand}</option>
                  );
                })}
            </select>
          </div>
          <div>
            <input
              value={this.state.model}
              type="text"
              placeholder="Model"
              onChange={this.handleChange}
              name="model"
            />
          </div>
          <div>
            <input
              value={this.state.greenTag}
              type="text"
              placeholder="Green Tag"
              name="greenTag"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <select
              name="assetType"
              value={this.state.assetType}
              onChange={this.handleChange}
            >
              <option />
              {assetTypes &&
                Object.keys(assetTypes).map(key => {
                  return (
                    <option key={assetTypes[key]._id}>
                      {assetTypes[key].assetType}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Serial Number"
              onChange={this.handleChange}
              value={this.state.serial}
              name="serial"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Assigned To"
              value={this.state.assignedTo}
              onChange={this.handleChange}
              name="assignedTo"
            />
          </div>
          <div>
            <select
              name="status"
              onChange={this.handleChange}
              value={this.state.status}
            >
              <option />
              {statuses &&
                Object.keys(statuses).map(key => {
                  return (
                    <option key={statuses[key]._id}>
                      {statuses[key].status}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select
              name="locationf"
              onChange={this.handleChange}
              value={this.state.locationf}
            >
              <option />
              {locations &&
                Object.keys(locations).map(key => {
                  return (
                    <option key={locations[key]._id}>
                      {locations[key].location}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select
              name="branch"
              onChange={this.handleChange}
              value={this.state.branch}
            >
              <option />
              {branches &&
                Object.keys(branches).map(key => {
                  return (
                    <option key={branches[key]._id}>
                      {branches[key].branch}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Comments"
              value={this.state.comment}
              onChange={this.handleChange}
              name="comment"
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
