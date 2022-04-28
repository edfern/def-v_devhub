package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.dev.apphub.devhub.globlal.GlobalMessages.DIRECTORY_NOT_FOUND;
import static com.dev.apphub.devhub.globlal.GlobalMessages.NO_REPO_FOR_THE_USER;


@Component
public class RepoSearchByIdUserAndName implements ISearchRepoByIdUserAndRepoName {

    @Autowired
    IRepositoryRepository repositoryRepository;


    @Override
    public RepositoriesEntity search(int idUser, String repo) throws RepoException {
        RepositoriesEntity responseFromServer;
        try {

            responseFromServer = repositoryRepository.getRepositoryByIdUserAndName(idUser, repo);
            if(responseFromServer == null){
                throw new RepoException(DIRECTORY_NOT_FOUND);
            }else{
                return responseFromServer;
            }
        } catch (Exception e) {
            throw new RepoException(NO_REPO_FOR_THE_USER);
        }
    }
}
