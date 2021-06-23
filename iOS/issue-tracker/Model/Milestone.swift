//
//  Milestone.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/22.
//

import Foundation


struct Milestones: Codable {
    let milestones: [Milestone]
}

struct MilestoneWithKey: Codable {
    let milestone: Milestone
}

struct Milestone: Codable {
    let id: String
    let title: String
    let description: String
    let dueDate: String //"YYYY-MM-DD"
}
