package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.dao.IRepositoryUserRepository;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.dev.apphub.devhub.globlal.GlobalMessages.NO_PUBLIC_REPO_WITH_THAT_NAME;


@Component
public class SearchPublicRepos implements ISearchPublicRepos{

    @Autowired
    IRepositoryUserRepository repositoryUserRepository;

    @Override
    public List<RepositoriesUsersEntity> search(String name) throws RepoException {
        List<RepositoriesUsersEntity> repositoriesUsersEntities;
        try {
            repositoriesUsersEntities =  repositoryUserRepository.searchPublicReposByName(name);
            if (!repositoriesUsersEntities.isEmpty()){
                return  repositoriesUsersEntities;
            }else{
                throw new RepoException(NO_PUBLIC_REPO_WITH_THAT_NAME);
            }
        } catch (Exception e) {
            throw new RepoException(e.getMessage());
        }
    }
}
