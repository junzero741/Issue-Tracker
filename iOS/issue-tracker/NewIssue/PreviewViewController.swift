//
//  PreviewViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/24.
//

import UIKit
import MarkdownView

class PreviewViewController: UIViewController {

    private var markdownView: MarkdownView!
    var text: String = """
            # Hello
            ## Hello
            ### Hello
            
            - Elly Elly Elly
            - Good
            - Today I Learned
            
            # 한글도 되나?
            `setNeedsDisplay()`!!!
            
            ```swift
            let controller = UIViewController()
            ```
            """
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
        markdownView.load(markdown: text)
    }

    private func configure(){
        self.markdownView = MarkdownView()
        view.addSubview(markdownView)
        markdownView.translatesAutoresizingMaskIntoConstraints = false
    
        NSLayoutConstraint.activate([
            markdownView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            markdownView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            markdownView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            markdownView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }

}
