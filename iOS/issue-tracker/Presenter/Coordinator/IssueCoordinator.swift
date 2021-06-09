//
//  IssueCoordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class IssueCoordinator: NSObject, Coordinator {
    
    var navigationController: UINavigationController
    
    override init() {
        
        let example = UIStoryboard(name: "TempFirstView", bundle: nil).instantiateViewController(withIdentifier: "temp") as! TempFirstViewController
        
        self.navigationController = UINavigationController(rootViewController: example)
        navigationController.tabBarItem = UITabBarItem(title: "메인", image: UIImage.init(systemName: "exclamationmark.circle"), tag: 0)
        super.init()
        example.coordinator = self
    }
    
    func pushExampleView() {
        let example = UIStoryboard(name: "TempSecondView", bundle: nil).instantiateViewController(withIdentifier: "second") as! TempSecondViewController
        pushToView(self.navigationController, title: "둘째", vc: example)
    }
}
