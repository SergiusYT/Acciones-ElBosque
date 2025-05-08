package co.edu.unbosque.entity;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the entidad_financiera database table.
 * 
 */
@Entity
@Table(name="entidad_financiera")
@NamedQuery(name="EntidadFinanciera.findAll", query="SELECT e FROM EntidadFinanciera e")
public class EntidadFinanciera implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String estado;

	private String nombre;

	public EntidadFinanciera() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getEstado() {
		return this.estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}