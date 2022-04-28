package com.dev.apphub.devhub.service.user;


import com.dev.apphub.devhub.dao.IUserRepository;
import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.exception.UserException;
import com.dev.apphub.devhub.model.entity.UsersEntity;
import com.github.scribejava.apis.GitHubApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.dev.apphub.devhub.globlal.GlobalMessages.*;

@Service
public class UserService {
    private static final String PROTECTED_RESOURCE_URL = "https://api.github.com/user";

    @Value("${github.application.client-id}")
    private String clientId;

    @Value("${github.application.callback}")
    private String callback;

    @Value("${github.application.client-secret}")
    private String clientSecret;

    @Autowired
    IUserRepository iUserRepository;


    public Object getUserInfo(String token){
        try (OAuth20Service service = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .build(GitHubApi.instance())) {

            final OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL);
            service.signRequest(token, request);

            Response response = service.execute(request);
            System.out.println(response.getCode());
            System.out.println(response.getBody());
            return response.getBody();

        } catch (IOException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    public UsersEntity saveUser(UsersEntity usersEntity) throws UserException {
        try {
            if(iUserRepository.existsByEmail(usersEntity.getEmail())){
                throw new UserException();
            }
            LocalDateTime now = LocalDateTime.now();
            usersEntity.setRegistrationDate(Timestamp.valueOf(now));
            usersEntity = iUserRepository.save(usersEntity);
            return usersEntity;
        }catch (UserException ex){
            throw new UserException();
        }
    }


    public UsersEntity updateUser(long id, UsersEntity usersEntity) throws UserException {
        try {
            if(iUserRepository.existsById(Math.toIntExact(id))){
                iUserRepository.updateUser(Math.toIntExact(id),usersEntity.getName(),usersEntity.getUsername(),usersEntity.getEmail());
                return iUserRepository.findById(Math.toIntExact(id)).get();
            }else{
                throw new UserException(USER_NOT_FOUND);
            }
        }catch (DevhubException ex){
             throw new UserException(ex.getMessage());
        }
    }

    public boolean deleteUser(long id) throws UserException {
        try{
            if (iUserRepository.existsById(Math.toIntExact(id))){
                iUserRepository.deleteById(Math.toIntExact(id));
                return true;
            }else {
                throw new UserException(String.format(NOT_PERSON,"usuario con el id: {"+ id+" }"));
            }
        }catch (DevhubException ex){
            throw new UserException(ex.getMessage());
        }
    }

    public UsersEntity getUserById(long id) throws UserException {
        try {

            if(iUserRepository.findById(Math.toIntExact(id)).isPresent()){
                return iUserRepository.findById(Math.toIntExact(id)).get();
            }else{
                throw new UserException("No se ha encontrado al usuario");
            }

        }catch (DevhubException ex){
            throw new UserException(ex.getMessage());
        }
    }

    public UsersEntity findUserByIdRepoAndIdRole(int idRepo, int idRole) throws UserException {
        UsersEntity userFromDB;
        try{
            userFromDB = iUserRepository.findAUserByIdRepoAndIdRole(idRepo,idRole);
            if (userFromDB ==null){
                throw new UserException(GET_USER_INFO_FAIL);
            }else{
                return userFromDB;
            }
        }catch (UserException e){
            throw new UserException(e.getMessage());
        }
    }

    public List<UsersEntity> getAllUsers() throws UserException {
        List<UsersEntity> usersEntitiesFromDB;
        try{
            usersEntitiesFromDB = iUserRepository.findAllBy();
            if (usersEntitiesFromDB.isEmpty()){
                throw new UserException(NO_USERS_FOUND_IN_DATA_BASE);
            }else {
                return usersEntitiesFromDB;
            }
        }catch (Exception e){
            throw new UserException(e.getMessage());
        }
    }

    public List<UsersEntity> getAllCollaboratorsFromARepository(int idRepo) throws UserException {
        List<UsersEntity> usersEntitiesFromDB;
        try{
            usersEntitiesFromDB = iUserRepository.findAllCollaboratorsUsersInARepository(idRepo);
            if (usersEntitiesFromDB.isEmpty()){
                throw new UserException(NO_USERS_FOUND_IN_DATA_BASE);
            }else{
                return usersEntitiesFromDB;
            }
        }catch (Exception e){
            throw new UserException(e.getMessage());
        }
    }

    /*
    private void validateParams(HttpServletRequest request) {
        if (request.getParameter(USER_NAME) == null || request.getParameter(USER_NAME).isEmpty()) {
            throw new DevhubException(400, String.format(NOT_PARAMERS, NAME));
        }
        if (request.getParameter(USER_USERNAME) == null || request.getParameter(USER_USERNAME).isEmpty()) {
            throw new DevhubException(400, String.format(NOT_PARAMERS, USERNAME));
        }
        if (request.getParameter(USER_EMAIL) == null || request.getParameter(USER_EMAIL).isEmpty()) {
            throw new DevhubException(400, String.format(NOT_PARAMERS, EMAIL));
        }
    }

    private void validateId(HttpServletRequest request){
        if(request.getParameter(ID)==null || request.getParameter(ID).isEmpty()){
            throw new DevhubException(400, String.format(NOT_PARAMERS,ID));
        }
    }

     */



}
