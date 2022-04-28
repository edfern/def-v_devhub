package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.dev.apphub.devhub.globlal.GlobalMessages.NO_PUBLIC_REPO_WITH_THAT_NAME;


@Component
public class RepoSearchPublicByRepoName implements ISearchPublicReposByName {

    @Autowired
    IRepositoryRepository repositoryRepository;


    @Override
    public List<RepositoriesEntity> search(String repoName) throws RepoException {
        List<RepositoriesEntity> repositoriesEntities;
        try {
            repositoriesEntities =  repositoryRepository.searchPublicReposByName(repoName);
            if (!repositoriesEntities.isEmpty()){
                return  repositoriesEntities;
            }else{
                throw new RepoException(NO_PUBLIC_REPO_WITH_THAT_NAME);
            }
        } catch (Exception e) {
            throw new RepoException(e.getMessage());
        }
    }
}
