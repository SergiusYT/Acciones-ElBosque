-- Tablas principales --

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    rol ENUM('inversionista', 'comisionista', 'admin'),
    telefono VARCHAR(20),
    verificado BOOLEAN DEFAULT FALSE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cuentas_alpaca (
    id VARCHAR(50) PRIMARY KEY, -- ID de Alpaca
    usuario_id INT UNIQUE,
    numero_cuenta VARCHAR(50),
    estado VARCHAR(50),
    tipo_cuenta VARCHAR(50),
    moneda VARCHAR(10),
    equity DECIMAL(15, 2),
    creado_en DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE comisionistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNIQUE,
    certificacion TEXT,
    experiencia TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE asignaciones_comisionistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inversionista_id INT,
    comisionista_id INT,
    asignado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inversionista_id) REFERENCES usuarios(id),
    FOREIGN KEY (comisionista_id) REFERENCES comisionistas(id)
);


-- Tablas de Finanzas y Operaciones --

CREATE TABLE fondos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    saldo DECIMAL(15,2) DEFAULT 0.00,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    comisionista_id INT NULL,
    ticker VARCHAR(10),
    tipo_orden ENUM('market', 'limit', 'stop_loss', 'take_profit'),
    tipo_operacion ENUM('compra', 'venta'),
    cantidad INT,
    precio_objetivo DECIMAL(10,2) NULL,
    estado ENUM('pendiente', 'firmada', 'en_ejecucion', 'ejecutada', 'cancelada', 'fallida'),
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    ejecutado_en DATETIME NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (comisionista_id) REFERENCES comisionistas(id)
);


CREATE TABLE portafolios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ticker VARCHAR(10),
    cantidad INT,
    precio_promedio DECIMAL(10,2),
    actualizado_en DATETIME,
    UNIQUE(usuario_id, ticker),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE acciones (
    ticker VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100),
    sector VARCHAR(50),
    capitalizacion DECIMAL(15,2)
);



CREATE TABLE entidad_financiera (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    estado VARCHAR(20) DEFAULT 'activo'
);


CREATE TABLE franquicia (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE medios_de_pago (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    estado VARCHAR(20) DEFAULT 'activo'
);



CREATE TABLE transacciones (    -- Tabla de Transacciones para llevear un registro de cada movimiento de manera exacta --
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT,
    usuario_id INT,
    ticker VARCHAR(10),
    tipo_operacion ENUM('compra', 'venta'),
    cantidad INT,
    precio_ejecucion DECIMAL(10,2),
    total DECIMAL(15,2),
    
    -- Información financiera
    entidad_id SMALLINT,
    franquicia_id SMALLINT,
    medio_pago_id SMALLINT,
    numero_tarjeta VARCHAR(20), -- puedes usar NULLABLE para evitar guardar tarjetas si no es necesario
    estado_pago ENUM('aprobado', 'rechazado', 'pendiente') DEFAULT 'aprobado',

    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Relaciones
    FOREIGN KEY (orden_id) REFERENCES ordenes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ticker) REFERENCES acciones(ticker),
    FOREIGN KEY (entidad_id) REFERENCES entidad_financiera(id),
    FOREIGN KEY (franquicia_id) REFERENCES franquicia(id),
    FOREIGN KEY (medio_pago_id) REFERENCES medios_de_pago(id)
);



-- Tablas de Mercados y Operaciones --

CREATE TABLE mercados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    pais VARCHAR(50),
    abre TIME,
    cierra TIME,
    zona_horaria VARCHAR(50)
);


CREATE TABLE acciones_mercado (
    ticker VARCHAR(10),
    mercado_id INT,
    PRIMARY KEY (ticker, mercado_id),
    FOREIGN KEY (ticker) REFERENCES acciones(ticker),
    FOREIGN KEY (mercado_id) REFERENCES mercados(id)
);


CREATE TABLE cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticker VARCHAR(10),
    precio DECIMAL(10,2),
    volumen INT,
    registrado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticker) REFERENCES acciones(ticker)
);




-- Tabla de Comisiones --

CREATE TABLE comisiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT,
    valor_total DECIMAL(10,2),
    porcentaje DECIMAL(5,2),
    porcentaje_comisionista DECIMAL(5,2),
    porcentaje_empresa DECIMAL(5,2),
    FOREIGN KEY (orden_id) REFERENCES ordenes(id)
);


-- Trazabilidad y Logs --

CREATE TABLE logs_operaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento TEXT,
    modulo VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE historial_ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id)
);


-- Tabla de Notificaciones --

CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('sms', 'email', 'whatsapp'),
    mensaje TEXT,
    enviado_en DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


-- Tabla para Suscripciones Premium --

CREATE TABLE suscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('mensual', 'anual'),
    estado ENUM('activa', 'cancelada', 'expirada'),
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


-- Tabla de lista de Observaciones --

CREATE TABLE watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ticker VARCHAR(10),
    alerta_precio DECIMAL(10,2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ticker) REFERENCES acciones(ticker)
);
