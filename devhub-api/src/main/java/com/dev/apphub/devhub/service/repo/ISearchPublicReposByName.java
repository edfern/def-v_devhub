package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;

import java.util.List;

public interface ISearchPublicReposByName {
    List<RepositoriesEntity> search(String repoName) throws RepoException;
}
