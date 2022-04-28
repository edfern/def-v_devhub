package com.dev.apphub.devhub.service.file;


import com.dev.apphub.devhub.dto.ResponseFileDto;
import com.dev.apphub.devhub.exception.FileException;
import com.dev.apphub.devhub.exception.RepoException;
import com.dev.apphub.devhub.model.entity.RepositoriesEntity;
import com.dev.apphub.devhub.service.repo.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.dev.apphub.devhub.globlal.GlobalMessages.DIRECTORY_NOT_FOUND;
import static com.dev.apphub.devhub.globlal.GlobalMessages.FILE_UPLOADED_SUCCESSFULLY;

@Service
public class FileService{

    @Autowired
    RepositoryService repositoryService;

    public ResponseFileDto uploadFile(MultipartFile multipartFile, String repository) throws FileException {
        RepositoriesEntity repositoriesEntity;
        File currentDirectory;
        File file;
        try {
            repositoriesEntity = repositoryService.findARepositoryByName(repository);
            currentDirectory = new File(repositoriesEntity.getPath());
            if (currentDirectory.exists()){
                Files.copy(multipartFile.getInputStream(), Paths.get(currentDirectory.getPath(), multipartFile.getOriginalFilename()));
                return new ResponseFileDto(FILE_UPLOADED_SUCCESSFULLY);
            }else{
                throw new FileException(DIRECTORY_NOT_FOUND);
            }

        } catch (RepoException | IOException e) {
            throw new FileException(e.getMessage());
        }
    }

}
