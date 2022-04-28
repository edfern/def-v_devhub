package com.dev.apphub.devhub.dao;


import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public interface IRepositoryRepository extends PagingAndSortingRepository<RepositoriesEntity,Integer> {

    boolean existsByPath(String path);
    boolean existsByName(String name);

    @Transactional
    @Modifying
    @Query(value = "update repositories set path= :path, name = :name , visible = :visible , description = :description where id = :id", nativeQuery = true)
    void updateRepository(@Param("id") int id, @Param("name") String name, @Param("path") String path,@Param("visible") boolean visible, @Param("description") String description);


    @Override
    Optional<RepositoriesEntity> findById(Integer id);


    @Modifying
    @Async
    @Query(value = "select * from repositories order by id desc limit 1",nativeQuery = true)
    Optional<RepositoriesEntity> getLastRegister();

    @Query(value = "select * from repositories inner join repositories_users on repositories.id = repositories_users.id_repo where repositories_users.id_user = :id and repositories_users.id_role_repo = :idRole", nativeQuery = true)
    List<RepositoriesEntity> getAllRepositoriesByIdUser(@Param("id") int id, @Param("idRole") int idRole) throws DevhubException, SQLException;

    @Query(value = "select * from repositories inner join repositories_users on repositories.id = repositories_users.id_repo where repositories_users.id_user = :id and repositories.name = :name ", nativeQuery = true)
    RepositoriesEntity getRepositoryByIdUserAndName(@Param("id") int id, @Param("name") String name) throws DevhubException, SQLException;

    List<RepositoriesEntity> findAllByNameContainingAndVisibleIs(String name, boolean visible);

    RepositoriesEntity findByName(String name);

    @Query(value = "select repositories.id, repositories.name, repositories.description, repositories.path, repositories.visible from (( repositories_users inner join repositories on repositories_users.id_repo = repositories.id) inner join users on repositories_users.id_user = users.id ) where repositories.name like %:name% and repositories.visible = 1", nativeQuery = true)
    List<RepositoriesEntity> searchPublicReposByName(String name);

    @Query(value = "select * from repositories inner join repositories_users on repositories.id = repositories_users.id_repo where repositories_users.id_user = :idUser and repositories_users.id_role_repo = 2", nativeQuery = true)
    List<RepositoriesEntity> searchRepositoriesLikeCollaborator(int idUser);


}