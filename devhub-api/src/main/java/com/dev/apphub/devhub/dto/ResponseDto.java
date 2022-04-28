package com.dev.apphub.devhub.dto;


public class ResponseDto {

    private int status;
    private String message;

    public ResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
