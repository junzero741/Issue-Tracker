//
//  Issue.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/22.
//

import Foundation

struct IssueToPost: Codable {
        let title: String
        let comment: String
        let assigneeIds: [String]
        let labelIds: [String]
        let milestoneId: String
}

struct Issues: Codable {
    let issues: [Issue]
}

struct Issue: Codable {
    let id: Int
    let author: UserForIssue?
    let title: String?
    let createdAt: String?
    let labels: [Label]?
    let assignees: [UserForIssue]?
    let milestone: Milestone?
    let comments: [Comment]
    let open: Bool
}

struct UserForIssue: Codable {
    let id: String
    let nickName: String?
    let imageUrl: String?
    let githubId: String?
    let appleId: String?
}

struct Comment: Codable {
    let id: String
    let issueId: Int
    let author: UserForIssue
    let createdAt: String
    let content: String
}
