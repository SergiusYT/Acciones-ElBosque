package co.edu.unbosque.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import co.edu.unbosque.entity.EntidadFinanciera;
import co.edu.unbosque.repository.EntidadFinancieraRepository;
import co.edu.unbosque.service.api.EntidadFinancieraServiceAPI;
import co.edu.unbosque.utils.GenericServiceImpl;

@Service
public class EntidadFinancieraServiceImpl extends GenericServiceImpl<EntidadFinanciera, Integer> implements EntidadFinancieraServiceAPI {

	@Autowired
	private EntidadFinancieraRepository entidadFinancieraRepository;

	@Override
	public CrudRepository<EntidadFinanciera, Integer> getDao() {
		return entidadFinancieraRepository;
	}
}