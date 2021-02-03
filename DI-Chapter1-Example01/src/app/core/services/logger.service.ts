import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {
  // 테스트하기 위해 로그를 저장합니다.
  logs: string[] = [];

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}
