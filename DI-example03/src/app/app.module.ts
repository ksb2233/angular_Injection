import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { APP_CONFIG, HERO_DI_CONFIG } from './app.config';
import { HeroListComponent } from './heroes/hero-list.component';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { Logger } from './logger.service';
import { UserService } from './user.service';

// import { ProvidersModule } from './providers.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule,
    // ProvidersModule
  ],
  providers: [
    Logger,
    // 문자열이나 함수, 객체도 의존성으로 주입될 수 있다.
    UserService,
    // { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
