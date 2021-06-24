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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
        let test = """
            # Hello
            ## Hello
            ### Hello
            
            - Elly Elly Elly
            - Good
            """
        markdownView.load(markdown: test)
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
