package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.dev.apphub.devhub.globlal.GlobalMessages.NO_REPO_FOR_THE_USER;


@Component
public class RepoSearchByIdUser implements ISearchRepoByIdUser {

    @Autowired
    IRepositoryRepository repositoryRepository;

    @Override
    public List<RepositoriesEntity> search(int idUser) throws RepoException {
        List<RepositoriesEntity> responseFromServer;
        try {
            responseFromServer = repositoryRepository.getAllRepositoriesByIdUser(idUser, 1);
            if (responseFromServer.isEmpty()){
                throw new RepoException(NO_REPO_FOR_THE_USER);
            }else {
                return responseFromServer;
            }
        } catch (Exception e) {
            throw new RepoException(NO_REPO_FOR_THE_USER);
        }
    }
}
