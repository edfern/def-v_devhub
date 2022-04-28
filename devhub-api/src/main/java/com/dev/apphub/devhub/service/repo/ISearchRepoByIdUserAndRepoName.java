package com.dev.apphub.devhub.service.repo;

import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;

public interface ISearchRepoByIdUserAndRepoName {
    RepositoriesEntity search(int idUser, String repo) throws RepoException;
}
