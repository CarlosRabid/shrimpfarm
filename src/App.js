import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import { BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import Popup from "./components/actions/Popup";
import Editable from "./components/actions/Editable";
import Boxmodels from "./components/actions/BoxModels";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const style = {
  margin: "auto",
  marginLeft: "45%",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showPopup: false,
      editmode: false,
      size: ""
    };
  }
  async componentDidMount() {
    await this.getDatafromDB();
    await this.getSumfromDB();
  }
  
  async getDatafromDB() {
    let data = await axios.get("http://localhost:4328/farms");
    return this.setState({
      data: data.data,
      showPopup: false,
      editmode: false,
    });
  }

  async getSumfromDB() {
    let data = await axios.get("http://localhost:4328/sum");
    let size = data.data
    return this.setState({
      size
    });
  }

  async deleteItemfromDB(_id) {
    if (
      window.confirm(
        "Delete this Farm ? This will delete all ponds within same farm."
      )
    ) {
      await axios.delete(`http://localhost:4328/delFarm/${_id}`);
      alert("Farm Deleted!");
      return this.closeEdit();
    } else {
      return this.closeEdit();
    }
  }

delDatafromDB = async () => {
    if (window.confirm("Are you sure you want to delete All Farms ?")) {
      await axios.delete("http://localhost:4328/empty", {});
      alert("Deleted!.");
      this.getDatafromDB()
      return ;
    } else {
      return;
    }
  }

  togglePopup = (event) => {
    this.setState({ showPopup: true });
  };

  closePopup = async () => {
    await this.setState({
      showPopup: null,
    });
    await this.getSumfromDB()
    return;
  };

  closeEdit = () => {
    return this.setState({
      editmode: false,
    });
  };

  selecPond = (event) => {
    let editmode = { ...this.state.editmode };
    editmode = JSON.stringify(this.state.data);
    this.setState({ editmode });
    return;
  };

  // create farm
  pushData = async (_id, name, ponds, indicator, size, parentFarm, action) => {
    let newFarm = {};
    let newPond = ponds || [];
    newFarm = { _id, name: parentFarm, ponds: newPond };
    
    if ( action === "update" && indicator !== "Pond") {
      ponds = ponds[0]
      await axios.put("http://localhost:4328/updtFarm", {
        data: { _id, name, size, parentFarm, ponds, newFarm, indicator, action },
      })
    } else (
      indicator === "Pond" && action === "newPond" ?  
      await axios.put("http://localhost:4328/updtFarm", {
        data: { _id, name, size, parentFarm, newPond, newFarm, indicator: "Pond", action: "newPond" },
      })
      : await axios.post("http://localhost:4328/postFarm", {
          data: { name, ponds },
        }));
        this.getDatafromDB();
        return this.getSumfromDB() 
  };

  updateFarm = async (id, name, ponds) => {
    let data = {name, ponds};
    await axios.put("http://localhost:4328/updtFarm", {
      data,
    });
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
                  onClick={this.selecPond}
                  style={{ marginLeft: "4%" }}
                  size="medium"
                  position="end"
                  color="primary"
                  name="editmode"
                  id="editmode"
                >
                  Edit Farm or Ponds
                </Button>
                {/* <Button
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
                </Button> */}
                <br />
                <br />
                {this.state.editmode ? (
                  <Editable
                    deleteItemfromDB={this.deleteItemfromDB}
                    data={this.state.editmode}
                    closeEdit={this.closeEdit}
                    pushData={this.pushData}
                  />
                ) : (
                  <></>
                )}

                {this.state.showPopup ? (
                  <Popup
                    closePopup={this.closePopup}
                    pushData={this.pushData}
                    farms={this.state.data}
                  />
                ) : (
                  <Boxmodels
                    data={this.state.data}
                    size={this.state.size}
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
