//
//  Label.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/22.
//

import Foundation

struct Labels: Codable {
    let labels: [Label]
}

struct LabelWithKey: Codable {
    let label: Label
}

/// Label type used to decode response
struct Label: Codable {
    let id: String
    let name: String
    let description: String
    let colors: Color
}

