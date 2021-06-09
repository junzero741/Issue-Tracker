//
//  Coordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

protocol Coordinator: AnyObject {
    func pushToView(_ navigationController: UINavigationController, title: String, vc: UIViewController)
}

extension Coordinator {
    func pushToView(_ navigationController: UINavigationController, title: String, vc: UIViewController) {
    let vc = vc
    vc.title = title
    navigationController.pushViewController(vc, animated: true)
  }
}
