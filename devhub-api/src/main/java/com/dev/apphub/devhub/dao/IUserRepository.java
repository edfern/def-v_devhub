package com.dev.apphub.devhub.dao;

import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.model.entity.RepositoriesUsersEntity;
import com.dev.apphub.devhub.model.entity.UsersEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends PagingAndSortingRepository<UsersEntity,Integer> {
    @Modifying
    @Query(value = "insert into users (name,username,email) values (:name,:username,:email)",
    nativeQuery = true)
    void insertUser(@Param("name") String name, @Param("username") String username, @Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "update users u set u.name= :name, u.username= :username, u.email= :email where u.id= :id", nativeQuery = true)
    void updateUser(@Param("id") int id,@Param("name") String name, @Param("username") String username, @Param("email") String email);

    boolean existsByEmail(String email);
    boolean existsById(int id);

    @Override
    Optional<UsersEntity> findById(Integer integer);

    UsersEntity findByEmail(String email);


    //UsersEntity findByRepositoriesUsersEntities_IdRepoAndRepositoriesUsersEntities_IdRoleRepo(int idRepo, int idRole);

    @Query(value = "select * from users inner join repositories_users on repositories_users.id_user = users.id and repositories_users.id_repo = :idRepo and repositories_users.id_role_repo = :idRole", nativeQuery = true)
    UsersEntity findAUserByIdRepoAndIdRole(int idRepo, int idRole);

    List<UsersEntity> findAllBy();

    @Query(value = "select * from users inner join repositories_users on users.id = repositories_users.id_user where repositories_users.id_repo = :idRepo and repositories_users.id_role_repo = 2", nativeQuery = true)
    List<UsersEntity> findAllCollaboratorsUsersInARepository(int idRepo);
}
