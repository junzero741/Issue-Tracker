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
    
    private let requester : NetworkRequesting
    
    var loginToken : String?
    
    private init() {
        self.requester = NetworkRequester()
    }
    
    func login(code: String) -> Observable<JWT> {
        let endPoint = EndPoint.init(path: .loginGithub,
                                     method: .get)
        return requester.get(endPoint: endPoint, token: nil, parameters: ["code":code])
    }
    
    func get<T: Codable>(target: APIPath) -> Observable<T> {
        let endPoint = EndPoint.init(path: target, method: .get)
        
        return requester.get(endPoint: endPoint, token: loginToken, parameters: nil)
    }
    
    func postLabel() -> Observable<LabelWithKey> {
        let endPoint = EndPoint.init(path: .labels, method: .post)
        let input = Label.init(id: "",name: "testDowneyName3", description: "testDowneyDescription0", colors: Color.init(backgroundColor: "#FFFFFF", textColor: "#000000"))
        
        return requester.post(endPoint: endPoint, token: loginToken, body: input)
    }
}
