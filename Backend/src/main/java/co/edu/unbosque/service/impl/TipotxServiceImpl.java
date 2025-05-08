package co.edu.unbosque.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import co.edu.unbosque.entity.Tipotx;
import co.edu.unbosque.repository.TipotxRepository;
import co.edu.unbosque.service.api.TipotxServiceAPI;
import co.edu.unbosque.utils.GenericServiceImpl;

@Service
public class TipotxServiceImpl extends GenericServiceImpl<Tipotx, Integer> implements TipotxServiceAPI {

	@Autowired
	private TipotxRepository tipotxRepository;

	@Override
	public CrudRepository<Tipotx, Integer> getDao() {
		return tipotxRepository;
	}
}