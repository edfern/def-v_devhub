package com.dev.apphub.devhub.service.auth;

import com.dev.apphub.devhub.dto.ResponseDto;
import com.dev.apphub.devhub.dto.ResponseUserDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;


@Service
public class OAuthNullService implements IOAuth20Service {
    @Override
    public String getAuthorizationUrl() {
        return "not available OAthService AuthorizationURl";
    }

    @Override
    public String getAccessToken(String code) throws IOException, ExecutionException, InterruptedException {
        return "not available OAthService Access Token";
    }

    @Override
    public ResponseDto getInfo(String token) {
        return new ResponseUserDto(500,"not available OAthService info");
    }
}
