package com.dev.apphub.devhub.service.repo_user;


import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.dao.IRepositoryUserRepository;
import com.dev.apphub.devhub.dto.ResponseDto;
import com.dev.apphub.devhub.dto.ResponseUserDto;
import com.dev.apphub.devhub.exception.RepositoryUserException;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.dev.apphub.devhub.globlal.GlobalMessages.*;

@Service
public class RepositoryUserService {

    @Autowired
    IRepositoryUserRepository repositoryUserRepository;

    @Autowired
    IRepositoryRepository repositoryRepository;

    public RepositoriesUsersEntity createRepositoryUser(RepositoriesUsersEntity repositoriesUsersEntity) throws RepositoryUserException {
        try{
             return repositoryUserRepository.save(repositoriesUsersEntity);
        }catch (Exception exception){
            throw new RepositoryUserException(exception.getMessage());
        }
    }

    public ResponseDto addACollaborator(RepositoriesUsersEntity repositoriesUsersEntity) throws RepositoryUserException {
        try{
            if (repositoryRepository.existsById(repositoriesUsersEntity.getIdRepo())){
                repositoriesUsersEntity.setIdRoleRepo(2);
                repositoryUserRepository.save(repositoriesUsersEntity);
                return new ResponseDto(200,COLLABORATOR_ADDED);
            }else{
                throw new RepositoryUserException(CALLABORATOR_NOT_VALID);
            }
        }catch (Exception e){
            throw new RepositoryUserException(ERROR_ADDING_THE_COLLABORATOR + e.getMessage());
        }
    }

}
