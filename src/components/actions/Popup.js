import React from "react";
import {TextField, InputLabel, Dialog, DialogActions, DialogContent, FormControl, Select, Typography, Tooltip, Button} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: {},
      open: false,
      farms: this.props.farms,
      indicator: "",
      parentFarm: "",
      name: "",
      size: 0,
      ponds: [],
      action: "newPond"
    };
  }
  closePopup = async () => {
    await this.props.closePopup();
  };

  update = async (event) => {
    let type = event.target.name;
    // let parentFarm = event.target.name;
    let value = event.target.value;
    let _id = event.target.id;
    console.log(event.target)
    if (value === "undefined") {
      return;
    } else {
      await this.setState({
        [type]: value,
      });
    }
  };

  pushData = async (_id, name, ponds, indicator, size, parentFarm, action) => {
    _id = parentFarm
    parentFarm = this.state.undefined
    let sfarms = [...this.state.farms]
    let arrponds = []
    sfarms.reduce((obj, idx)=> ((indicator ==="Pond" && parentFarm===idx.name)? arrponds.push(idx.ponds) : obj) , [])
    // let nPonds = ponds.reduce((obj, item) => ( obj[item.key] = item.value, obj), {});
    ponds = arrponds[0]
    await this.props.pushData(_id, name, ponds, indicator, size, parentFarm, action);
    return;
  };

  indicatorSelector = async (event) => {
    let indicator = event.target.id;
    if ((await event.target.id) === "Farm") {
      indicator = "Farm";
      return this.setState({
        indicator: indicator,
      });
    } else {
      return this.setState({
        indicator: "Pond",
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
        this.state._id,
        this.state.name,
        this.state.ponds,
        this.state.indicator,
        this.state.size,
        this.state.parentFarm,
        this.state.action
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
        <option value={f._id} onClick={this.update}>
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
                  name="Farm"
                  aria-label="italic"
                  style={{
                    display: "inline",
                    height: "8vh",
                    justifySelf: "center",
                  }}
                >
                  <CropLandscapeIcon id="Farm" name="Farm" value="Farm" />
                </ToggleButton>
                <span style={{ padding: "1px" }}> </span>
                <ToggleButton
                  id="Pond"
                  value="Pond"
                  name="Pond"
                  style={{ height: "8vh", justifySelf: "center" }}
                  color="secondary"
                  aria-label="italic"
                >
                  <PictureInPictureIcon id="Pond" name="Pond" value="Pond" />
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography
                variant="caption"
                align="left"
                style={{ display: "block", marginLeft: "16%" }}
              >
                {"Farm    ----    Ponds"}
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
                        id="size"
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
