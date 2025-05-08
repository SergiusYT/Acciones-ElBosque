// HomePage.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './HomePageStyles.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Agrega los iconos que necesites a la biblioteca
library.add(faBarsStaggered);

const HomePage = () => {
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

            {/* Carrusel de Bootstrap */}
            <div id="carouselExampleDark" className={`carousel carousel-dark slide ${styles.carousel}`} data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="8000">
                        <img src="/img/carousel1.png" className={`d-block w-100 ${styles['carousel-img']}`} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
        					<h5 className={styles['carousel-caption-title']}>Bienvenido {usuarioNombre}</h5>
        					<p className={styles['carousel-caption-text']}>¿Que haremos hoy?</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="/img/carousel2.png" className={`d-block w-100 ${styles['carousel-img']}`} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="/img/carousel3.png" className={`d-block w-100 ${styles['carousel-img']}`} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                </div>
                <button className={`carousel-control-prev ${styles['carousel-control-prev']}`} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className={`carousel-control-prev-icon ${styles['carousel-control-icon']}`} aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className={`carousel-control-next ${styles['carousel-control-next']}`} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className={`carousel-control-next-icon ${styles['carousel-control-icon']}`} aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            {/* Contenedor de las cartas */}
            <div className={styles.cardsContainer}>
                {/* Carta 1 */}
                <a href="/category" className={`card ${styles.card}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`back ${styles.back}`}>
                            <div className={styles["back-content"]}>
                                {/* SVG del icono */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '50px', height: '50px' }}>
                                    <path fill="#ffffff" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/>
                                </svg>
                                <strong>Categorias</strong>
                            </div>
                        </div>
                        <div className={`front ${styles.front}`}>
                            <div className={styles.img}>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#dbdbdb' }}></div>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#077587', left: '50px', top: '0px', width: '150px', height: '150px', animationDelay: '-800ms' }}></div>
                            </div>
                            <div className={styles["front-content"]}>
                                <small className={`badge ${styles.badge}`}>Categoria</small>
                                <div className={styles.description}>
                                    <div className={`title ${styles.title}`}>
                                        <p className={`title ${styles.title}`}>
                                            <strong>Encuentra celulares, pc, etc...</strong>
                                        </p>
                                        {/* SVG del icono */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '15px', height: '15px' }}>
                                    		<path fill="#ffffff" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                
                {/* Carta 2 */}
                <a href="/record" className={`card ${styles.card}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`back ${styles.back}`}>
                            <div className={styles["back-content"]}>
                                {/* SVG del icono */}
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ width: '50px', height: '50px' }}>
									<path fill="#ffffff" d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>							    
								</svg>
                                <strong>Historial</strong>
                            </div>
                        </div>
                        <div className={`front ${styles.front}`}>
                            <div className={styles.img}>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#dbdbdb' }}></div>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#077587', left: '50px', top: '0px', width: '150px', height: '150px', animationDelay: '-800ms' }}></div>
                            </div>
                            <div className={styles["front-content"]}>
                                <small className={`badge ${styles.badge}`}>Historial</small>
                                <div className={styles.description}>
                                    <div className={`title ${styles.title}`}>
                                        <p className={`title ${styles.title}`}>
                                            <strong>Historial de transacciones</strong>
                                        </p>
                                        {/* SVG del icono */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '15px', height: '15px' }}>
											<path fill="#ffffff" d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>							    
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>

                {/* Carta 3 */}
                <a href="/statistic" className={`card ${styles.card}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`back ${styles.back}`}>
                            <div className={styles["back-content"]}>
                                {/* SVG del icono */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '50px', height: '50px' }}>
									<path fill="#ffffff" d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z"/>
                                </svg>
                                <strong>Estadisticas</strong>
                            </div>
                        </div>
                        <div className={`front ${styles.front}`}>
                            <div className={styles.img}>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#dbdbdb' }}></div>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#077587', left: '50px', top: '0px', width: '150px', height: '150px', animationDelay: '-800ms' }}></div>
                            </div>
                            <div className={styles["front-content"]}>
                                <small className={`badge ${styles.badge}`}>Estadisticas</small>
                                <div className={styles.description}>
                                    <div className={`title ${styles.title}`}>
                                        <p className={`title ${styles.title}`}>
                                            <strong>Informes personalizados</strong>
                                        </p>
                                        {/* SVG del icono */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '15px', height: '15px' }}>
											<path fill="#ffffff" d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                
                {/* Carta 4 */}
                <a href="/notification" className={`card ${styles.card}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`back ${styles.back}`}>
                            <div className={styles["back-content"]}>
                                {/* SVG del icono */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '50px', height: '50px' }}>
									<path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
                                </svg>
                                <strong>Notificaciones</strong>
                            </div>
                        </div>
                        <div className={`front ${styles.front}`}>
                            <div className={styles.img}>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#dbdbdb' }}></div>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#077587', left: '50px', top: '0px', width: '150px', height: '150px', animationDelay: '-800ms' }}></div>
                            </div>
                            <div className={styles["front-content"]}>
                                <small className={`badge ${styles.badge}`}>Notificaciones</small>
                                <div className={styles.description}>
                                    <div className={`title ${styles.title}`}>
                                        <p className={`title ${styles.title}`}>
                                            <strong>Ver notificaciones de la pagina</strong>
                                        </p>
                                        {/* SVG del icono */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '15px', height: '15px' }}>
											<path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>

                {/* Carta 5 */}
                <a href="/application" className={`card ${styles.card}`}>
                    <div className={`content ${styles.content}`}>
                        <div className={`back ${styles.back}`}>
                            <div className={styles["back-content"]}>
                                {/* SVG del icono */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ width: '50px', height: '50px' }}>
									<path classname="fa-secondary" opacity=".4" fill="#ffffff" d="M512 352V128h-1.5l-71-47.3C423.2 69.8 404.1 64 384.5 64c-20.7 0-40.9 6.5-57.7 18.5l-98.6 70.4c-21.6 15.4-26.6 45.4-11.2 67s45.4 26.6 67 11.2l57.2-40.8L496.4 332.6c6 5.5 10.3 12.2 12.8 19.4H512zm32 0c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544V352zm48-32a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"/><path class="fa-primary" fill="#ffffff" d="M156.2 352H128V128l72-48c15.6-10.4 34-16 52.8-16c22.7 0 44.7 8.1 61.9 22.9l2.7 2.3-89.3 63.8c-21.6 15.4-26.6 45.4-11.2 67s45.4 26.6 67 11.2l57.2-40.8 13.1 12L496.4 332.6c5.5 5 9.6 11.1 12.1 17.5c6.6 16.6 3.7 36.2-9.2 50.3c-17.9 19.5-48.3 20.9-67.8 2.9l-7.8-7.1c-.9 10.1-5 20.1-12.4 28.2c-17.9 19.5-48.3 20.9-67.8 2.9l-17-15.6c-1.9 7.4-5.6 14.5-11.1 20.6c-17.9 19.6-48.2 21-67.8 3.1L156.2 352zM0 144c0-8.8 7.2-16 16-16H96V352c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V144zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
                                </svg>
                                <strong>Quiero Ser Vendedor</strong>
                            </div>
                        </div>
                        <div className={`front ${styles.front}`}>
                            <div className={styles.img}>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#dbdbdb' }}></div>
                                <div className={`${styles.circle}`} style={{ backgroundColor: '#077587', left: '50px', top: '0px', width: '150px', height: '150px', animationDelay: '-800ms' }}></div>
                            </div>
                            <div className={styles["front-content"]}>
                                <small className={`badge ${styles.badge}`}>Ser Vendedor</small>
                                <div className={styles.description}>
                                    <div className={`title ${styles.title}`}>
                                        <p className={`title ${styles.title}`}>
                                            <strong>Enviar solicitud para ser vendedor en AccionesElBosque</strong>
                                        </p>
                                        {/* SVG del icono */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ width: '15px', height: '15px' }}>
											<path classname="fa-secondary" opacity=".4" fill="#ffffff" d="M512 352V128h-1.5l-71-47.3C423.2 69.8 404.1 64 384.5 64c-20.7 0-40.9 6.5-57.7 18.5l-98.6 70.4c-21.6 15.4-26.6 45.4-11.2 67s45.4 26.6 67 11.2l57.2-40.8L496.4 332.6c6 5.5 10.3 12.2 12.8 19.4H512zm32 0c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544V352zm48-32a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"/><path class="fa-primary" fill="#ffffff" d="M156.2 352H128V128l72-48c15.6-10.4 34-16 52.8-16c22.7 0 44.7 8.1 61.9 22.9l2.7 2.3-89.3 63.8c-21.6 15.4-26.6 45.4-11.2 67s45.4 26.6 67 11.2l57.2-40.8 13.1 12L496.4 332.6c5.5 5 9.6 11.1 12.1 17.5c6.6 16.6 3.7 36.2-9.2 50.3c-17.9 19.5-48.3 20.9-67.8 2.9l-7.8-7.1c-.9 10.1-5 20.1-12.4 28.2c-17.9 19.5-48.3 20.9-67.8 2.9l-17-15.6c-1.9 7.4-5.6 14.5-11.1 20.6c-17.9 19.6-48.2 21-67.8 3.1L156.2 352zM0 144c0-8.8 7.2-16 16-16H96V352c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V144zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default HomePage;

