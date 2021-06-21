//
//  LoginUseCase.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/17.
//

import Foundation
import RxSwift
import AuthenticationServices

class LoginUseCase {
    
    private var disposeBag = DisposeBag()
    
    func loginGithub(delegate: LoginDelegates) {
        let url = LogInEndPoint.init().urlFromEndPoint()
        let scheme = "issue-tracker"
        let authenticationSession = ASWebAuthenticationSession
            .init(url: url,
                  callbackURLScheme: scheme,
                  completionHandler: { (url:URL?, error:Error?) in
                    guard error == nil,
                          let callBackURL = url,
                          let queryItems = URLComponents(string: callBackURL.absoluteString)?.queryItems,
                          let code = queryItems.first(where: { $0.name == "code" })?.value else {
                        print("An error occurred when attempting to sign in.")
                        return
                    }
                    self.requestGithubToken(code: code)
                  })
        authenticationSession.presentationContextProvider = delegate
        authenticationSession.start()
    }
    
    private func requestGithubToken(code: String) {
        NetworkService.shared.login(code: code)
            .subscribe(
                onNext: { token in
                    NetworkService.shared.loginToken = token.accessToken
                },
                onError: { error in
                    print(error)
                })
            .disposed(by: disposeBag)
    }
    
    func loginApple(delegate: LoginDelegates) {
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = delegate
        controller.performRequests()
    }
    
    func testGetUser() {
        NetworkService.shared.getUser()
            .subscribe(onNext: { a in
                print(a)
            }, onError: { b in
                print(b)
            }, onCompleted: {
                print("completed")
            }, onDisposed: {
                print("disposed")
            })
            .disposed(by: disposeBag)
    }
}
