package com.dev.apphub.devhub.controller;

import com.dev.apphub.devhub.dto.ResponseDto;
import com.dev.apphub.devhub.dto.ResponseUserDto;
import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.exception.UserException;
import com.dev.apphub.devhub.model.entity.UsersEntity;
import com.dev.apphub.devhub.service.auth.IOAuth20Service;
import com.dev.apphub.devhub.service.auth.OAuth20Factory;
import com.dev.apphub.devhub.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    OAuth20Factory oAuth20Factory;


    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public ResponseEntity<ResponseDto> getUserInfo(String token, @RequestParam String oAuth20) {
        IOAuth20Service service = this.oAuth20Factory.getOAuth20(oAuth20);
        try {
            return ResponseEntity.ok(service.getInfo(token));
        }catch (DevhubException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),e.getMessage()));
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseDto> saveUser(@RequestBody UsersEntity usersEntity){
       try {
           return ResponseEntity.ok(new ResponseUserDto(this.userService.saveUser(usersEntity), true));
       }catch (UserException ex){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),ex.getMessage()));
       }
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ResponseDto> updateUser(@PathVariable(name = "id", required = true) long id,@RequestBody UsersEntity usersEntity){
        try{
            return ResponseEntity.ok(new ResponseUserDto(this.userService.updateUser(id,usersEntity), false));
        }catch (UserException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),ex.getMessage()));
        }

    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable(name = "id", required = true) long id ){
        try{
            return ResponseEntity.ok(new ResponseUserDto(userService.deleteUser(id), false));
        }catch (UserException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),ex.getMessage()));
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ResponseDto> getUserById(@PathVariable(name = "id", required = true) long id){

        try{
            return ResponseEntity.ok(new ResponseUserDto(userService.getUserById(id), false));
        }catch (UserException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),ex.getMessage()));
        }

    }

    @RequestMapping(value = "/find/{idRepo}/{idRole}", method = RequestMethod.GET)
    public ResponseEntity<ResponseUserDto> findAUserByIdRepoAndIdRole(@PathVariable(name = "idRepo") int idRepo, @PathVariable(name = "idRole") int idRole){
        try{
            return ResponseEntity.ok(new ResponseUserDto(userService.findUserByIdRepoAndIdRole(idRepo, idRole),true));
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<ResponseUserDto> getAllUsers(){
        try{
            return ResponseEntity.ok(new ResponseUserDto(userService.getAllUsers(),true));
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @RequestMapping(value = "/collabsFromRepo/{idRepo}", method = RequestMethod.GET)
    public ResponseEntity<ResponseUserDto> getAllCollaboratorsFromARepo(@PathVariable(name = "idRepo") int idRepo){
        try{
            return ResponseEntity.ok(new ResponseUserDto(userService.getAllCollaboratorsFromARepository(idRepo),true));
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseUserDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
