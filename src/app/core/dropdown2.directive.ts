import { Directive, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown2]',
  exportAs: 'appDropdown2',
})
export class Dropdown2Directive {
  @HostBinding('class.open') isOpen = false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('document', 'click', () => (this.isOpen = false));
  }
  @HostListener('click', ['$event']) onClick = (event: Event): void => {
    event.stopPropagation();
    // You will have to prevent the event from bubbling in the same way like you would do it
    // in plain ol' JS/HTML: with event.stopPropagation(). Otherwise the dropdown would not open,
    // since the click on the button would be also interpreted as a click on document.
    this.isOpen = !this.isOpen;
  };
}
