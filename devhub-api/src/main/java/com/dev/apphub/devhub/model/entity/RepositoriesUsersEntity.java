package com.dev.apphub.devhub.model.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "repositories_users", schema = "devhub", catalog = "")
public class RepositoriesUsersEntity {
    private int id;
    private int idRepo;
    private int idUser;
    private int idRoleRepo = 1;

    @ManyToOne
    @JoinColumn(name="id_repo", nullable = false)
    private RepositoriesEntity repositories;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private UsersEntity usersEntity;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "id_repo")
    public int getIdRepo() {
        return idRepo;
    }

    public void setIdRepo(int idRepo) {
        this.idRepo = idRepo;
    }

    @Basic
    @Column(name = "id_user")
    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    @Basic
    @Column(name = "id_role_repo")
    public int getIdRoleRepo() {
        return idRoleRepo;
    }

    public void setIdRoleRepo(int idRoleRepo) {
        this.idRoleRepo = idRoleRepo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RepositoriesUsersEntity that = (RepositoriesUsersEntity) o;
        return id == that.id && idRepo == that.idRepo && idUser == that.idUser && idRoleRepo == that.idRoleRepo;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, idRepo, idUser, idRoleRepo);
    }
}
