import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropAlt, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  InputLabel,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      farms: [this.props.farms],
      indicator: "",
      parentFarm: "",
      name: "",
      size: 0,
      ponds: [],
    };
  }
  closePopup = () => {
    this.props.closePopup();
  };

  closeSelect = (event) => {
    console.log(event.target.id);
  };

  openSelect = (event) => {
    return this.setState(event.target.id);
  };

  handleInput = (event) => {
    let value = { ...this.state.value };
    value = event;
    return this.setState(value);
  };

  update = async (event) => {
    let type = event.target.name;
    //   let parentFarm = event.target.name;
    console.log(event.target);
    let value = event.target.value;
    if (value === "undefined") {
      return;
    } else {
      await this.setState({
        [type]: value,
      });
    }
  };

  pushData = async (name, ponds, indicator, size, parentFarm) => {
    await this.props.pushData(name, ponds, indicator, size, parentFarm);
    return;
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

  updateData = async (e) => {
    if (
      window.confirm(
        `You will create a new ${this.state.indicator}, please confirm: `
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
      return this.closePopup();
    } else {
      return;
    }
  };

  render() {
    let optionlist = [];
    this.props.farms.map((f) =>
      optionlist.push(
        <option id="parentFarm" value={f.name} onClick={this.update}>
          {f.name}
        </option>
      )
    );
    return (
      <div className="none">
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
                      {optionlist}
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
      </div>
    );
  }
}
export default Popup;
