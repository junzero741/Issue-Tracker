//
//  NetworkRequester.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/15.
//

import Foundation
import RxSwift
import Alamofire

protocol NetworkRequestable {
    func get<T: Codable>(endPoint: EndPoint, parameters: [String: Codable]?) -> Observable<T>
}

class NetworkRequester: NetworkRequestable {
    func get<T: Codable>(endPoint: EndPoint, parameters: [String: Codable]? = nil) -> Observable<T> {
        return Observable<T>.create({ observer in
            
            let url = endPoint.urlFromEndPoint()
            
            let dataRequest = AF.request(url, method: endPoint.method, parameters: parameters, encoding: URLEncoding.queryString)
            
            dataRequest.responseDecodable(of: T.self, completionHandler: { response in
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
