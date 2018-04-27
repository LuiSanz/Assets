import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class InventoryDisplay extends React.Component {
  state = {
    data: [],
    assets: [],
    loading: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.assets)
      return {
        assets: nextProps.assets,
        data: nextProps.assets,
        loading: false
      };

    return null;
  }
  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand" // String-based value accessors!
      },
      {
        Header: "Type",
        accessor: "assetType" // String-based value accessors!
      },
      {
        Header: "Model",
        accessor: "model" // String-based value accessors!
      },
      {
        Header: "User",
        accessor: "assignedTo" // String-based value accessors!
      },
      {
        Header: "Green Tag",
        accessor: "greenTag" // String-based value accessors!
      },
      {
        Header: "Status",
        accessor: "status" // String-based value accessors!
      },
      {
        Header: "Branch",
        accessor: "branch" // String-based value accessors!
      },
      {
        Header: "Serial No.",
        accessor: "serial" // String-based value accessors!
      },
      {
        Header: "Comments",
        accessor: "comment" // String-based value accessors!
      },
      {
        Header: "Actions",
        accesor: ""
      }
    ];

    return (
      <ReactTable
        filterable
        data={this.state.data}
        columns={columns}
        loading={this.state.loading}
      />
    );
  }
}

export default InventoryDisplay;
