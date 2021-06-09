//
//  ExampleCoordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class ExampleCoordinator: NSObject, Coordinator {
    
    var navigationController: UINavigationController
    
    let example = UIStoryboard(name: "TempFirstView", bundle: nil).instantiateViewController(withIdentifier: "temp") as! TempFirstViewController
    
    override init(){
        
        self.navigationController = UINavigationController(rootViewController: example)
        navigationController.tabBarItem = UITabBarItem(title: "예시2", image: UIImage.init(systemName: "exclamationmark.circle"), tag: 0)
        super.init()
        example.coordinator = self
    }
    
    func pushIssueView(_ navigationController: UINavigationController) {
        pushToView(navigationController, title: "이슈", vc: example)
    }
}
