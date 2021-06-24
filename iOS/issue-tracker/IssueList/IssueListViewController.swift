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
        getUser()
        getLabel()
        getMilestone()
        getIssues()
    }
    
    @IBAction func testPostAction(_ sender: Any) {
//        postLabel()
        postImage()
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
    
    func postLabel() {
        let input = Label.init(id: "",name: "testDowneyName3", description: "testDowneyDescription0", colors: Color.init(backgroundColor: "#FFFFFF", textColor: "#000000"))
        let observer: Observable<LabelWithKey> = NetworkService.shared.post(input: input, target: .labels)
            
        observer
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
            .disposed(by: disposeBag)
    }
    
    func postImage() {
        
        let testInput = UIImage.init(named: "githubIcon")!
        let testInput2 = UIImage.init(named: "testJPG")!
        
        let observer: Observable<ImageResponse> = NetworkService.shared.uploadImage(input: testInput2)
        
        observer.subscribe(onNext: { response in
            print(response)
        },
        onError: { error in
            print(error)
        },
        onCompleted: {
            print("comple")
        },
        onDisposed: {
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
