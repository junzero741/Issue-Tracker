package com.codesquad.issuetracker.issue.dto;

import lombok.Getter;

import java.util.UUID;

@Getter
public class MilestoneIdRequest {
    private UUID milestoneId;
}