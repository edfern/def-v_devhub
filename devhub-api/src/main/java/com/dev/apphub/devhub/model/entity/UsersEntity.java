package com.dev.apphub.devhub.model.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users", schema = "devhub", catalog = "")
public class UsersEntity {
    private int id;
    private String name;
    private String username;
    private String email;
    private Timestamp registrationDate;
    private String avatar;

    @OneToMany(targetEntity = RepositoriesUsersEntity.class, mappedBy = "idUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RepositoriesUsersEntity> repositoriesUsersEntities;

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
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "registration_date")
    public Timestamp getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Timestamp registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersEntity that = (UsersEntity) o;
        return id == that.id && Objects.equals(name, that.name) && Objects.equals(username, that.username) && Objects.equals(email, that.email) && Objects.equals(registrationDate, that.registrationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, username, email, registrationDate);
    }

    @Basic
    @Column(name = "avatar")
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
