package co.edu.unbosque.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import co.edu.unbosque.entity.Franquicia;
import co.edu.unbosque.repository.FranquiciaRepository;
import co.edu.unbosque.service.api.FranquiciaServiceAPI;
import co.edu.unbosque.utils.GenericServiceImpl;

@Service
public class FranquiciaServiceImpl extends GenericServiceImpl<Franquicia, Integer> implements FranquiciaServiceAPI {

	@Autowired
	private FranquiciaRepository categoriaRepository;

	@Override
	public CrudRepository<Franquicia, Integer> getDao() {
		return categoriaRepository;
	}
}
