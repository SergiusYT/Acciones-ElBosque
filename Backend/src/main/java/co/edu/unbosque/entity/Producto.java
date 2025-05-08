package co.edu.unbosque.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the producto database table.
 * 
 */
@Entity
@NamedQuery(name="Producto.findAll", query="SELECT p FROM Producto p")
public class Producto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String codigo;

	@Column(name="costo_venta")
	private BigDecimal costoVenta;

	private String descripcion;

	private String estado;

	private int existencia;

	@Column(name="id_categoria")
	private short idCategoria;

	@Column(name="margen_utilidad")
	private double margenUtilidad;

	@Column(name="precio_venta_actual")
	private BigDecimal precioVentaActual;

	@Column(name="precio_venta_anterior")
	private BigDecimal precioVentaAnterior;

	@Column(name="stock_maximo")
	private int stockMaximo;

	@Column(name="stock_minimo")
	private int stockMinimo;

	@Column(name="tiene_iva")
	private String tieneIva;

	public Producto() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public BigDecimal getCostoVenta() {
		return this.costoVenta;
	}

	public void setCostoVenta(BigDecimal costoVenta) {
		this.costoVenta = costoVenta;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEstado() {
		return this.estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public int getExistencia() {
		return this.existencia;
	}

	public void setExistencia(int existencia) {
		this.existencia = existencia;
	}

	public short getIdCategoria() {
		return this.idCategoria;
	}

	public void setIdCategoria(short idCategoria) {
		this.idCategoria = idCategoria;
	}

	public double getMargenUtilidad() {
		return this.margenUtilidad;
	}

	public void setMargenUtilidad(double margenUtilidad) {
		this.margenUtilidad = margenUtilidad;
	}

	public BigDecimal getPrecioVentaActual() {
		return this.precioVentaActual;
	}

	public void setPrecioVentaActual(BigDecimal precioVentaActual) {
		this.precioVentaActual = precioVentaActual;
	}

	public BigDecimal getPrecioVentaAnterior() {
		return this.precioVentaAnterior;
	}

	public void setPrecioVentaAnterior(BigDecimal precioVentaAnterior) {
		this.precioVentaAnterior = precioVentaAnterior;
	}

	public int getStockMaximo() {
		return this.stockMaximo;
	}

	public void setStockMaximo(int stockMaximo) {
		this.stockMaximo = stockMaximo;
	}

	public int getStockMinimo() {
		return this.stockMinimo;
	}

	public void setStockMinimo(int stockMinimo) {
		this.stockMinimo = stockMinimo;
	}

	public String getTieneIva() {
		return this.tieneIva;
	}

	public void setTieneIva(String tieneIva) {
		this.tieneIva = tieneIva;
	}

}