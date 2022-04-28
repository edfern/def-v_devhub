package com.dev.apphub.devhub.exception;

public class RepositoryUserException extends DevhubException{

    private static final String MESSAGE = "El registro ya existe";
    public RepositoryUserException(String message) {
        super(message);
    }
    public RepositoryUserException(){
        super(MESSAGE);
    }
}
