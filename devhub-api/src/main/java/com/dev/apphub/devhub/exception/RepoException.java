package com.dev.apphub.devhub.exception;

public class RepoException extends  DevhubException{
    public final static String MESSAGE = "El repositorio ya existe";
    public RepoException(){
        super(MESSAGE);
    }
    public RepoException(String message) {
        super(message);
    }
}
