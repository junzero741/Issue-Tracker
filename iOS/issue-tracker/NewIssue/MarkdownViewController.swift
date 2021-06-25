//
//  MarkdownViewController.swift
//  issue-tracker
//
//  Created by 박혜원 on 2021/06/24.
//

import UIKit

class MarkdownViewController: UIViewController {

    @IBOutlet weak var textContent: UITextView!
    
    private lazy var photoPicker = ImagePicker(presentationController: self, delegate: self)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.textContent.delegate = self
    }
    
    @objc
    func insertPhoto() {
        self.photoPicker.present()
    }

}

extension MarkdownViewController: UITextViewDelegate {
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        let menuItem = UIMenuItem(title: "Insert Photo", action: #selector(insertPhoto))
        UIMenuController.shared.menuItems = [menuItem]
    }
}

extension MarkdownViewController: ImagePickerDelegate {
    
    func didSelect(image: UIImage?) {
        
    }
}
