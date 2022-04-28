package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;

import java.util.List;

public interface ISearchPublicRepos {
    List<RepositoriesUsersEntity> search(String name) throws RepoException;
}
