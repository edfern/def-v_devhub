package com.dev.apphub.devhub.controller;

import com.dev.apphub.devhub.service.auth.OAuthGitHubService;
import com.dev.apphub.devhub.service.auth.OAuthGoogleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.ExecutionException;


@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    OAuthGoogleService googleService;

    @Autowired
    OAuthGitHubService gitHubService;



    @RequestMapping(value = "/github", method = RequestMethod.GET)
    public String getAuthorizationURLGithub() {
        return this.gitHubService.getAuthorizationUrl();
    }

    @RequestMapping(value = "/github/callback", method = RequestMethod.GET)
    public String callbackGithub(@RequestParam("code") String code) throws IOException, ExecutionException, InterruptedException {
        return this.gitHubService.getAccessToken(code);
    }

    @RequestMapping(value = "/google", method = RequestMethod.GET)
    public String getAuthorizationURLGoogle() {
        return this.googleService.getAuthorizationUrl();
    }

    @RequestMapping(value = "/google/callback", method = RequestMethod.GET)
    public String callbackGoogle(@RequestParam("code") String code) throws IOException, ExecutionException, InterruptedException {
        return this.googleService.getAccessToken(code);
    }

}