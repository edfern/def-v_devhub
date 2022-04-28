package com.dev.apphub.devhub.dto;

import com.dev.apphub.devhub.model.entity.RepositoriesEntity;

public class RequestRepoDto {
    RepositoriesEntity repositoriesEntity;
    String username;

    public RepositoriesEntity getRepositoriesEntity() {
        return repositoriesEntity;
    }

    public String getUsername() {
        return username;
    }

    public void setRepositoriesEntity(RepositoriesEntity repositoriesEntity) {
        this.repositoriesEntity = repositoriesEntity;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
