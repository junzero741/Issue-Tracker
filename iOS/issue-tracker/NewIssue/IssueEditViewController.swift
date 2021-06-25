//
//  IssueEditViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/09.
//

import UIKit

class IssueEditViewController: UIViewController, ReuseIdentity {
    
    @IBOutlet weak var additionalInfoTable: UITableView!
    @IBOutlet weak var textContainerView: UIView!
    
    weak var coordinator: Coordinator?
    private var tableDelegate = AdditionalTableDelegate()
    private var tableDataSource = AdditionalTableViewDataSource()
    
    private var segmentControl: UISegmentedControl = {
        let control = UISegmentedControl(items: IssueEditViewController.Segment.titles)
        control.selectedSegmentIndex = IssueEditViewController.Segment.markdown.status
        return control
    }()
    
    private lazy var markdown: MarkdownViewController = {
        let viewController = MarkdownViewController.instantiate(name: StoryBoardName.IssueEdit.rawValue)
        self.addViewControllerAsChildViewController(childViewController: viewController)
        return viewController
    }()
    
    private lazy var preview: PreviewViewController = {
        let viewController = PreviewViewController()
        self.addViewControllerAsChildViewController(childViewController: viewController)
        return viewController
    }()
    
    enum Segment: Int {
        case markdown
        case preview
        
        var status: Int {
            return self.rawValue
        }
        static var titles: [String] {
            return ["마크다운", "미리보기"]
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.additionalInfoTable.delegate = tableDelegate
        self.additionalInfoTable.dataSource = tableDataSource
        
        self.navigationItem.titleView = segmentControl
        
        registerNib()
        configureTable()
        setupSegmentControl()
        updateView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.prefersLargeTitles = false
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        self.removeViewConrollerAsChildViewController(childViewController: markdown)
        self.removeViewConrollerAsChildViewController(childViewController: preview)
    }
    
    private func updateView() {
        markdown.view.isHidden = !(segmentControl.selectedSegmentIndex == Segment.markdown.rawValue)
        preview.view.isHidden = !(segmentControl.selectedSegmentIndex == Segment.preview.rawValue)
    }
    
    private func registerNib() {
        additionalInfoTable.register(UINib(nibName: AdditionalTableViewCell.nibName,
                                           bundle: Bundle.main),
                                     forCellReuseIdentifier: AdditionalTableViewCell.reuseIdentifier)
    }
    
    private func configureTable() {
        self.additionalInfoTable.translatesAutoresizingMaskIntoConstraints = false
        self.additionalInfoTable.tableFooterView = UIView()
    }
    
    private func setupSegmentControl() {
        self.segmentControl.addTarget(self,
                                      action: #selector(segmentedControlValueChanged(_:)),
                                      for: .valueChanged)
    }
    
    private func addViewControllerAsChildViewController(childViewController: UIViewController) {
        self.addChild(childViewController)
        textContainerView.addSubview(childViewController.view)
        childViewController.view.frame = textContainerView.bounds
        childViewController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        childViewController.didMove(toParent: self)
    }
    
    private func removeViewConrollerAsChildViewController(childViewController: UIViewController) {
        childViewController.willMove(toParent: nil)
        childViewController.view.removeFromSuperview()
        childViewController.removeFromParent()
    }
    
    @objc
    func segmentedControlValueChanged(_ sender: UISegmentedControl){
        updateView()
    }
}
