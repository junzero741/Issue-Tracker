package com.codesquad.issuetracker.user.domain;

import com.codesquad.issuetracker.auth.dto.GitHubUser;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)", name = "USER_ID")
    private UUID id;

    @NonNull
    @Column(name = "USER_NICK_NAME", nullable = false)
    private String nickName;

    @NonNull
    @Column(name = "USER_IMAGE_URL",nullable = false)
    private String imageUrl;

    @Column(name = "USER_GITHUB_ID")
    private String githubId;

    @Column(name = "USER_APPLE_ID")
    private String appleId;

    private User(@NonNull String nickName, @NonNull String imageUrl, String githubId) {
        this.nickName = nickName;
        this.imageUrl = imageUrl;
        this.githubId = githubId;
    }

    public static User fromGitHubUser(GitHubUser gitHubUser) {
        return new User(gitHubUser.getName(), gitHubUser.getAvatarUrl(), gitHubUser.getLogin());
    }
}