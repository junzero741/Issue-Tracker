package com.codesquad.issuetracker.profile.confroller;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class ProfileController {

    private final Environment env;

    public ProfileController(Environment env) {
        this.env = env;
    }

    @GetMapping("/profile")
    public String profile() {
        List<String> profileList = Arrays.asList(env.getActiveProfiles());
        List<String> realProfiles = Arrays.asList("real1", "real2");
        String defaultProfile = profileList.isEmpty() ? "default" : profileList.get(0);

        return profileList.stream()
                .filter(realProfiles::contains)
                .findAny()
                .orElse(defaultProfile);
    }
}
