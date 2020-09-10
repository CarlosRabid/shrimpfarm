import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class Pondspopulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ponds: this.props.ponds,
    };
  }

  handleInput = (event) => {
    let selected = { ...this.state.selected };
    selected = event.target.value;
    this.setState({ selected });
    return this.props.handleInput(event.target);
  };

  render() {
    let pondsinfo = [];
    this.state.ponds.map((pnd) => {
      this.props.parentFarm === pnd.parentFarm
        ? pondsinfo.push(
            <div className="farm1">
              <Grid item xs={6}>
        <Paper style={{ spacing: 4 }}>{pnd.name}</Paper>
              </Grid>
            </div>
          )
        : pondsinfo.push(<div></div>)
        });

    return pondsinfo;
  }
}
export default Pondspopulation;
