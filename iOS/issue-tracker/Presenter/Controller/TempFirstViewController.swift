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
        
        let tempFirstStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let tempVC = tempFirstStoryboard.instantiateViewController(withIdentifier: "main")
        
        print(mainTabBarController.viewControllers)
        
        let nv = mainTabBarController.viewControllers!.first!
        
        mainTabBarController.example.pushIssueView(nv as! UINavigationController)
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
