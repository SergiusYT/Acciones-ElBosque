import React, { useState, useEffect } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import styles from './TransactionStyles.module.css'

const Transaction = () => {
    useEffect(() => {
        document.body.classList.add(styles.transaction);
        return () => {
            document.body.classList.remove(styles.transaction);
        };
    }, []);

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""
    });

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFocusChange = (e) => {
        setState({
            ...state,
            focus: e.target.name
        });
    };

    const processPayment = () => {
        console.log("number => ", state.number)
        console.log("name => ", state.name)
        console.log("expiry => ", state.expiry)
        console.log("cvc => ", state.cvc)
        console.log(JSON.stringify(state))
    };
    
    const [selectedPayment, setSelectedPayment] = useState('');
    
    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    return (
	<div>
		<div className={styles.container}>	
			<h1>Transacción</h1>
	  	</div>
        <div className={styles.container}>
            <div className={styles.card}>
                <Cards
                    number={state.number}
                    name={state.name}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    focused={state.focus}
                />
                <form>
                    <div className={styles['form-group']}>
                        <label htmlFor="number">Número de la tarjeta</label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            maxLength="16"
                            className={styles['form-control']}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            maxLength="30"
                            className={styles['form-control']}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                        />
                    </div>
                    <div className={styles['form-row']}>
                        <div className={`col-md-6 ${styles["form-group"]}`}>
                            <label htmlFor="expiry">Fecha de expiración</label>
                            <input
                                type="text"
                                name="expiry"
                                id="expiry"
                                maxLength="4"
                            	className={styles['form-control']}
                                onChange={handleInputChange}
                                onFocus={handleFocusChange}
                            />
                        </div>
                        <div className={`col-md-6 ${styles["form-group"]}`}>
                            <label htmlFor="cvc">CVC</label>
                            <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                maxLength="4"
                            	className={styles['form-control']}
                                onChange={handleInputChange}
                                onFocus={handleFocusChange}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={processPayment} 
                        type="button" 
                        className={`${styles.btn} ${styles['btn-success']} ${styles['btn-block']} ${styles['btn-lg']}`}>
                        Pagar
                    </button>
                </form>
            </div>
            
            <div className={styles['payment-container']}>
                <p className={styles['payment-method-title']}>Método de pago</p>
                <p className={styles['payment-description']}>
                    Elije una metodo de pago<span>:has()</span>
                </p>
                <label className={`${styles['payment-label']} ${selectedPayment === 'google' ? styles['checked'] : ''}`}>
                    <div className={styles['payment-icon']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                        >
                            <path d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z"/>
                        </svg>
                        <p>PSE</p>
                    </div>
                    <input
                        type="radio"
                        name="payment"
                        value="google"
                        className={styles['payment-input']}
                        onChange={handlePaymentChange}
                    />
                </label>
                <label className={`${styles['payment-label']} ${selectedPayment === 'paypal' ? styles['checked'] : ''}`}>
                    <div className={styles['payment-icon']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 576 512"
                            fill="currentColor"
                        >
                            <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"/>
                        </svg>
                        <p>Tarjeta Debito o Credito</p>
                    </div>
                    <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        className={styles['payment-input']}
                        onChange={handlePaymentChange}
                    />
                </label>
            </div>
        </div>
    </div>
    );
};

export default Transaction;
