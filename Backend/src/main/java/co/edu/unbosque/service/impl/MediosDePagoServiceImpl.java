package co.edu.unbosque.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import co.edu.unbosque.entity.MediosDePago;
import co.edu.unbosque.repository.MediosDePagoRepository;
import co.edu.unbosque.service.api.MediosDePagoServiceAPI;
import co.edu.unbosque.utils.GenericServiceImpl;

@Service
public class MediosDePagoServiceImpl extends GenericServiceImpl<MediosDePago, Integer> implements MediosDePagoServiceAPI {

	@Autowired
	private MediosDePagoRepository mediosDePagoRepository;

	@Override
	public CrudRepository<MediosDePago, Integer> getDao() {
		return mediosDePagoRepository;
	}
}