import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './ComputingStyles.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

import Header from '../../Components/Header';

import Spline from '@splinetool/react-spline';
// Agrega los iconos que necesites a la biblioteca
library.add(faBarsStaggered);

const Product = () => {
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
    

        const [showSpline, setShowSpline] = useState(false);
    
        useEffect(() => {
            const timeout = setTimeout(() => {
                setShowSpline(true);
            }, 1000); // 1 segundo de espera
            return () => clearTimeout(timeout);
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
    
    // Define la lista de productos
	const products = [
    {
        imgSrc: "/img/descktop_HP.jpg",
        title: "HP 22 DD2005LA",
        subtitle: "Desktop",
        details: "Es una computadora que combina el diseño ergonómico, funcionalidad y poder. Dándote seguridad y confianza para que todos en tu familia la utilicen sin ninguna preocupación. Incluye todo lo que necesitas sin gastar de más.",
        price: "799"
    },
    ];
  
    return (
        <div>
                                {/*Encabezado*/}

                    <Header />
           <div className={styles["card-container"]}>
      		{products.map((product, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imgBx}>
                            <img src={product.imgSrc} alt={product.title} />
                        </div>
                        <div className={styles.details}>
                            <h3>{product.title}<br /><span>{product.subtitle}</span></h3>
                            <h4>Detalles del producto</h4>
                            <p>{product.details}</p>
                            <div className={styles.group}>
                                <h2><sup>$</sup>{product.price}<small>,99</small></h2>
                                <a href='/shopcart'>Agregar Al Carrito</a>
                            </div>
                        </div>
                    </div>
                ))}
        
      		{products.map((product, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imgBx}>
                            <img src={product.imgSrc} alt={product.title} />
                        </div>
                        <div className={styles.details}>
                            <h3>{product.title}<br /><span>{product.subtitle}</span></h3>
                            <h4>Detalles del producto</h4>
                            <p>{product.details}</p>
                            <div className={styles.group}>
                                <h2><sup>$</sup>{product.price}<small>,99</small></h2>
                                <a href='/shopcart'>Agregar Al Carrito</a>
                            </div>
                        </div>
                    </div>
                ))}
      		{products.map((product, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imgBx}>
                            <img src={product.imgSrc} alt={product.title} />
                        </div>
                        <div className={styles.details}>
                            <h3>{product.title}<br /><span>{product.subtitle}</span></h3>
                            <h4>Detalles del producto</h4>
                            <p>{product.details}</p>
                            <div className={styles.group}>
                                <h2><sup>$</sup>{product.price}<small>,99</small></h2>
                                <a href='/shopcart'>Agregar Al Carrito</a>
                            </div>
                        </div>
                    </div>
                ))}
		   </div>

                                   {showSpline && (
                           <section className={styles.splineContainer}>
                               <div className={styles.splineWrapper}>
                                   <Spline scene="https://draft.spline.design/4RgHBiZ0f8PdJQZI/scene.splinecode" />
                               </div>
                           </section>
                       )}	
         </div>   
         );
	};

export default Product;    