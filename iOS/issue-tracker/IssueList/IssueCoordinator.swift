//
//  IssueCoordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

class IssueCoordinator: NSObject, Coordinator {
    
    var navigationController = UINavigationController()
    
    override init() {
        let issueListVC = UIStoryboard(name: StoryBoardName.IssueList.description, bundle: nil)
            .instantiateViewController(withIdentifier: IssueListViewController.reuseIdentifier) as! IssueListViewController
        
        self.navigationController = UINavigationController(rootViewController: issueListVC)
        self.navigationController.navigationBar.prefersLargeTitles = true
        navigationController.tabBarItem = UITabBarItem(title: "이슈",
                                                       image: UIImage.init(systemName: "exclamationmark.circle"),
                                                       tag: 0)
        super.init()
        issueListVC.coordinator = self
    }
    
    func pushEditView() {
        let issueEditVC = UIStoryboard(name: StoryBoardName.IssueEdit.description, bundle: nil)
            .instantiateViewController(withIdentifier: IssueEditViewController.reuseIdentifier) as! IssueEditViewController
        
        // Setting SegmentControl
        let segmentController = UISegmentedControl(items: IssueEditViewController.Segment.titles)
        segmentController.selectedSegmentIndex = IssueEditViewController.Segment.markdown.status
        issueEditVC.navigationItem.titleView = segmentController
        
        navigationController.navigationBar.prefersLargeTitles = false
        navigationController.pushViewController(issueEditVC, animated: true)
    }
    
    func presentLoginView() {
        let loginVC = UIStoryboard(name: StoryBoardName.Main.description, bundle: nil).instantiateViewController(withIdentifier: LoginViewController.reuseIdentifier) as! LoginViewController
        
        loginVC.modalPresentationStyle = .fullScreen
        loginVC.coordinator = self
        navigationController.present(loginVC, animated: true, completion: nil)
    }
    
    func dismiss(view: UIViewController) {
        view.dismiss(animated: true, completion: nil)
    }
}
