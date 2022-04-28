package com.dev.apphub.devhub.dto;

import static com.dev.apphub.devhub.globlal.GlobalMessages.SUCCESS;

public class ResponseRepositoryDto extends ResponseDto{

    private Object data;

    public ResponseRepositoryDto(int status, String message) {
        super(status, message);
    }

    public ResponseRepositoryDto(Object data){
        super(200, SUCCESS);
        this.data = data;
    }


    public Object getData() {
        return data;
    }
}
