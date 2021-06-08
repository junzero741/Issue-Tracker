//
//  IssueCoordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class IssueCoordinator: NSObject, Coordinator {
    
    var navigationController: UINavigationController
    
    override init(){
        let example : ViewController = UIApplication.shared.windows[0].rootViewController! as! ViewController
        self.navigationController = UINavigationController(rootViewController: example)
        navigationController.tabBarItem = UITabBarItem(title: "검색", image: UIImage(named: "search"), tag: 0)
        super.init()
        example.coordinator = self
    }
    
    func pushIssueView(_ navigationController: UINavigationController) {
        pushToView(navigationController, title: "이슈")
    }
}
