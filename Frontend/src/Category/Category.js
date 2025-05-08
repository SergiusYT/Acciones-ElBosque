import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './CategoryStyles.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

            <nav className={`navbar bg-body-tertiary fixed-top ${styles["navbar-custom"]}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/homepage">
                        <div className={styles["image-container"]}>
                            <img src="/img/logo.png" alt="Imagen de cabecera" />
                        </div>
                    </a>
                    
                    {/* Notificación */}
                    <div className={styles["notification-container"]}>
                        <a href="/notifications" className={`svg-icon-link ${styles["notification-link"]}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: "40px", height: "40px" }}>
                                <path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                            </svg>
                        </a>
                        <div className={styles["notification-count"]}>{displayNotificationCount}</div>
                    </div>
                    
                               {/* Carrito de compra*/}
 
                    <div className={styles["shopcart-container"]}>
                        <a href="/shopcart" className={`svg-icon-link`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: "40px", height: "40px" }}>
                                <path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                            </svg>
                        </a>
                        <div className={styles["product-count"]}>{displayCount}</div>
                    </div>

            {/* menu desplegable*/}

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon icon="fa-bars-staggered" style={{ fontSize: "36px", color: "#ffffff" }} />
                    </button>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
					<div className={`offcanvas-header ${styles["custom-header"]}`}>
    					<h5 className={`offcanvas-title ${styles["custom-title"]}`} id="offcanvasNavbarLabel">Menú</h5>
    					<button
        					type="button"
       						className={`btn-close ${styles["custom-button"]}`}
        					data-bs-dismiss="offcanvas"
        					aria-label="Close"
    					></button>
					</div>

                        <div className={`offcanvas-body ${styles["offcanvas-body-custom"]}`}>
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className={`nav-link active ${styles["letra"]}`} aria-current="page" href="/homepage">Inicio</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className={`nav-link dropdown-toggle ${styles["letra"]}`}
                                        href="/"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Categorias
                                    </a>
								<ul className={`dropdown-menu ${styles["fondo-custom"]}`}>
    								<div className={`${styles.input}`}>
        								<a href="/category/computing" className={`${styles.value}`}>
            								Computación
        								</a>
        								<a href="/category/smarthphone" className={`${styles.value}`}>
            								Celulares
        								</a>
        								<a href="/category/zona-gamer" className={`${styles.value}`}>
            								Zona Gamer
        								</a>
        								<a href="/category/audio" className={`${styles.value}`}>
            								Audio
        								</a>
        								<a href="/category/smart-home" className={`${styles.value}`}>
            								Smart Home
        								</a>
    								</div>
								</ul>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link active ${styles["letra"]}`} aria-current="page" href="/record">Historial</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link active ${styles["letra"]}`} aria-current="page" href="/statistic">Estadisticas</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link active ${styles["letra"]}`} aria-current="page" href="/application">Quiero Ser Vendedor</a>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
							<ul>
    							<li className={`nav-item ${styles["user-container"]}`}>
        							<a className={`nav-link ${styles["letra2"]}`} href="/perfil" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            						<span>{usuarioNombre}</span>
            						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ color: "#138a9e", width: "30px", height: "30px" }}>
                						<path fill="#138a9e" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
            						</svg>
        							</a>
    							</li>
							</ul>
                        </div>
                    </div>
                </div>
            </nav>
            
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