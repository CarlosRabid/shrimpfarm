import React from "react";
import {TextField, Tooltip} from "@material-ui/core";

class Size extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      ponds: this.props.data,
      open: false,
      indicator: "",
      parentFarm: "",
      name: "",
      size: this.props.data[0].size,
    };
  }

  update = async (event) => {
      console.log(event)
    await this.props.update(event)
  };

  render() {
    let pondslist = [];
    console.log(this.props.data)
        pondslist.push(<Tooltip title="hectares" placement="top-end">
        <TextField
          id="size"
          label="New Size"
          name="size"
          variant={"filled"}
          value={this.props.data[0].size}
          inputProps={this.state.size}
          onChange={this.update}
        //   inputProps={this.state.ponds[0].size} //, { maxLength: 5 }}
        />
      </Tooltip>)

    return (
      <>
        {pondslist}
      </>
    );
  }
}
export default Size;
