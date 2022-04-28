package com.dev.apphub.devhub.controller;


import com.dev.apphub.devhub.dto.*;
import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.exception.RepositoryUserException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import com.dev.apphub.devhub.service.repo.*;
import com.dev.apphub.devhub.service.repo_user.RepositoryUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/repo")
public class RepoController {

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    RepoSearchByIdUser repoSearchByIdUser;

    @Autowired
    RepoSearchByIdUserAndName repoSearchByIdUserAndName;

    @Autowired
    RepoSearchPublicByRepoName repoSearchPublicByRepoName;

    @Autowired
    SearchPublicRepos searchPublicRepos;

    @Autowired
    RepositoryUserService repositoryUserService;

    @Autowired
    RepoSearchLikeCollaborators repoSearchLikeCollaborators;

    @RequestMapping(value = "/create/{id}",method = RequestMethod.POST)
    public ResponseEntity<ResponseDto> createRepository(@PathVariable(value = "id", required = true) int id_user,@RequestBody RepositoriesEntity repositoriesEntity){
        try{
            return ResponseEntity.ok(this.repositoryService.linkUserToRepository(repositoriesEntity,id_user));
        } catch (DevhubException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),ex.getMessage()));        }
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ResponseDto> updateRepository(@PathVariable(name = "id", required = true) int id,@RequestBody RepositoriesEntity repositoriesEntity){
        try {
            return ResponseEntity.ok(new ResponseRepositoryDto(this.repositoryService.updateRepository(id,repositoriesEntity)));
        } catch (RepoException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),e.getMessage()));
        }
    }
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseDto> deleteRepository(@PathVariable(name = "id", required = true) int id){
        try{
            return  ResponseEntity.ok(new ResponseRepositoryDto(repositoryService.deleteRepository(id)));
        }catch (RepoException exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),exception.getMessage()));
        }
    }

    @RequestMapping(value = "/search/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<ResponseRepositoryDto> getAllUsersRepositoriesByIdUser(@PathVariable(name = "idUser") int id_user){
        try{
            return  ResponseEntity.ok(new ResponseRepositoryDto(repositoryService.search(repoSearchByIdUser,id_user)));
        }catch (DevhubException exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),exception.getMessage()));
        }
    }

    @RequestMapping(value = "/collaborators/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<ResponseRepositoryDto> getAllUsersRepositoriesLikeCollaborators(@PathVariable(name = "idUser") int id_user){
        try{
            return  ResponseEntity.ok(new ResponseRepositoryDto(repositoryService.search(repoSearchLikeCollaborators,id_user)));
        }catch (DevhubException exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),exception.getMessage()));
        }
    }

    @RequestMapping(value = "/search/{idUser}/{repoName}", method = RequestMethod.GET)
    public ResponseEntity<ResponseRepositoryDto> getUsersRepositoryByIdUserAndRepoName(@PathVariable(name = "idUser") int idUser, @PathVariable(name = "repoName") String repoName){
        try{
            return  ResponseEntity.ok(new ResponseRepositoryDto(repositoryService.search(repoSearchByIdUserAndName,idUser,repoName)));
        }catch (DevhubException exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),exception.getMessage()));
        }
    }

    @RequestMapping(value = "/find/{name}", method = RequestMethod.GET)
    public ResponseEntity<ResponseRepositoryDto> findPublicRepositories(@PathVariable(name = "name") String name){
        try{
            return ResponseEntity.ok(new ResponseRepositoryDto(repositoryService.search(repoSearchPublicByRepoName,name)));
        } catch (DevhubException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseRepositoryDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),e.getMessage()));
        }
    }

    @RequestMapping(value = "/add/collaborator",method = RequestMethod.POST)
    public ResponseEntity<ResponseDto> addACollaboratorToRepository(@RequestBody RepositoriesUsersEntity repositoriesUsersEntity){
        try{
            return ResponseEntity.ok(repositoryUserService.addACollaborator(repositoriesUsersEntity));
        } catch (RepositoryUserException repositoryUserException) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),repositoryUserException.getMessage()));
        }
    }
}
