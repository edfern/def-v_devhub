package com.dev.apphub.devhub.service.directory;


import com.dev.apphub.devhub.exception.RepoException;
import org.springframework.stereotype.Service;

import java.io.File;

import static com.dev.apphub.devhub.globlal.GlobalMessages.ALREADY_EXIST_A_REPO_WHIT_THAT_NAME;
import static com.dev.apphub.devhub.globlal.GlobalMessages.FAIL_TO_CREATE_THE_DIRECTORY;
import static com.dev.apphub.devhub.globlal.GlobalParameters.ROOT_PAHT_REPORITORY;

@Service
public class DirectoryService {

    public String createDirectory(int id_user , String repo) throws RepoException {
        try{
            File newDirectory = new File(ROOT_PAHT_REPORITORY+"/"+id_user+"/"+repo);
            if (!newDirectory.exists()){
                if (newDirectory.mkdirs()) {
                    return newDirectory.getPath();
                }else{
                    throw new RepoException(FAIL_TO_CREATE_THE_DIRECTORY);
                }
            }else{
                throw new RepoException(ALREADY_EXIST_A_REPO_WHIT_THAT_NAME);
            }
        }catch (RepoException repoException){
            throw new RepoException();
        }
    }

    public boolean removeDirectory(File directory) throws RepoException {
        File[] contents;
        try {
            contents = directory.listFiles();
            if (contents != null) {
                for (File fileAux : contents) {
                    removeDirectory(fileAux);
                }
            }
            return directory.delete();
        }catch (Exception e){
            throw new RepoException(e.getMessage());
        }
    }

}
