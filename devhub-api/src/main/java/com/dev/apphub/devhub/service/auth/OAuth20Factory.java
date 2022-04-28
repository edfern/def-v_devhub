package com.dev.apphub.devhub.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OAuth20Factory {

    @Autowired
    OAuthGoogleService oAuthGoogleService;

    @Autowired
    OAuthGitHubService oAuthGitHubService;

    @Autowired
    OAuthNullService oAuthNullService;

    public IOAuth20Service getOAuth20(String type){
        switch (type){
            case "google": return oAuthGoogleService;
            case "github": return oAuthGitHubService;
            default: return oAuthNullService;
        }
    }
}
