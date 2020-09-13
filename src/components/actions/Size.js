import React from "react";
import {FilledInput, TextField, Tooltip} from "@material-ui/core";

class Size extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ponds: this.props.data,
      open: false,
      indicator: "",
      parentFarm: "",
      name: "",
      // size: "",
      // size: this.props.data[0].size || this.props.size,
      size: (this.props.size || this.props.data[0].size),
    };
  }

  // async componentDidUpdate() {
  //     console.log(this.props.data[0].size)
  //     let type = "size"
  //     // this.props.handleInputSize(this.props.data[0].size)
  // }

  handleInputSize = async (event) => {
    let value={...this.state.size}
    // let type = event.target.name
    value = event.target.value
    await this.props.handleInputSize(value)
    // return this.setState({size: value})
  };

  render() {
    let pondslist = [];
    console.log(this.props.size)
        pondslist.push(<Tooltip title="hectares" placement="top-end">
        <FilledInput
          id="size"
          label="New Size"
          name="size"
          variant="filled"
          // defaultValue={this.props.data[0].size}
          placeholder={this.props.data[0].size}
          value={this.props.size}
          // inputProps={this.props.data[0].size}
          onChange={this.handleInputSize}
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
