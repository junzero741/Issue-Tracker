//
//  MainTabBarController.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class MainTabBarController: UITabBarController {
    
    let issue = IssueCoordinator()
    let example = ExampleCoordinator()
        //      let label = LabelCoordinator()
//      let mileStone = MileStoneCoordinator()
//      let account = AccountCoordinator()
      

      override func viewDidLoad() {
        super.viewDidLoad()
        setupViewControllers()
      }
    
    func setupViewControllers() {
        self.viewControllers = [issue.navigationController, example.navigationController]//, label.navigationController, mileStone.navigationController, account.navigationController]
      // 탭별 아이콘 및 이름을 지정하는 코드를 여기 혹은 원하는 곳에 작업해주세요
    }
}
