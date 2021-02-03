import { Component, OnInit, Self, SkipSelf } from '@angular/core';
import { BROWSER_STORAGE, BrowserStorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-storage',
  template: `
    Open the inspector to see the local/session storage keys:

    <h3>Session Storage</h3>
    <button (click)="setSession()">Set Session Storage</button>

    <h3>Local Storage</h3>
    <button (click)="setLocal()">Set Local Storage</button>
  `,
  providers: [
    BrowserStorageService,
    // BROWSER_STORAGE 는 브라우저에서 API 로 제공하는 sessionStorage 를 오버라이드하는 토큰
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }
  ]
})
export class StorageComponent implements OnInit {

  constructor(
    // @Self() 데코레이터가 사용된 의존성 객체는 해당 컴포넌트의 엔젝터에 등록된 프로바이더만 참조한다
    @Self() private sessionStorageService: BrowserStorageService,
    // @SkipSelf() 데코레이터가 사용된 의존성 객체는 해당 컴포넌트의 인젝터를 건너뛰고 그 위쪽 인젝터로부터 의존성 객체를 찾는다.
    @SkipSelf() private localStorageService: BrowserStorageService,
  ) { }

  ngOnInit() {
  }

  setSession() {
    this.sessionStorageService.set('hero', 'Dr Nice - Session');
  }

  setLocal() {
    this.localStorageService.set('hero', 'Dr Nice - Local');
  }
}
