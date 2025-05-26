// Login.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './LoginStyles.module.css'; // Importar estilos CSS Modules

const Login = () => {
  const [login, setLogin] = useState('');
  const [clave, setClave] = useState('');
  const submitRef = useRef(null);
  

  useEffect(() => {
    // Agregar la clase al body al montar el componente
    document.body.classList.add(styles["login-page"]);

    // Remover la clase al body al desmontar el componente
    return () => {
      document.body.classList.remove(styles["login-page"]);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (login.trim() === '' || clave.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hace falta llenar todos los campos.'
      });
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/AccionesElBosque/usuario/getAll', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(usuario => usuario.login === login && usuario.clave === clave);

      if (usuarioEncontrado) {
        localStorage.setItem('usuarioNombre', usuarioEncontrado.login); // Guardar el nombre del usuario en localStorage

        Swal.fire({
          icon: 'success',
          title: 'Ingreso Exitoso',
          text: 'Bienvenido de nuevo.'
        }).then(() => {
          window.location.href = '/homepage';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o clave incorrectos.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar iniciar sesión. Inténtelo de nuevo más tarde.'
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitRef.current.click();
    }
  };

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles["background-video"]}
      >
        <source src="/video/fondoLogin.mp4" type="video/mp4" />
      </video>

      <div className={styles["background-blur"]}></div>

      <div className={styles["image-container"]}>
        <img src="/img/logo.png" alt="Imagen de cabecera" />
      </div>
      <div className={styles["login-box"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-box"]}>
            <input 
              type="text" 
              name="login" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              required 
              onKeyDown={handleKeyDown} 
            />
            <label>Username</label>
          </div>
          <div className={styles["user-box"]}>
            <input 
              type="password" 
              name="clave" 
              value={clave} 
              onChange={(e) => setClave(e.target.value)} 
              required 
              onKeyDown={handleKeyDown} 
            />
            <label>Password</label>
          </div>
          <div className={styles["button-container"]}>
            <a href="/register" className={styles["left-button"]}>Registrar<span></span></a>
            {/* eslint-disable-next-line */}
            <a href="#" ref={submitRef} onClick={handleSubmit} className={styles["right-button"]}>Ingresar<span></span></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
