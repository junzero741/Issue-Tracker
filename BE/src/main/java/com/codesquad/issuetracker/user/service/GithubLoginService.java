package com.codesquad.issuetracker.user.service;

import com.codesquad.issuetracker.user.dto.AccessTokenRequest;
import com.codesquad.issuetracker.user.dto.AccessTokenResponse;
import com.codesquad.issuetracker.user.dto.GithubUser;
import com.codesquad.issuetracker.user.dto.JwtResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class GithubLoginService {

    private final String WEB_CLIENT_ID;
    private final String WEB_CLIENT_SECRET;
    private final String WEB_REDIRECT_URI;
    private final String ACCESS_TOKEN_URI;
    private final String USER_URI;

    private final JwtUtils jwtUtils;

    private final Logger logger = LoggerFactory.getLogger(GithubLoginService.class);

    public GithubLoginService(@Value("${auth.github.web.clientId}") String WEB_CLIENT_ID,
                       @Value("${auth.github.web.clientSecret}") String WEB_CLIENT_SECRET,
                       @Value("${auth.github.web.redirectUri}") String WEB_REDIRECT_URI,
                       @Value("${auth.github.accessTokenUri}") String ACCESS_TOKEN_URI,
                       @Value("${auth.github.userUri}") String USER_URI,
                       JwtUtils jwtUtils) {
        this.WEB_CLIENT_ID = WEB_CLIENT_ID;
        this.WEB_CLIENT_SECRET = WEB_CLIENT_SECRET;
        this.WEB_REDIRECT_URI = WEB_REDIRECT_URI;
        this.ACCESS_TOKEN_URI = ACCESS_TOKEN_URI;
        this.USER_URI = USER_URI;
        this.jwtUtils = jwtUtils;
    }

    public JwtResponse issueToken(String code) {
        RestTemplate request = new RestTemplate();
        AccessTokenResponse accessToken = getAccessToken(code, request)
                .orElseThrow(() -> new RuntimeException("요청 바디 없음"));

        GithubUser githubUser = getUserFromOauth(accessToken, request)
                .orElseThrow(() -> new RuntimeException("요청 바디 없음"));

        return new JwtResponse(jwtUtils.getJwt(githubUser), "Bearer");
    }

    private Optional<AccessTokenResponse> getAccessToken(String code, RestTemplate restTemplate) {
        RequestEntity<AccessTokenRequest> request = RequestEntity
                .post(ACCESS_TOKEN_URI)
                .header("Accept", "application/json")
                .body(new AccessTokenRequest(WEB_CLIENT_ID, WEB_CLIENT_SECRET, code, WEB_REDIRECT_URI));

        ResponseEntity<AccessTokenResponse> response = restTemplate
                .exchange(request, AccessTokenResponse.class);

        return Optional.ofNullable(response.getBody());
    }

    private Optional<GithubUser> getUserFromOauth(AccessTokenResponse accessToken, RestTemplate gitHubRequest) {
        RequestEntity<Void> request = RequestEntity
                .get(USER_URI)
                .header("Accept", "application/json")
                .header("Authorization", "token " + accessToken.getAccessToken())
                .build();

        ResponseEntity<GithubUser> response = gitHubRequest
                .exchange(request, GithubUser.class);

        return Optional.ofNullable(response.getBody());
    }
}