import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-list',
  template: `
    <div *ngFor="let hero of heroes">
      {{hero.id}} - {{hero.name}}
    </div>
  `
})
export class HeroListComponent {
    heroes: Hero[];

    // Type 이 HeroService 인 클래스로 지정하면 Angular 는 HeroService 클래스 토큰에 해당하는 서비스의 인스턴스를 찾아 의존성을 주입한다.
    constructor(heroService: HeroService) {
    this.heroes = heroService.getHeroes();
  }
}
