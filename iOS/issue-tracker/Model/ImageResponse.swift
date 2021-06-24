//
//  ImageResponse.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/24.
//

import Foundation

struct ImageResponse: Codable {
    let image: InnerImageResponse
}

struct InnerImageResponse: Codable {
    let url: String
}
