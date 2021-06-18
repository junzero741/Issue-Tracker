//
//  LoginViewModel.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/17.
//

import Foundation
import RxSwift

class LoginViewModel {
    private var loginUseCase = LoginUseCase()
    private var disposeBag = DisposeBag()
    
    func loginGithub() {
        loginUseCase.loginGithub()
    }
}
