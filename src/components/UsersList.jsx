import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import App from "../App.css";
import UsersForm from "./UsersForm";
import Swal from "sweetalert2";

const UsersList = ({
  users,
  selectUser,
  getUsers,
  userSelected,
  unselectUser,
}) => {
  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers())
      .finally(() => {
        Swal.fire({
          icon: "success",
          title: "This user have been deleted succesfully",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  // const editUser = () =>{
  //   alert('Se ha va a editar un usuario')
  // }

  return (
    <>
      <div
        className="modal fade"
        id="formModalEdit"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editar usuario
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
      <div className="container row">
        <div className="row row-cols-3 bigbox">
          {users.map((user) => (
            <div className="card" key={user.id}>
              <div className="card-body">
                <p className="card-title">
                  <b className="nametitle">
                    {user.first_name.toUpperCase()} <br />
                    {user.last_name.toUpperCase()}
                  </b>
                </p>
                <hr />
                <p className="card-text">
                  <b>Email: </b> {user.email}{" "}
                </p>
                <p className="card-text">
                  <b>Birthday:</b> {user.birthday}{" "}
                </p>
                <a
                  href="#"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    selectUser(user);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#formModalEdit"
                  data-bs-dismiss="modal"
                >
                  Editar
                </a>
                <a
                  href="#"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Eliminar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersList;
