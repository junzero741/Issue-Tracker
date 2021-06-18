//
//  NetworkService.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/17.
//

import Foundation
import RxSwift

class NetworkService {
    static let shared = NetworkService()
    
    private let requester : NetworkRequestable
    
    private var loginToken : String?
    
    private init() {
        self.requester = NetworkRequester()
    }
    
    func login(code: String) -> Observable<String> {
        let endPoint = EndPoint.init(path: .loginGithub,
                                     method: .get)
        return requester.get(endPoint: endPoint, parameters: ["code":code])
    }
}
