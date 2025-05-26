package co.edu.unbosque.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.unbosque.entity.Tipotx;

@Repository
public interface TipotxRepository extends CrudRepository<Tipotx, Integer> {

}