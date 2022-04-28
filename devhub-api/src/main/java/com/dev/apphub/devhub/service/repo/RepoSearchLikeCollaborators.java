package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.dev.apphub.devhub.globlal.GlobalMessages.NO_DIRECTORIES_LIKE_COLLABORATOR;



@Component
public class RepoSearchLikeCollaborators implements ISearchReposLikeCollaborator{

    @Autowired
    IRepositoryRepository repositoryRepository;

    @Override
    public List<RepositoriesEntity> search(int idUser) throws RepoException {
        List<RepositoriesEntity> repositoriesEntitiesFromDB;
        try{
            repositoriesEntitiesFromDB = repositoryRepository.searchRepositoriesLikeCollaborator(idUser);
            if (repositoriesEntitiesFromDB.isEmpty()){
                throw new RepoException(NO_DIRECTORIES_LIKE_COLLABORATOR);
            }else{
                return repositoriesEntitiesFromDB;
            }
        }catch (RepoException e){
            throw new RepoException(e.getMessage());
        }
    }
}