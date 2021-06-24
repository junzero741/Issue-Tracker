//
//  IssueListViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/09.
//

import UIKit

class IssueListViewController: UIViewController, ReuseIdentity {

    weak var coordinator: IssueCoordinator?
    
    @IBAction func pushToEditView(_ sender: Any) {
        coordinator?.pushEditView()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        self.navigationItem.title = "이슈"
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.prefersLargeTitles = true
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        if NetworkService.shared.loginToken == nil {
            coordinator?.presentLoginView()
        }
    }

}
