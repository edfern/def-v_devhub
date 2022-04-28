package com.dev.apphub.devhub.controller;


import com.dev.apphub.devhub.dto.ResponseFileDto;
import com.dev.apphub.devhub.exception.FileException;
import com.dev.apphub.devhub.service.file.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.dev.apphub.devhub.globlal.GlobalMessages.FILE_IS_NULL;

@CrossOrigin
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    FileService fileService;


    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public ResponseEntity<ResponseFileDto> uploadFile(MultipartFile file, String repo){
        try{
            if (file != null){
                return ResponseEntity.ok(fileService.uploadFile(file,repo));
            }else{
                throw new FileException(FILE_IS_NULL);
            }
        } catch (FileException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseFileDto(e.getMessage()));
        }
    }
}
