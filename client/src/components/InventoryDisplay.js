import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class InventoryDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: props.assets
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.assets !== prevState.assets) {
      return { assets: nextProps.assets };
    }
    return null;
  }
  render() {
    const data = [...this.state.assets];

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

    return <ReactTable filterable data={data} columns={columns} />;
  }
}

export default InventoryDisplay;
