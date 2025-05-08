package co.edu.unbosque.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;



/**
 * The persistent class for the auditoria database table.
 * 
 */
@Entity
@NamedQuery(name="Auditoria.findAll", query="SELECT a FROM Auditoria a")
public class Auditoria implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="fcha_audtria", nullable = false)
    private Date fchaAudtria;

    @Column(name="usrio_audtria", nullable = false, length = 8)
    private String usrioAudtria;

    @Column(name="accion_audtria", nullable = false, length = 1)
    private String accionAudtria;

    @Column(name="comentario_audtria", nullable = false, length = 60)
    private String comentarioAudtria;

    @Column(name="address_audtria", nullable = false, length = 20)
    private String addressAudtria;


	public Auditoria() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAccionAudtria() {
		return this.accionAudtria;
	}

	public void setAccionAudtria(String accionAudtria) {
		this.accionAudtria = accionAudtria;
	}

	public String getAddressAudtria() {
		return this.addressAudtria;
	}

	public void setAddressAudtria(String addressAudtria) {
		this.addressAudtria = addressAudtria;
	}

	public String getComentarioAudtria() {
		return this.comentarioAudtria;
	}

	public void setComentarioAudtria(String comentarioAudtria) {
		this.comentarioAudtria = comentarioAudtria;
	}

	public Date getFchaAudtria() {
		return this.fchaAudtria;
	}

	public void setFchaAudtria(Date fchaAudtria) {
		this.fchaAudtria = fchaAudtria;
	}

	public String getUsrioAudtria() {
		return this.usrioAudtria;
	}

	public void setUsrioAudtria(String usrioAudtria) {
		this.usrioAudtria = usrioAudtria;
	}

}