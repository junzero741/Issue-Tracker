//
//  NetworkRequester.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/15.
//

import Foundation
import RxSwift
import Alamofire

protocol NetworkRequesting {
    func get<T: Codable>(endPoint: EndPoint, token: String?, parameters: [String: Codable]?) -> Observable<T>
}

class NetworkRequester: NetworkRequesting {
    func get<T: Codable>(endPoint: EndPoint,
                         token: String?,
                         parameters: [String: Codable]? = nil) -> Observable<T> {
        return Observable<T>.create({ observer in
            
            let url = endPoint.urlFromEndPoint()
            
            let accessToken = token != nil ? token! : ""
            let header: HTTPHeaders = [.authorization(bearerToken: accessToken)]
            
            let dataRequest = AF.request(url, method: endPoint.method, parameters: parameters, encoding: URLEncoding.queryString, headers: header)
            
            dataRequest
                .validate()
                .responseDecodable(of: T.self, completionHandler: { response in
                switch response.result {
                case .success(let data):
                    observer.onNext(data)
                case .failure(let error):
                    observer.onError(error)
                }
            })
            
            return Disposables.create {
                dataRequest.cancel()
            }
        })
    }
    
}
