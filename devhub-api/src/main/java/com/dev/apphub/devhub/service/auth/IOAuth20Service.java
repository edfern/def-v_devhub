package com.dev.apphub.devhub.service.auth;

import com.dev.apphub.devhub.dto.ResponseDto;
import com.dev.apphub.devhub.dto.ResponseUserDto;
import com.dev.apphub.devhub.exception.DevhubException;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public interface IOAuth20Service {
    public String getAuthorizationUrl();
    public String getAccessToken(String code) throws IOException, ExecutionException, InterruptedException;
    public ResponseDto getInfo(String token) throws DevhubException;
}
