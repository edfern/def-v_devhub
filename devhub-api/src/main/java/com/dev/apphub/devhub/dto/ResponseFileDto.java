package com.dev.apphub.devhub.dto;

public class ResponseFileDto extends ResponseDto{
    Object data;

    public ResponseFileDto(Object data) {
        super(200, "");
        this.data = data;
    }

    public ResponseFileDto(int status, String message) {
        super(status, message);
    }
}
