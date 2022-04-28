package com.dev.apphub.devhub.model.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "roles_repository", schema = "devhub", catalog = "")
public class RolesRepositoryEntity {
    private int id;
    private String roleRepo;
    private String description;

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
    @Column(name = "role_repo")
    public String getRoleRepo() {
        return roleRepo;
    }

    public void setRoleRepo(String roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolesRepositoryEntity that = (RolesRepositoryEntity) o;
        return id == that.id && Objects.equals(roleRepo, that.roleRepo) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roleRepo, description);
    }
}
