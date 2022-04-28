package com.dev.apphub.devhub.dto;

import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;

public class ResponseRepoUserDto extends ResponseDto{
    private RepositoriesEntity repositoriesEntity;
    private RepositoriesUsersEntity repositoriesUsersEntity;

    public ResponseRepoUserDto(int status, String message) {
        super(status, message);
    }

    public ResponseRepoUserDto(int status, String message, RepositoriesEntity repositoriesEntity, RepositoriesUsersEntity repositoriesUsersEntity) {
        super(status, message);
        this.repositoriesEntity = repositoriesEntity;
        this.repositoriesUsersEntity = repositoriesUsersEntity;
    }

    public RepositoriesEntity getRepositoriesEntity() {
        return repositoriesEntity;
    }

    public RepositoriesUsersEntity getRepositoriesUsersEntity() {
        return repositoriesUsersEntity;
    }
}
