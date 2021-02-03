import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * - 컴포넌트의 DOM 엘리먼트 주입하기
 * 각 효과를 위한 서드파티 툴이 jQuery를 사용한다면 DOM에 직접 접근해야 하는 경우가 있다.
 */
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string;

  private el: HTMLElement;

  // 배경색을 변경하기 위해 디렉티브의 생성자로 ElementRef 를 주입
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'cyan');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
