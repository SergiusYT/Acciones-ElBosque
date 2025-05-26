import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './ShopCartStyles.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

import Header from '../Components/Header';


// Agrega los iconos que necesites a la biblioteca
library.add(faBarsStaggered);

const ShopCart = () => {
    const [usuarioNombre, setUsuarioNombre] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate


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
    

    // Manejar la redirección
    const handleProceedToPayment = () => {
        navigate('/transaction');
    };

  
    return (
        <div>
                                {/*Encabezado*/}

                <Header />
            
        <div className={`${styles["shopping-cart"]} ${styles["dark"]}`}>
            <div className="container">
                <div className={styles["block-heading"]}>
                    <h2>Carrito de compras</h2>
                    <p>Bienvenido, {usuarioNombre}. Aquí está tu carrito de compras.</p>
                </div>
                <div className={`${styles["content"]}`}>
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className={styles["items"]}>
                                {/* Aquí deberías mapear tus productos */}
                                <div className={styles["product"]}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img className="img-fluid mx-auto d-block image" src="https://via.placeholder.com/150" alt="Product" />
                                        </div>
                                        <div className="col-md-9">
                                            <div className={styles["info"]}>
                                                <div className="row">
                                                    <div className={`col-md-7 ${styles["product-name"]}`}>
                                                        <div className={styles["product-name"]}>
                                                            <a href="/category/computing">HP 22 DD2005LA</a>
                                                            <div className={styles["product-info"]}>
                                                                <div>Marca: <span className={styles["value"]}>Marca Ejemplo</span></div>
                                                                <div>Color: <span className={styles["value"]}>Rojo</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`col-md-4 ${styles["quantity"]}`}>
                                                        <label htmlFor="quantity">Cantidad:</label>
                                                        <input id="quantity" type="number" defaultValue="1" className={styles["quantity-input"]} />
                                                    </div>
                                                    <div className={`col-md-3 ${styles["price"]}`}>
                                                        <span>$799.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className={styles["summary"]}>
                                <h3>Resumen</h3>
                                <div className={styles["summary-item"]}>
                                    <span className={styles["text"]}>Subtotal</span>
                                    <span className={styles["price"]}>$350.00</span>
                                </div>
                                <div className={styles["summary-item"]}>
                                    <span className={styles["text"]}>Descuentos</span>
                                    <span className={styles["price"]}>-$50.00</span>
                                </div>
                                <div className={styles["summary-item"]}>
                                    <span className={styles["text"]}>Envío</span>
                                    <span className={styles["price"]}>$10.00</span>
                                </div>
                                <div className={styles["summary-item"]}>
                                    <span className={styles["text"]}>Total</span>
                                    <span className={styles["price"]}>$310.00</span>
                                </div>
                                    <button onClick={handleProceedToPayment} type="button" className="btn btn-primary btn-lg btn-block">Proceder al pago</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
         </div>
               );
	};

export default ShopCart;       