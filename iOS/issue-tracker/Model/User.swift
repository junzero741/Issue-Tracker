//
//  User.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/21.
//

import Foundation

struct Users: Codable {
    let users: [User]
}

struct User: Codable {
    let id: String
    let nickName: String?
    let imageUrl: String?
}
