import { Controller } from "@hotwired/stimulus";


export default class extends Controller {
  static targets = ['menu', 'button']
  static values = { open: Boolean }

  connect() {
  }



  toggle() {
    this.openValue = !this.openValue
  }

  show(){
    this.openValue = true;
  }

  hide(event) {
    if (this.element.contains(event.target) === false && this.openValue) {
      this.openValue = false
    }
  }
}
