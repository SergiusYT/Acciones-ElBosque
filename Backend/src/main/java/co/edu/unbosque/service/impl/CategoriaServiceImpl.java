package co.edu.unbosque.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import co.edu.unbosque.entity.Categoria;
import co.edu.unbosque.repository.CategoriaRepository;
import co.edu.unbosque.service.api.CategoriaServiceAPI;
import co.edu.unbosque.utils.GenericServiceImpl;

@Service
public class CategoriaServiceImpl extends GenericServiceImpl<Categoria, Integer> implements CategoriaServiceAPI {

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	public CrudRepository<Categoria, Integer> getDao() {
		return categoriaRepository;
	}
}