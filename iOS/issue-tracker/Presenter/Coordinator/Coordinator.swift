//
//  Coordinator.swift
//  issue-tracker
//
//  Created by 이다훈 on 2021/06/08.
//

import UIKit

protocol Coordinator: AnyObject {
    func pushToView(_ navigationController: UINavigationController, title: String)
}

extension Coordinator {
  func pushToView(_ navigationController: UINavigationController, title: String) {
    let vc = navigationController
    vc.title = title
    navigationController.pushViewController(vc, animated: true)
  }
}
