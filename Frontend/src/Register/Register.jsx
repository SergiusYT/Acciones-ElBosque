import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './RegisterStyles.module.css'; // Importar estilos CSS Modules

const Register = () => {
  const [login, setLogin] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Agregar la clase al body al montar el componente
    document.body.classList.add(styles["register-page"]);

    // Remover la clase al body al desmontar el componente
    return () => {
      document.body.classList.remove(styles["register-page"]);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (login.trim() === '' || nombres.trim() === '' || apellidos.trim() === '' || password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hace falta llenar todos los campos.'
      });
      return;
    }

    const usuario = {
      id: 3,// se crea con un id tipo usuario 3 ya que el id 3 representa como Comprador por defecto
      login: login,
      nombres: nombres,
      apellidos: apellidos,
      clave: password,
      estado: "A" // Suponiendo que el estado predeterminado es "Activo"
    };

    try {
      const response = await axios.post('http://localhost:8080/AccionesElBosque/usuario/saveUsuario', usuario, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Bienvenido a la familia AccionesElBosque.'
        }).then(() => {
          // Redirige a la página de inicio de sesión
          window.location.href = "/login";
        });
      } else {
        console.error('Error al registrar usuario.');
        // Aquí puedes mostrar un mensaje de error al usuario
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el usuario. Inténtelo de nuevo más tarde.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar registrar el usuario. Inténtelo de nuevo más tarde.'
      });
    }
  };

  return (
    <div>
      <div className={styles["image-container"]}>
        <img src="/img/Logo2.jpg" alt="Imagen de la Izquierda" />
      </div>
      <div className={styles["login-box"]}>
        <form onSubmit={handleSubmit}>
    	  <div className={styles["title-container"]}>
      		<h1 className={styles["registration-title"]}>Registro</h1>
   	 	  </div>          
    	  <div className={styles["user-box"]}>
            <input
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              type="text"
              name="nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
            <label>Nombres</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              type="text"
              name="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
            <label>Apellidos</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <div className={styles["button-container"]}>
            <a href="/login" className={styles["left-button"]}>Volver<span></span></a>
            {/* eslint-disable-next-line */}
            <a href="#" onClick={handleSubmit} className={styles["right-button"]}>Registrarse<span></span></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
