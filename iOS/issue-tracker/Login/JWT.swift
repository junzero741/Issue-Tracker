//
//  JWT.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/18.
//

import Foundation

struct JWT: Codable {
    let accessToken : String
    let tokenType: String
}
