//
//  ExampleCoordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class ExampleCoordinator: NSObject, Coordinator {
    
    var navigationController: UINavigationController
    
    override init(){
        let main = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "main") as! ViewController
        self.navigationController = UINavigationController(rootViewController: main)
        
        navigationController.tabBarItem = UITabBarItem(title: "메인", image: UIImage.init(systemName: "exclamationmark.circle"), tag: 0)
        super.init()
        main.coordinator = self
    }
}
