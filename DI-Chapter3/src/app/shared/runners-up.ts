import { InjectionToken } from '@angular/core';

import { Hero } from '../core/models/hero';
import { HeroService } from '../core/services/hero.service';

export const RUNNERS_UP = new InjectionToken<string>('RunnersUp');

export function runnersUpFactory(take: number) {
  return (winner: Hero, heroService: HeroService): string => {
    /* ... */
    return heroService
          .getAllHeroes()
          .filter((hero) => hero.name !== winner.name)
          .map(hero => hero.name)
          .slice(0, Math.max(0, take))
          .join(', ');
  };
}
