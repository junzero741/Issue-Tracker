//
//  EndPoint.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/15.
//

import Foundation
import Alamofire

enum NetworkErrors: Error {
    case invalidURL
}

enum APIPath: String, CustomStringConvertible {
    var description: String {
        return self.rawValue
    }
    
    case loginGithub = "api/login/github/ios"
    case users = "api/users"
    case labels = "api/labels"
    case milestones = "api/milestones"
}

struct LogInEndPoint: URLConvertible {
    
    let method = HTTPMethod.get
    private let scope : String?
    private let clientId  = "Iv1.d417ce92e94ff26f"
    
    init(scope: String? = nil) {
        self.scope = scope
    }
    
    func asURL() throws -> URL {
        var component = URLComponents()
        component.scheme = "https"
        component.host = "github.com"
        component.path = "/login/oauth/authorize"
        component.queryItems = [
            URLQueryItem(name: "client_id", value: self.clientId),
            URLQueryItem(name: "scope", value: self.scope),
        ]
        guard component.url != nil else {
            throw NetworkErrors.invalidURL
        }
        
        return component.url!
    }
    
    func urlFromEndPoint() -> URL {
        var url = URL.init(string: "https://github.com/login/oauth/authorize")!
        
        do {
             url = try self.asURL()
        } catch {
            assertionFailure(error.localizedDescription)
        }
        
        return url
    }
    
}

struct EndPoint: URLConvertible {
    
    let path : APIPath
    let method : HTTPMethod
    
    init(path: APIPath, method: HTTPMethod ) {
        self.path = path
        self.method = method
    }
    
    func asURL() throws -> URL {
        var component = URLComponents()
        component.scheme = "http"
        component.host = "13.125.197.4"
        component.path = "/\(path.description)"
        guard component.url != nil else {
            throw NetworkErrors.invalidURL
        }
        
        return component.url!
    }
    
    func urlFromEndPoint() -> URL {
        var url = URL.init(string: "http//13.125.197.4")!
        
        do {
             url = try self.asURL()
        } catch {
            assertionFailure(error.localizedDescription)
        }
        
        return url
    }
}
