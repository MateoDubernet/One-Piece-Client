import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { KeyboardService } from '../service/keyboard.service';

export class FirstInputFocusParam {
  focus: boolean;
  select?: boolean;
  inputElement?: ElementRef<unknown>;
}
@Directive({
  selector: '[firstInputFocus]',
})
export class FirstInputFocusDirective implements OnInit {
  @Input() firstInputFocus: boolean | FirstInputFocusParam = undefined;

  constructor(
    private el: ElementRef,
    private keyBoardService: KeyboardService
  ) {}

  ngOnInit(): void {
    let isFocused: boolean = true;
    let isSelected: boolean = false;
    let inputElement = this.el;

    if (this.firstInputFocus !== undefined) {
      if (typeof this.firstInputFocus === 'boolean') {
        isFocused = this.firstInputFocus;
      } else if (typeof this.firstInputFocus === 'object') {
        isFocused = this.firstInputFocus.focus || this.firstInputFocus.select || this.firstInputFocus.inputElement !== undefined;
        isSelected = this.firstInputFocus.select;

        if (this.firstInputFocus.inputElement !== undefined) {
          inputElement = this.firstInputFocus.inputElement;
        }
      }
    }

    if (!isFocused) return;

    setTimeout(() => {
      this.keyBoardService.inputFocusEvent.emit(this.el.nativeElement);
      if (isSelected) {
        inputElement.nativeElement.select();
      } else {
        inputElement.nativeElement.focus();
      }
    });
  }

  selectText(node: string) {
    const htmlElement = document.getElementById(node);

    if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(htmlElement);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.warn('Could not select text in node: Unsupported browser.');
    }
  }
}
