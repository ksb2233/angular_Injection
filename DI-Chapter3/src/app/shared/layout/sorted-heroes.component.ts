import { Component, OnInit } from '@angular/core';

import { Hero } from '../../core/models/hero';
import { HeroService } from '../../core/services/hero.service';

/**
 * - 서비스가 주입될 수 있는 범위를 특정 컴포넌트로 제한하기
 * 서비스 프로바이더를 컴포넌트 트리의 특정 브랜치에 등록하면 해당 브랜치 범위에 이 서비스를 사용하도록 지정할 수 있다. 
 * 이렇게 할 경우 상위 컴포넌트 트리와는 별개로 이 계층에서 새로운 서비스 인스턴스가 생성된다.
 */
@Component({
  selector: 'app-unsorted-heroes',
  template: `<div *ngFor="let hero of heroes">{{hero.name}}</div>`,
  // HeroService 의 프로바이더를 @Component() 데코레이터 providers 배열에 등록
  providers: [HeroService]
})
export class HeroesBaseComponent implements OnInit {

  // HeroesBaseComponent 의 인스턴스를 생성하면 providers 설정으로 인해 HeroService의 인스턴스도 새로 생성
  constructor(private heroService: HeroService) { }

  heroes: Array<Hero>;

  ngOnInit() {
    this.heroes = this.heroService.getAllHeroes();
    this.afterGetHeroes();
  }

  // 히어로 목록을 처리하는 로직은 자식 클래스에서 오버라이드한다.
  protected afterGetHeroes() {}

}

/**
 * 부모 컴포넌트에 의존성 주입이 필요한 경우에 이 의존성 객체는 자식 클래스에도 주입되어야하고,
 * 이 의존성 객체들이 자식 컴포넌트의 생성자에서 부모 컴포넌트의 생성자로 전달되어야 한다
 */
@Component({
  selector: 'app-sorted-heroes',
  template: `<div *ngFor="let hero of heroes">{{hero.name}}</div>`,
  // HeroService 의 프로바이더를 @Component() 데코레이터 providers 배열에 등록
  providers: [HeroService]
})
export class SortedHeroesComponent extends HeroesBaseComponent {
  constructor(heroService: HeroService) {
    super(heroService);
  }

  protected afterGetHeroes() {
    this.heroes = this.heroes.sort((h1, h2) => {
      return h1.name < h2.name ? -1 :
            (h1.name > h2.name ? 1 : 0);
    });
  }
}
