package com.dev.apphub.devhub.dao;

import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface IRepositoryUserRepository extends PagingAndSortingRepository<RepositoriesUsersEntity,Integer> {

    @Modifying
    @Query(value = "insert into repositories_users (id_repo,id_user) values (:id_repo,:id_user)",
            nativeQuery = true)
    void insertRepositoryUser(@Param("id_repo") int id_repo, @Param("id_user") int id_user);

    //RepositoriesUsersEntity findByIdOrderByIdIdDesc();

    @Modifying
    @Async
    @Query(value = "select * from repositories_users order by id desc limit 1",nativeQuery = true)
    Optional<RepositoriesUsersEntity> getLastRegister();


    @Query(value = "select * from (( repositories_users inner join repositories on repositories_users.id_repo = repositories.id) inner join users on repositories_users.id_user = users.id ) where repositories.name like %:name% and repositories.visible = 1", nativeQuery = true)
    List<RepositoriesUsersEntity> searchPublicReposByName(String name);

}
