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

import co.edu.unbosque.entity.EntidadFinanciera;
import co.edu.unbosque.service.api.EntidadFinancieraServiceAPI;
import co.edu.unbosque.utils.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/entidadFinanciera")
public class EntidadFinancieraRestController {

  @Autowired
  private EntidadFinancieraServiceAPI entidadFinancieraServiceAPI;


  @GetMapping(value="/getAll")
  //ResponseEntity List<EntidadFinanciera> getAll(){
  public List<EntidadFinanciera> getAll(){
      return entidadFinancieraServiceAPI.getAll();
  }


  @PostMapping(value="/saveEntidadFinanciera")
  public ResponseEntity<EntidadFinanciera> save(@RequestBody EntidadFinanciera entidadFinanciera){
	  EntidadFinanciera obj = entidadFinancieraServiceAPI.save(entidadFinanciera);
      return new ResponseEntity<EntidadFinanciera>(obj, HttpStatus.OK); // 200
  }

  @GetMapping(value="/findEntidadFinanciera/{id}")
  public ResponseEntity<EntidadFinanciera> getTipoUsuarioById(@PathVariable int id)
          throws ResourceNotFoundException {
	  EntidadFinanciera entidadFinanciera = entidadFinancieraServiceAPI.get(id);
      if (entidadFinanciera == null){
          new ResourceNotFoundException("Record not found for <EntidadFinanciera>"+id);
      }
      return ResponseEntity.ok().body(entidadFinanciera);
  }

  @DeleteMapping(value="/deleteEntidadFinanciera/{id}")
  public ResponseEntity<EntidadFinanciera> delete(@PathVariable int id){
	  EntidadFinanciera entidadFinanciera = entidadFinancieraServiceAPI.get(id);
      if (entidadFinanciera != null){
    	  entidadFinancieraServiceAPI.delete(id);
      }else{
          return new ResponseEntity<EntidadFinanciera>(entidadFinanciera, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new ResponseEntity<EntidadFinanciera>(entidadFinanciera, HttpStatus.OK);
  }
}
