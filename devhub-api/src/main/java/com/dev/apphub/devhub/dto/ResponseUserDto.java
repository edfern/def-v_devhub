package com.dev.apphub.devhub.dto;

public class ResponseUserDto extends ResponseDto{

    private Object data;
    private boolean registered = false;
    private String avatar;

    public ResponseUserDto(int status, String message) {
        super(status, message);
    }

    public ResponseUserDto(Object data, boolean registered, String avatar){
        super(200, "");
        this.data = data;
        this.registered = registered;
        this.avatar = avatar;
    }

    public ResponseUserDto(Object data, boolean registered) {
        super(200, "");
        this.data = data;
        this.registered = registered;
    }

    public Object getData() {
        return data;
    }

    public boolean isRegistered() {
        return registered;
    }
}
