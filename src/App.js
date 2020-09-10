import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Popup from "./components/actions/Popup";
import axios from "axios";
import Editable from "./components/actions/Editable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Boxmodels from "./components/actions/BoxModels";

const style = {
  margin: "auto",
  // top: '71vh',
  // right: '30vw',
  // bottom: 20,
  // left: 'auto',
  marginLeft: "45%",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Dummy data for testing first
      totSize: 13,
      dbdata: [],
      data: [
        {
          name: "abc",
          size: 2,
          ponds: [
            { name: "VX", size: 0.2, parentFarm: "abc" },
            { name: "ZZ", size: 0.4, parentFarm: "abc" },
          ],
        },
        {
          name: "xyz",
          size: 2,
          ponds: [
            { name: "GH", size: 0.1, parentFarm: "xyz" },
            { name: "YU", size: 0.2, parentFarm: "xyz" },
          ],
        },
        {
          name: "stu",
          size: 1,
          ponds: [
            { name: "KL", size: 0.1, parentFarm: "stu" },
            { name: "MN", size: 0.3, parentFarm: "stu" },
          ],
        },
      ],
      showPopup: false,
      editmode: false,
    };
  }
  async componentDidMount() {
    await this.getDatafromDB();
  }

  async getDatafromDB() {
    let data = await axios.get("http://localhost:4328/farms");
    return this.setState({
      dbdata: data.data,
      showPopup: false,
      editmode: false,
    });
  }

  async deleteItemfromDB(_id) {
    if (
      window.confirm(
        "Delete this Farm ? This will delete all ponds within same farm."
      )
    ) {
      let data = await axios.delete(`http://localhost:4328/delFarm/${_id}`);
      alert("Farm Deleted!");
      return this.closeEdit();
    } else {
      return this.closeEdit();
    }
  }

  async delDatafromDB(eventid) {
    if (window.confirm("Are you sure you want to delete All Farms ?")) {
      let data = await axios.delete("http://localhost:4328/empty", {});
      alert("Deleted!.");
      return this.setState({ data: [], showPopup: false });
    } else {
      return;
    }
  }

  togglePopup = (event) => {
    this.setState({ showPopup: true });
  };

  closePopup = () => {
    return this.setState({
      showPopup: null,
    });
  };

  closeEdit = () => {
    return this.setState({
      editmode: false,
    });
  };

  selecPond = (event) => {
    let editmode = { ...this.state.editmode };
    editmode = JSON.stringify(event);
    this.setState({ editmode });
    return;
  };

  getNow = () => {
    return new Date();
  };

  // create farm
  pushData = async (_id, name, ponds, indicator, size, parentFarm) => {
    let newFarm = {};
    let newPond = ponds || [];
    newPond.push({name, size, parentFarm});
    newFarm = { _id, name: parentFarm, ponds: newPond };
    indicator === "Pond"
      ? await axios.put("http://localhost:4328/updtFarm", {
          data: { _id, name, size, parentFarm, newPond, newFarm },
        })
      : await axios.post("http://localhost:4328/postFarm", {
          data: { name, ponds },
        });
    return this.getDatafromDB();
  };

  updateFarm = async (id, name, ponds) => {
    let data = {};
    await axios.put("http://localhost:4328/updtFarm", {
      data: { name, ponds },
    });
    console.log(ponds);
    return this.getDatafromDB();
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <br />
                <Button
                  variant="contained"
                  onClick={this.delDatafromDB}
                  style={{ marginLeft: "4%" }}
                  size="small"
                  position="end"
                  color="secondary"
                  name="delete all"
                  id="empty"
                >
                  Empty ALL
                </Button>
                <Button
                  variant="contained"
                  onClick={this.delDatafromDB}
                  style={{ marginLeft: "4%" }}
                  size="small"
                  position="end"
                  color="secondary"
                  name="delete all"
                  id="empty"
                >
                  Edit Farm
                </Button>
                <br />
                <br />
                {this.state.editmode ? (
                  <Editable
                    deleteItemfromDB={this.deleteItemfromDB}
                    selectEvent={this.state.editmode}
                    closeEdit={this.closeEdit}
                    updateEvent={this.updateEvent}
                  />
                ) : (
                  <></>
                )}

                {this.state.showPopup ? (
                  <Popup
                    closePopup={this.closePopup}
                    pushData={this.pushData}
                    farms={this.state.dbdata}
                  />
                ) : (
                  <Boxmodels
                    data={this.state.dbdata}
                    totsize={this.state.size}
                  />
                )}
                <Fab
                  variant="extended"
                  onClick={this.togglePopup}
                  name="showPopup"
                  id="showPopup"
                  color="default"
                  aria-label="add"
                  style={style}
                  size="large"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="2x"
                    id="all"
                    value="false"
                  />
                </Fab>
              </div>
            )}
          ></Route>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
