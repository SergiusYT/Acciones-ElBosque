package co.edu.unbosque.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.entity.Franquicia;
import co.edu.unbosque.service.api.FranquiciaServiceAPI;
import co.edu.unbosque.utils.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/franquicia")
public class FranquiciaRestController {

  @Autowired
  private 	FranquiciaServiceAPI franquiciaServiceAPI;


  @GetMapping(value="/getAll")
  //ResponseEntity List<Franquicia> getAll(){
  public List<Franquicia> getAll(){
      return franquiciaServiceAPI.getAll();
  }


  @PostMapping(value="/saveFranquicia")
  public ResponseEntity<Franquicia> save(@RequestBody Franquicia categoria){
	  Franquicia obj = franquiciaServiceAPI.save(categoria);
      return new ResponseEntity<Franquicia>(obj, HttpStatus.OK); // 200
  }

  @GetMapping(value="/findFranquicia/{id}")
  public ResponseEntity<Franquicia> getTipoUsuarioById(@PathVariable int id)
          throws ResourceNotFoundException {
	  Franquicia franquicia = franquiciaServiceAPI.get(id);
      if (franquicia == null){
          new ResourceNotFoundException("Record not found for <Franquicia>"+id);
      }
      return ResponseEntity.ok().body(franquicia);
  }

  @DeleteMapping(value="/deleteFranquicia/{id}")
  public ResponseEntity<Franquicia> delete(@PathVariable int id){
	  Franquicia franquicia = franquiciaServiceAPI.get(id);
      if (franquicia != null){
    	  franquiciaServiceAPI.delete(id);
      }else{
          return new ResponseEntity<Franquicia>(franquicia, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new ResponseEntity<Franquicia>(franquicia, HttpStatus.OK);
  }
}
