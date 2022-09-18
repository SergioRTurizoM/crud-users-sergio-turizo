import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  const selectUser = (user) => {
    setUserSelected(user);
  };

  const unselectUser = () => {
    setUserSelected(null);
  };

  return (
    <div className="App container">
      <div
        className="modal fade"
        id="formModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Nuevo usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <UsersForm
                userSelected={userSelected}
                getUsers={getUsers}
                unselectUser={unselectUser}
              />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary startButton "
        data-bs-toggle="modal"
        data-bs-target="#formModal"
        onClick={() => setIsVisible(!isVisible)}
      >
        Nuevo usuario
      </button>
      {/* { isVisible ? <UsersForm userSelected={userSelected} getUsers={getUsers} unselectUser={unselectUser}/> : <div></div> } */}
      <h1>Usuarios</h1>
      <div className="container">
      <UsersList
        users={users}
        selectUser={selectUser}
        getUsers={getUsers}
        userSelected={userSelected}
        unselectUser={unselectUser}
      />
        
      </div>
    
    </div>
  );
}

export default App;
