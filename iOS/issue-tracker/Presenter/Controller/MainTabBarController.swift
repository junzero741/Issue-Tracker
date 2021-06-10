//
//  MainTabBarController.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class MainTabBarController: UITabBarController {
      
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    func setChildViewControllers(with: UIViewController...) {
        self.viewControllers = with
    }
}
