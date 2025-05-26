package co.edu.unbosque.controller;

import co.edu.unbosque.entity.Tipotx;
import co.edu.unbosque.service.api.TipotxServiceAPI;
import co.edu.unbosque.utils.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tipotx")
public class TipotxRestController {

    @Autowired
    private TipotxServiceAPI tipotxServiceAPI;


    @GetMapping(value="/getAll")
    //ResponseEntity List<Auditoria> getAll(){
    public List<Tipotx> getAll(){
        return tipotxServiceAPI.getAll();
    }


    @PostMapping(value="/saveTipotx")
    public ResponseEntity<Tipotx> save(@RequestBody Tipotx tipotx){
    	Tipotx obj = tipotxServiceAPI.save(tipotx);
        return new ResponseEntity<Tipotx>(obj, HttpStatus.OK); // 200
    }

    @GetMapping(value="/findTipotx/{id}")
    public ResponseEntity<Tipotx> getTipoUsuarioById(@PathVariable int id)
            throws ResourceNotFoundException {
    	Tipotx tipotx = tipotxServiceAPI.get(id);
        if (tipotx == null){
            new ResourceNotFoundException("Record not found for <Tipotx>"+id);
        }
        return ResponseEntity.ok().body(tipotx);
    }

    @DeleteMapping(value="/deleteTipotx/{id}")
    public ResponseEntity<Tipotx> delete(@PathVariable int id){
    	Tipotx tipotx = tipotxServiceAPI.get(id);
        if (tipotx != null){
        	tipotxServiceAPI.delete(id);
        }else{
            return new ResponseEntity<Tipotx>(tipotx, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Tipotx>(tipotx, HttpStatus.OK);
    }
}
