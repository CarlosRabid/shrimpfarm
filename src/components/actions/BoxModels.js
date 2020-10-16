import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Pondspopulation from "./Pondspopulation";

class Boxmodels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farms: this.props.data,
      size: this.props.size,
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
    let sizes = [...this.props.size];
    let objsize = sizes.reduce((obj, current, idx) => {
      return { ...obj, [current._id]: current.total };
    }, {});
    this.props.data === [] ? 
      farmsmap.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
        "No data found"
        </Grid>
      )
      : this.props.data.map((frm, i) =>
      farmsmap.push(
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
          key={i}
        >
          Name: {frm.name} & Size: {objsize[frm.name]}
          <Pondspopulation
            key={i}
            ponds={frm.ponds}
            parentFarm={frm.name}
          />
        </Grid>
      )
    );
    return (
      <div className="farm" style={{ padding: 5, flexGrow: 1 }}>
        {farmsmap}
      </div>
    );
  }
}
export default Boxmodels;
