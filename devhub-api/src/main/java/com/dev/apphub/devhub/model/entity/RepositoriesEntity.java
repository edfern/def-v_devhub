package com.dev.apphub.devhub.model.entity;


import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "repositories", schema = "devhub", catalog = "")
public class RepositoriesEntity {
    private int id;
    private String path;
    private String name;
    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean visible;
    private String description;
    @OneToMany(targetEntity=RepositoriesUsersEntity.class, mappedBy="idRepo",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RepositoriesUsersEntity> repositoriesUsersEntitySet;


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
    @Column(name = "path")
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
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
    @Column(name = "visible")
    public boolean getVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
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
        RepositoriesEntity that = (RepositoriesEntity) o;
        return id == that.id && visible == that.visible && Objects.equals(path, that.path) && Objects.equals(name, that.name) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, path, name, visible, description);
    }
}
