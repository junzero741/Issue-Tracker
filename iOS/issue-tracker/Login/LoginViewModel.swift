//
//  LoginViewModel.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/17.
//

import Foundation

class LoginViewModel {
    private var loginUseCase = LoginUseCase()
    
    func loginGithub(delegate: LoginDelegates) {
        loginUseCase.loginGithub(delegate: delegate)
    }
    
    func loginApple(delegate: LoginDelegates) {
        loginUseCase.loginApple(delegate: delegate)
    }
}
