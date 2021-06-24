//
//  IssueEditViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/09.
//

import UIKit

class IssueEditViewController: UIViewController, ReuseIdentity {

    @IBOutlet weak var additionalInfoTable: UITableView!
    
    weak var coordinator: Coordinator?
    private var tableDelegate = AdditionalTableDelegate()
    private var tableDataSource = AdditionalTableViewDataSource()
    private var segmentControl: UISegmentedControl = {
        let control = UISegmentedControl(items: IssueEditViewController.Segment.titles)
        control.selectedSegmentIndex = IssueEditViewController.Segment.markdown.status
        return control
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
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.prefersLargeTitles = false
    }
    
    private func registerNib() {
        additionalInfoTable.register(UINib(nibName: AdditionalTableViewCell.nibName, bundle: Bundle.main),
                                     forCellReuseIdentifier: AdditionalTableViewCell.reuseIdentifier)
        
    }
    
    private func configureTable() {
        self.additionalInfoTable.translatesAutoresizingMaskIntoConstraints = false
        self.additionalInfoTable.tableFooterView = UIView()
    }
    
}
