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
    
    func post<T: Codable, J: Codable>(input: T, target: APIPath) -> Observable<J> {
        let endPoint = EndPoint.init(path: target, method: .post)
        
        return requester.post(endPoint: endPoint, token: loginToken, body: input)
    }
    
    func uploadImage<T: Codable>(input: UIImage) -> Observable<T> {
        let endPoint = EndPoint.init(path: .images, method: .post)
        
        return requester.uploadImage(endPoint: endPoint, token: loginToken, body: input)
    }
}
