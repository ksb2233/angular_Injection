import { Component, Input, OnInit } from '@angular/core';

import { HeroCacheService } from '../../core/services/hero-cache.service';

/**
 * - 다중 서비스 인스턴스 (샌드박싱, Sandboxing)
 * 컴포넌트 마다 서비스 인스턴스를 하나씩 두고, 각각의 서비스 인스턴스가 현재 작업 상태를 저장하며,
 * 다른 컴포넌트 의 작업 상태에 영향을 받지않는 구조를 (Sandboxing) 이라고 한다.
 * 이 구조에서 서비스와 컴포넌트 인스턴스는 서로 연관된 것들끼리 동작한다.
 */
@Component({
  selector: 'app-hero-bio',
  template: `
    <h4>{{hero.name}}</h4>
    <ng-content></ng-content>
    <textarea cols="25" [(ngModel)]="hero.description"></textarea>`,
  // providers 배열에 HeroCacheService 프로바이더를 등록하면 각 컴포넌트마다 독립된 HeroCacheService 인스턴스를 생성할 수 있다.
  providers: [HeroCacheService]
})

export class HeroBioComponent implements OnInit  {
  @Input() heroId: number;

  constructor(private heroCache: HeroCacheService) { }

  ngOnInit() { this.heroCache.fetchCachedHero(this.heroId); }

  get hero() { return this.heroCache.hero; }
}
