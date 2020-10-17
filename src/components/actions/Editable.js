import React from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture";
import Size from "./Size";

class Editable extends React.Component {
  constructor(props) {
    super(props);
    let data = JSON.parse(this.props.data);
    this.state = {
      farms: data,
      _id: {},
      open: false,
      indicator: "",
      parentFarm: "",
      name: "",
      // size: this.state._id.ponds[0].size,
      size: "",
      ponds: [],
      action: "update",
    };
  }
  closeEdit = () => {
    this.props.closeEdit();
  };

  handleInputSize = async (value) => {
    await this.setState({ size: value })
    return;
  };

  pushData = async (_id, name, ponds, indicator, size, parentFarm, action) => {
    await this.props.pushData(
      _id,
      name,
      ponds,
      indicator,
      size,
      parentFarm,
      action
    );
    return;
  };

  deleteItemfromDB = async (event) => {
    this.state.indicator === "Farm"
      ? await this.props.deleteItemfromDB(this.state.parentFarm)
      : console.log("deletedpond");
    return;
    // return
  };

  indicatorSelector = async (event) => {
    let indicator = { ...this.state.indicator };
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
  updateAction = async (e) => {
    if (window.confirm(`You will update your changes, please confirm: `)) {
        await this.pushData(
        this.state.parentFarm,
        this.state.name,
        this.state.farms.map((f, idx) =>
          f.name === this.state.undefined ? f.ponds : []
        ),
        this.state.indicator,
        this.state._id.ponds === "" ? this.state._id.ponds[0].size : this.state.size,
        this.state.undefined,
        this.state.action
      );
      return this.closeEdit();
    } else {
      return;
    }
  };
  update = async (event) => {
    let type = event.target.name;
    let value = event.target.value;
    // let _id = event.target.value._id;
    // let size = event.target.value.ponds;
    if ([type] === "undefined") {
      type = "_id";
      return;
    } else {
      await this.setState({
        [type]: value,
      });
    }
  };

  render() {
    let pondslist = [];
    let farmslist = [];
    this.state.farms.map((f, idx) =>
      farmslist.push(
        <option value={f._id} onClick={this.update}>
          {f.name}
        </option>
      )
    );
    this.state.farms.map((f, idx) => {
      return f.ponds.map((p) =>
        f.name === p.parentFarm
          ? pondslist.push(
              <option value={f} size={p.size} onClick={this.update}>
                {p.name}
              </option>
            )
          : p
      );
    });

    return (
      <div>
        <Dialog
          fullScreen={false}
          open={true}
          onClose={this.closePopup}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div>
              Edit:
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
                <>
                  <Select
                    labelId="name"
                    id="true"
                    //  onClose={this.closeSelect}
                    value={this.state.parentFarm}
                    onChange={this.update}
                    labelWidth={60}
                    inputProps={{ name: "parentFarm", id: "farmmenu" }}
                  >
                    {farmslist}
                  </Select>
                </>
              ) : (
                <>
                  <FormControl className="" value={this.state.parentFarm}>
                    <div>
                      <br />
                    </div>
                    Select Pond to Update:
                    <Select
                      labelId="pond"
                      id="true"
                      value={this.state.undefined}
                      onChange={this.update}
                      labelWidth={60}
                      inputProps={{ name: "_id", id: "farmmenu" }}
                    >
                      {pondslist}
                    </Select>
                    <br />
                    {this.state._id.ponds ? (
                      <Size
                        data={this.state._id.ponds}
                        handleInputSize={this.handleInputSize}
                        size={this.state.size}
                      />
                    ) : (
                      <></>
                    )}
                  </FormControl>
                  <br />
                </>
              )}
            </div>
            <br />
            <br />
            <TextField
              id="name"
              name="name"
              value={this.state.name ? this.state.name : this.state.undefined}
              onChange={this.update}
              inputProps={{ maxLength: 30 }}
            />
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <button name="create" onClick={this.updateAction}>
              Update
            </button>
            <br />
            {this.state.parentFarm || this.state.undefined ? (
              <button name="deleteone" onClick={this.deleteItemfromDB}>
                Delete current {this.state.indicator}
              </button>
            ) : (
              <></>
            )}
            <button onClick={this.closeEdit}>Cancel</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Editable;
