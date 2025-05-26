package co.edu.unbosque.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.unbosque.entity.MediosDePago;

@Repository
public interface MediosDePagoRepository extends CrudRepository<MediosDePago, Integer> {

}