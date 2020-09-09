import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropAlt, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  InputLabel,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "@material-ui/lab/ToggleButton";

class Editable extends React.Component {
  constructor(props) {
    super(props);
    let data = JSON.parse(this.props.data);
    this.state = data;
  }
  closeEdit = () => {
    this.props.closeEdit();
  };
  handleInput = (event) => {
    let color = { ...this.state.color };
    color = event;
    return this.setState(color);
  };

  update = async (event) => {
    let type = event.target.id;
    if (type === "undefined") {
      return;
    } else {
      let value = event.target.value;
      await this.setState({
        [type]: value,
      });
    }
  };
  updateFarm = async (_id, name) => {
    await this.props.updateEvent(_id,name);
    return;
  };

  pushData = async (name, ponds, indicator, size, parentFarm) => {
    await this.props.pushData(name, ponds, indicator, size, parentFarm);
    return;
  };

  deleteItemfromDB = async (event) => {
    await this.props.deleteItemfromDB(this.state.name);
    return;
    // return
  };
  indicatorSelector = async (event) => {
    console.log(event.target.id);
    let indicator = { ...this.state.indicator };
    if (event.target.id === "Farm") {
      indicator = "Farm";
      return this.setState({
        indicator: indicator,
      });
    } else {
      return this.setState({
        indicator: indicator,
      });
    }
  };
  updateAction = async (e) => {
    if (
      window.confirm(
        `You will update your changes, please confirm: `
      )
    ) {
      await this.pushData(
        this.state.name,
        this.state.ponds,
        this.state.size,
        this.state.parentFarm,
        this.state.indicator
      );
      alert("Saved!.");
      return this.closeEdit();
    } else {
      return;
    }
  };

  render() {
    return       <div className="none">
    <Dialog
      fullScreen={false}
      open={true}
      onClose={this.closePopup}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <div>
          Create New:
          <ToggleButtonGroup
            value={this.state.indicator}
            exclusive
            onChange={this.indicatorSelector}
            style={{ justifyContent: "center", marginLeft: "15%" }}
          >
            <ToggleButton
              id="Farm"
              value="Farm"
              aria-label="italic"
              style={{
                display: "inline",
                height: "12vh",
                justifySelf: "center",
              }}
            >
              <FontAwesomeIcon id="Farm" value="Farm" icon={faCropAlt} />
            </ToggleButton>
            <br />
            <ToggleButton
              id="Pond"
              value="Pond"
              style={{ height: "12vh", justifySelf: "center" }}
              color="secondary"
              aria-label="italic"
            >
              <FontAwesomeIcon
                id="Farm"
                value="Farm"
                icon={faObjectGroup}
              />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography
            variant="caption"
            align="right"
            style={{ display: "block" }}
          >
            Farm - Ponds
          </Typography>
          {this.state.indicator === "" ||
          this.state.indicator === "Farm" ? (
            <></>
          ) : (
            <>
              <FormControl className="" value={this.state.parentFarm}>
                <div>
                  <br />
                </div>
                Select Farm for new Pond:
                <InputLabel style={{ color: "white" }} htmlFor="farmmenu">
                  {" "}
                </InputLabel>
                <Select
                  labelId="name"
                  id="true"
                  //  onClose={this.closeSelect}
                  value={this.state.parentFarm}
                  onChange={this.update}
                  labelWidth={60}
                  inputProps={{ name: "parentFarm", id: "farmmenu" }}
                >
                  {/* {optionlist} */}
                </Select>
                <br />
                <Tooltip title="hectares" placement="top-end">
                  <TextField
                    id="sizepond"
                    label="Size Pond"
                    name="size"
                    value={this.state.size}
                    onChange={this.update}
                    inputProps={{ maxLength: 5 }}
                  />
                </Tooltip>
              </FormControl>
              <br />
            </>
          )}
        </div>
        <br />
        <TextField
          id="name"
          label="Name"
          name="name"
          value={this.state.name}
          onChange={this.update}
          inputProps={{ maxLength: 30 }}
        />
        <br />
        <br />
        <br />
        {this.state.indicator === "" || this.state.indicator === "Farm" ? (
          <></>
        ) : (
          <>
            <br />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <button name="create" onClick={this.updateData}>
          Create
        </button>
        <button onClick={this.closePopup}>Cancel</button>
      </DialogActions>
    </Dialog>
  </div>;
  }
}
export default Editable;
