package com.dev.apphub.devhub.service.repo;


import com.dev.apphub.devhub.dao.IRepositoryRepository;
import com.dev.apphub.devhub.dto.ResponseRepoUserDto;
import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.exception.RepositoryUserException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import com.dev.apphub.devhub.service.repo_user.RepositoryUserService;
import com.dev.apphub.devhub.service.directory.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import static com.dev.apphub.devhub.globlal.GlobalMessages.*;


@Service
public class RepositoryService {

    @Autowired
    IRepositoryRepository repositoryRepository;

    @Autowired
    RepositoryUserService repositoryUserService;

    @Autowired
    DirectoryService directoryService;


    public ResponseRepoUserDto linkUserToRepository(RepositoriesEntity repositoriesEntity, int id_user) throws RepositoryUserException {
        RepositoriesUsersEntity repositoriesUsersEntity = new RepositoriesUsersEntity();
        RepositoriesEntity reposeRepositoryEntity;
        RepositoriesEntity repositoryAux;

        try {
            repositoryAux = repositoryRepository.getRepositoryByIdUserAndName(id_user,repositoriesEntity.getName());
            if ( repositoryAux != null  ){
                throw new RepoException(THE_REPOSITORY_ALREADY_EXIST);
            }else{
                repositoriesEntity.setPath(directoryService.createDirectory(id_user, repositoriesEntity.getName()));
                reposeRepositoryEntity = this.saveRepository(repositoriesEntity);

                repositoriesUsersEntity.setIdRepo(reposeRepositoryEntity.getId());
                repositoriesUsersEntity.setIdUser(id_user);

                return new ResponseRepoUserDto(200, LINK_USER_TO_REPOSITORY_SUCCESS, reposeRepositoryEntity, repositoryUserService.createRepositoryUser(repositoriesUsersEntity));            }

        } catch (DevhubException | SQLException e) {
            throw new RepositoryUserException(e.getMessage());
        }
    }

    public RepositoriesEntity saveRepository(RepositoriesEntity repositoriesEntity) throws DevhubException {
        try {
                return this.repositoryRepository.save(repositoriesEntity);
        } catch (Exception e) {
            throw new DevhubException(e.getMessage());
        }
    }

    public RepositoriesEntity updateRepository(int id, RepositoriesEntity repositoriesEntity) throws RepoException {
        try {
            if (repositoryRepository.existsById(id)) {
                repositoryRepository.updateRepository(id, repositoriesEntity.getName(), repositoriesEntity.getPath(),
                        repositoriesEntity.getVisible(), repositoriesEntity.getDescription());
                return repositoryRepository.findById(id).get();
            } else
                throw new RepoException();
        } catch (DevhubException e) {
            throw new RepoException(e.getMessage());
        }
    }

    public boolean deleteRepository(int id) throws RepoException {
        RepositoriesEntity repositoriesEntityFromDB;
        File file;
        try {
            repositoriesEntityFromDB = repositoryRepository.findById(id).get();
            if (repositoriesEntityFromDB != null) {
                file = new File(repositoriesEntityFromDB.getPath());
                directoryService.removeDirectory(file);
                repositoryRepository.deleteById(id);
                return true;
            } else {
                throw new RepoException(THE_REPOSITORY_DOESNT_EXIST);
            }
        } catch (Exception e) {
            throw new RepoException(e.getMessage());
        }
    }

    public RepositoriesEntity findARepositoryByName(String repository) throws RepoException {
        RepositoriesEntity repositoriesEntity;
        try {
            repositoriesEntity = repositoryRepository.findByName(repository);
            if (repositoriesEntity != null) {
                return repositoriesEntity;
            } else {
                throw new RepoException(NO_EXIST_ANY_REPO_WITH_THAT_NAME);
            }
        } catch (RepoException e) {
            throw new RepoException(e.getMessage());
        }
    }

    public List<RepositoriesEntity> search(ISearchRepoByIdUser searchRepo, int idUser) throws RepoException {
        return searchRepo.search(idUser);
    }

    public RepositoriesEntity search(ISearchRepoByIdUserAndRepoName searchRepoByIdUserAndRepoName, int idUser, String repo) throws RepoException {
        return searchRepoByIdUserAndRepoName.search(idUser,repo);
    }

    public List<RepositoriesEntity> search(ISearchPublicReposByName searchPublicReposByName, String repoName) throws RepoException {
        return searchPublicReposByName.search(repoName);
    }

    public List<RepositoriesUsersEntity> search(ISearchPublicRepos searchPublicRepos, String name) throws RepoException {
        return searchPublicRepos.search(name);
    }

    public List<RepositoriesEntity> search(ISearchReposLikeCollaborator searchReposLikeCollaborator, int idUser) throws RepoException {
        return searchReposLikeCollaborator.search(idUser);
    }
}