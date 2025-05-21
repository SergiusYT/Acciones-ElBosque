import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './CategoryStyles.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../Components/Header';


// Agrega los iconos que necesites a la biblioteca
library.add(faBarsStaggered);

const Category = () => {
    const [usuarioNombre, setUsuarioNombre] = useState('');

    useEffect(() => {
        // Recuperar el nombre del usuario desde localStorage
        const nombre = localStorage.getItem('usuarioNombre');
        if (nombre) {
            setUsuarioNombre(nombre);
        }

        // Agregar la clase al body al montar el componente
        document.body.classList.add(styles["home-page"]);

        // Remover la clase al body al desmontar el componente
        return () => {
            document.body.classList.remove(styles["home-page"]);
        };
    }, []);
    
    //CARRITO 
    
    // Estado para el contador de productos
    // eslint-disable-next-line no-unused-vars
    const [productCount, setProductCount] = useState(0);

    // Lógica para mostrar el número de productos o "+9"
    const displayCount = productCount > 9 ? '+9' : productCount;

	// Estado para el contador de notificaciones
	// eslint-disable-next-line no-unused-vars
    const [notificationCount, setNotificationCount] = useState(0); 

      // Lógica para mostrar el número de notificaciones o "+9"
    const displayNotificationCount = notificationCount > 9 ? '+9' : notificationCount;
  
    return (
        <div>
                        {/*Encabezado*/}

                            <Header />

            
            {/* Contenido principal */}
            <div className={styles.container}>
                <a href="/category/computing" className={`${styles.box} ${styles["box-1"]}`} data-text="Computación">
                    <img src="/img/computador.jpg" alt="Computación"/>
                </a>
                <a href="/category/smarthphone" className={`${styles.box} ${styles["box-2"]}`} data-text="Celulares">
                    <img src="/img/celular.jpg" alt="Celulares"/>
                </a>
                <a href="/category/zona-gamer" className={`${styles.box} ${styles["box-3"]}`} data-text="Zona Gamer">
                    <img src="/img/gamer.jpg" alt="Zona Gamer"/>
                </a>
                <a href="/category/audio" className={`${styles.box} ${styles["box-4"]}`} data-text="Audio">
                    <img src="/img/audio.jpg" alt="Audio"/>
                </a>
                <a href="/category/smart-home" className={`${styles.box} ${styles["box-5"]}`} data-text="Smart Home">
                    <img src="/img/smart.jpg" alt="Smart Home"/>
                </a>
            </div>

         </div>   
         );
	};

export default Category;    