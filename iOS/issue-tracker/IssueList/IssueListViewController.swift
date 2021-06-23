//
//  IssueListViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/09.
//

import UIKit
import RxSwift

class IssueListViewController: UIViewController, ReuseIdentity {

    weak var coordinator: IssueCoordinator?
    private var disposeBag = DisposeBag()
    
    @IBAction func pushToEditView(_ sender: Any) {
        coordinator?.pushEditView()
    }
    @IBAction func testGETAction(_ sender: Any) {
//        getUser()
        getLabel()
        getMilestone()
        getIssues()
    }
    
    @IBAction func testPostAction(_ sender: Any) {
        NetworkService.shared.postLabel()
            .subscribe(onNext: { responseLabel in
                print(responseLabel)
            },
            onError: { error in
                print(error)
            },
            onCompleted: {
                print("comple")
            },
            onDisposed: {
                print("dispose")
            })
    }
    
    func getUser() {
        let observer: Observable<Users> = NetworkService.shared.get(target: .users)
            
        observer.subscribe(onNext: { a in
                print(a)
            }, onError: { b in
                print(b)
            }, onCompleted: {
                print("completed")
            }, onDisposed: {
                print("disposed")
            })
            .disposed(by: disposeBag)
    }
    
    func getLabel() {
        let observer: Observable<Labels> = NetworkService.shared.get(target: .labels)
            
        observer.subscribe(onNext: { a in
                print(a)
            }, onError: { b in
                print(b)
            }, onCompleted: {
                print("completed")
            }, onDisposed: {
                print("disposed")
            })
            .disposed(by: disposeBag)
    }
    
    func getMilestone() {
        let observer: Observable<Milestones> = NetworkService.shared.get(target: .milestones)
            
        observer.subscribe(onNext: { a in
                print(a)
            }, onError: { b in
                print(b)
            }, onCompleted: {
                print("completed")
            }, onDisposed: {
                print("disposed")
            })
            .disposed(by: disposeBag)
    }
    
    func getIssues() {
        let observer: Observable<Issues> = NetworkService.shared.get(target: .issues)
            
        observer.subscribe(onNext: { a in
                print(a)
            }, onError: { b in
                print(b)
            }, onCompleted: {
                print("completed")
            }, onDisposed: {
                print("disposed")
            })
            .disposed(by: disposeBag)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationController?.navigationBar.prefersLargeTitles = true
        self.navigationItem.title = "이슈"
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        if NetworkService.shared.loginToken == nil {
            coordinator?.presentLoginView()
        }
    }

}
