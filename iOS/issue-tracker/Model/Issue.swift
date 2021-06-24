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
    let author: User?
    let title: String?
    let createdAt: String?
    let labels: [Label]?
    let assignees: [User]?
    let milestone: Milestone?
    let comments: [Comment]
    let open: Bool
}

struct Comment: Codable {
    let id: String
    let issueId: Int
    let author: User
    let createdAt: String
    let content: String
}
