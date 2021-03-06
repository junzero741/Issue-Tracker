package com.codesquad.issuetracker.issue.infra;

import com.codesquad.issuetracker.auth.dto.GitHubUser;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.label.domain.Colors;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.infra.LabelRepository;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.infra.MilestoneRepository;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.infra.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class IssueRepositoryTest {

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    LabelRepository labelRepository;

    @Autowired
    MilestoneRepository milestoneRepository;

    @Autowired
    UserRepository userRepository;

    User K;
    User Cooper;

    Label docs;
    Label feat;
    Label refactor;

    Milestone issueTracker;

    @PersistenceContext
    EntityManager entityManager;

    @BeforeEach
    void setUp() {
        GitHubUser githubK = new GitHubUser();
        githubK.setLogin("PizzaCola-K");
        githubK.setName("K");
        githubK.setAvatarUrl("localhost:8080/k.jpg");

        GitHubUser githubCooper = new GitHubUser();
        githubCooper.setLogin("cooper");
        githubCooper.setName("cooper");
        githubCooper.setAvatarUrl("cooper.jpg");

        User userK = User.fromGitHubUser(githubK);
        User userCooper = User.fromGitHubUser(githubCooper);
        K = userRepository.save(userK);
        Cooper = userRepository.save(userCooper);

        docs = Label.create("docs", "λ¬Έμ μμ", new Colors.Builder().backgroundColor("#FFFFFF").textColor("#000000").build());
        refactor = Label.create("refactor", "λ¦¬ν©ν λ§", new Colors.Builder().backgroundColor("#FEF0F1").textColor("#000000").build());
        feat = Label.create("feat", "κΈ°λ₯ μΆκ°", new Colors.Builder().backgroundColor("#F4245F").textColor("#000000").build());

        issueTracker = Milestone.create("[BE] μ΄μ νΈλμ»€", "μ΄μ μΆκ°", null);

        docs = labelRepository.save(docs);
        refactor = labelRepository.save(refactor);
        feat = labelRepository.save(feat);

        issueTracker = milestoneRepository.save(issueTracker);
    }


    @Test
    @DisplayName("μ΄μλ₯Ό μμ±νμ¬ μ μ₯νλ€.")
    void createIssue() {
        Issue issue = Issue.create(K, "μ΄μ μμ± λ° μ μ₯");
        issue.addAssignee(Cooper);
        issue.addAssignee(K);
        issue.addLabel(feat);
        issue.addLabel(docs);
        issue.addLabel(refactor);
        issue.setMilestone(issueTracker);

        issueRepository.save(issue);
        entityManager.flush();

        entityManager.clear();

        Issue foundIssue = issueRepository.findById(issue.getId()).orElseThrow(RuntimeException::new);
        assertThat(issue).isEqualTo(foundIssue);
    }

}

