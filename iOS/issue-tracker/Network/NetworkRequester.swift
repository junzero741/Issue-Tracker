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
    
    func post<T: Codable, J:Codable>(endPoint: EndPoint, token: String?, body: T) -> Observable<J>
    
    func uploadImage<T: Codable>(endPoint: EndPoint, token: String?, body: UIImage) -> Observable<T>
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
    
    func post<T: Codable, J:Codable>(endPoint: EndPoint, token: String?, body: T) -> Observable<J> {
        let url = endPoint.urlFromEndPoint()
        let accessToken = token != nil ? token! : ""
        let header: HTTPHeaders = [
            .authorization(bearerToken: accessToken),
            .contentType("application/json")
        ]
        
        return Observable<J>.create({ observer in
            
            let dataRequest =
                AF.request(url, method: endPoint.method, parameters: body, encoder: JSONParameterEncoder(), headers: header)
            
            dataRequest
                .validate()
                .responseDecodable(of: J.self,
                                   completionHandler: { response in
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
    
    func uploadImage<T: Codable>(endPoint: EndPoint, token: String?, body: UIImage) -> Observable<T> {
        
        let url = endPoint.urlFromEndPoint()
        let accessToken = token != nil ? token! : ""
        let header: HTTPHeaders = [
            .authorization(bearerToken: accessToken),
            .contentType("multipart/form-data")
        ]
        let data = body.jpegData(compressionQuality: 0.2)
        
        return Observable<T>.create({ observer in
            
            let uploader = AF.upload(
                multipartFormData: { multipartFormData in
                    multipartFormData.append(data!,withName: "image",fileName: "image-downey" ,mimeType: "image/jpg")
                },
                to: url,
                usingThreshold: UInt64.init(),
                method: .post,
                headers: header)
                .responseData(completionHandler: { response in
                    switch response.result {
                    case .success(let data):
                        let decoded = try? JSONDecoder().decode(T.self, from: data)
                        observer.onNext(decoded!)
                    case .failure(let error):
                        observer.onError(error)
                    }
                })
            
            return Disposables.create {
                uploader.cancel()
            }
            
        })
    }
    
}
