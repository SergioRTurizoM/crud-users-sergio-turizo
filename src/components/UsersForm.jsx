import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UsersForm = ({ userSelected, unselectUser, getUsers }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    }
  }, [userSelected]);

  const submit = (data) => {
    if (userSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          data
        )
        .then(() => getUsers())
        .finally(()=>{
            Swal.fire({
                icon: "success",
                title: "Usuario actualizado",
                showConfirmButton: false,
                timer: 2000,
              })
        })
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => {
          getUsers();
        })
        .catch((error) => console.log(error.response))
        .finally(()=>{
            Swal.fire({
                icon: "success",
                title: "Nuevo usuario agregado",
                showConfirmButton: false,
                timer: 2000,
              })
        });
    }

    cleanForm();
  };

  const cleanForm = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
    });
    unselectUser();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="row g-4 containerForm">
      <div className="col-md-12">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" id="first_name" {...register("first_name")} ></input>
      </div>
      <div  className="col-md-12">
        <label className="form-label">Apellidos</label>
        <input type="text" className="form-control" id="last_name" {...register("last_name")}></input>
      </div>
      <div  className="col-md-12">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...register("email")}
          autoComplete="email"
        ></input>
      </div>
      <div  className="col-md-12">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          {...register("password")}
        ></input>
      </div>
      <div  className="col-md-12">
        <label className="form-label">Fecha de Nacimiento (día/mes/año)</label>
        <input type="date" className="form-control" id="birthday" {...register("birthday")}></input>
      </div>
      <div>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Agregar</button>
        <button type="button" className="btn btn-warning"  onClick={cleanForm}>limpiar</button>
      </div>
    </form>
  );
};

export default UsersForm;
