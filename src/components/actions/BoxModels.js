import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Pondspopulation from "./Pondspopulation";

class Boxmodels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: this.props.data,
    };
  }

  handleInput = (event) => {
    let selected = { ...this.state.selected };
    selected = event.target.value;
    this.setState({ selected });
    return this.props.handleInput(event.target);
  };

  render() {
    let farmsmap = [];
      this.props.data.map((frm, i) =>
        farmsmap.push(
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
            key={i}
          >{frm.name}
            <Pondspopulation key={i} ponds={frm.ponds} parentFarm={frm.name} />
          </Grid>
        )
      );
    return (
      <div className="farm" style={{ padding: 5, flexGrow: 1 }}>
          {farmsmap}
        {/* <Grid item xs={6} sm={3}>
        </Grid> */}
      </div>
    );
  }
}
export default Boxmodels;