package com.dev.apphub.devhub.service.auth;

import com.dev.apphub.devhub.dao.IUserRepository;
import com.dev.apphub.devhub.dto.ResponseOauthServer;
import com.dev.apphub.devhub.dto.ResponseUserDto;
import com.dev.apphub.devhub.exception.DevhubException;
import com.dev.apphub.devhub.model.entity.UsersEntity;
import com.github.scribejava.apis.GitHubApi;
import com.github.scribejava.core.builder.ScopeBuilder;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class OAuthGitHubService implements IOAuth20Service{

    private static final String PROTECTED_RESOURCE_URL = "https://api.github.com/user";
    @Value("${github.application.client-id}")
    private String clientId;

    @Value("${github.application.callback}")
    private String callback;

    @Value("${github.application.client-secret}")
    private String clientSecret;

    @Value("${github.application.scope-user}")
    private String scopeUser;

    @Value("${github.application.scope-email}")
    private String scopeEmail;

    @Autowired
    IUserRepository iUserRepository;

    @Override
    public String getAuthorizationUrl() {
        List<String> scopes = new ArrayList<>();
        scopes.add(this.scopeUser);
        scopes.add(this.scopeEmail);
        final OAuth20Service service  = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .defaultScope( new ScopeBuilder().withScopes(scopes))
                .build(GitHubApi.instance());
        return service.getAuthorizationUrl();
    }

    @Override
    public String getAccessToken(String code) throws IOException, ExecutionException, InterruptedException{
        try (OAuth20Service service = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .build(GitHubApi.instance())) {
            final OAuth2AccessToken accessToken = service.getAccessToken(code);
            return accessToken.getAccessToken();
        }
    }

    @Override
    public ResponseUserDto getInfo(String token) throws DevhubException {
        try (OAuth20Service service = new ServiceBuilder(this.clientId)
                .apiSecret(this.clientSecret)
                .callback(this.callback)
                .build(GitHubApi.instance())) {

            OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL);
            service.signRequest(token, request);

            Response response = service.execute(request);
            ResponseOauthServer authUserDTO = new Gson().fromJson(response.getBody(), ResponseOauthServer.class);

            if (iUserRepository.existsByEmail(authUserDTO.getHtml_url())){
                UsersEntity userInfo = iUserRepository.findByEmail(authUserDTO.getHtml_url());
                    return new ResponseUserDto(userInfo,true, authUserDTO.getAvatar_url());
            }else{
                return new ResponseUserDto(response.getBody(),false, null);
            }
        } catch (IOException | ExecutionException | InterruptedException e) {
            throw new DevhubException(e.getMessage());
        }
    }
}
