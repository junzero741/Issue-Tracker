//
//  TempFirstViewController.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class TempFirstViewController: UIViewController {
    
    var coordinator : Coordinator!
    
    @IBAction func goToTabBar(_ sender: Any) {
        let mainTabBarController = MainTabBarController()
        mainTabBarController.modalPresentationStyle = .fullScreen
        self.present(mainTabBarController, animated: true)
//        self.show(mainTabBarController, sender: nil)
    }
    
    @IBAction func pushSecondView(_ sender: Any) {
        let corrdi = self.coordinator as? IssueCoordinator
        
        corrdi?.pushExampleView()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
