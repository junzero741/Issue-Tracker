//
//  LoginDelegates.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/18.
//

import Foundation
import AuthenticationServices

class LoginDelegates: NSObject, ASAuthorizationControllerDelegate, ASWebAuthenticationPresentationContextProviding {
    
    weak var view : UIView! = nil
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            let userIdentifier = appleIDCredential.user
            let email = appleIDCredential.email
            
            print(userIdentifier)
            print(String(describing: email))
        default: break
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        // Handle Error
        print(error.localizedDescription)
    }
    
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return self.view.window ?? ASPresentationAnchor()
    }
    
}
