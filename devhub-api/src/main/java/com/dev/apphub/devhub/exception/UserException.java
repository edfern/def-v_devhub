package com.dev.apphub.devhub.exception;

public class UserException extends DevhubException{

    public final static String MESSAGE = "Usuario ya registrado";
    public UserException(){
        super(MESSAGE);
    }
    public UserException(String message) {
        super(message);
    }

}
