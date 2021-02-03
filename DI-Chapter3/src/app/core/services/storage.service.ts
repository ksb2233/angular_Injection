import { Inject, Injectable, InjectionToken } from '@angular/core';

/**
 * - @Inject() 로 커스텀 프로바이더 주입하기
 * 브라우저 내장 API 로 제공되는 객체는 커스텀 프로바이더를 사용해서 의존성을 주입할 수 있다.
 * InjectionToken 을 사용하여 @Inject() 로 생성자 함수에서 의존성을 주입한다. 
 */
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  // factory 프로퍼티에 지정된 함수는 브라우저 window 객체에서 localStorage 프로퍼티를 반환한다.
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
