package com.dev.apphub.devhub.service.auth;

import com.github.scribejava.apis.GitHubApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Service
public class OAuth20Service {

    @Value("${github.application.client-id}")
    private String clientId;

    @Value("${github.application.callback}")
    private String callback;

    @Value("${github.application.client-secret}")
    private String clientSecret;


    public String getAccessToken(String code) throws IOException, ExecutionException, InterruptedException {
        try (com.github.scribejava.core.oauth.OAuth20Service service = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .build(GitHubApi.instance())) {
            final OAuth2AccessToken accessToken = service.getAccessToken(code);
            return accessToken.getAccessToken();
        }

    }

    public String getURLAuthentication() {
        final com.github.scribejava.core.oauth.OAuth20Service service  = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .build(GitHubApi.instance());
        return service.getAuthorizationUrl();
    }

}
