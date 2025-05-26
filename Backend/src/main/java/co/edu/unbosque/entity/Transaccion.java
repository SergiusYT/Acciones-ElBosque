package co.edu.unbosque.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;


/**
 * The persistent class for the transaccion database table.
 * 
 */
@Entity
@NamedQuery(name="Transaccion.findAll", query="SELECT t FROM Transaccion t")
public class Transaccion implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="cant_comprada")
	private int cantComprada;

	private String estado;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="fecha_hora", nullable = false)
	private Date fechaHora;

	@Column(name="id_banco")
	private short idBanco;

	@Column(name="id_franquicia")
	private short idFranquicia;

	@Column(name="id_producto")
	private int idProducto;

	@Column(name="id_tipo_pago")
	private short idTipoPago;

	@Column(name="num_tarjeta")
	private String numTarjeta;

	private String usuario;

	@Column(name="valor_unitario")
	private int valorUnitario;

	public Transaccion() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCantComprada() {
		return this.cantComprada;
	}

	public void setCantComprada(int cantComprada) {
		this.cantComprada = cantComprada;
	}

	public String getEstado() {
		return this.estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaHora() {
		return this.fechaHora;
	}

	public void setFechaHora(Date fechaHora) {
		this.fechaHora = fechaHora;
	}

	public short getIdBanco() {
		return this.idBanco;
	}

	public void setIdBanco(short idBanco) {
		this.idBanco = idBanco;
	}

	public short getIdFranquicia() {
		return this.idFranquicia;
	}

	public void setIdFranquicia(short idFranquicia) {
		this.idFranquicia = idFranquicia;
	}

	public int getIdProducto() {
		return this.idProducto;
	}

	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}

	public short getIdTipoPago() {
		return this.idTipoPago;
	}

	public void setIdTipoPago(short idTipoPago) {
		this.idTipoPago = idTipoPago;
	}

	public String getNumTarjeta() {
		return this.numTarjeta;
	}

	public void setNumTarjeta(String numTarjeta) {
		this.numTarjeta = numTarjeta;
	}

	public String getUsuario() {
		return this.usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public int getValorUnitario() {
		return this.valorUnitario;
	}

	public void setValorUnitario(int valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

}