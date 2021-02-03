

DI-Chapter1_
DI-Chapter1_




































컴포넌트와 서비스를 한 파일에 정의해야 한다면 서비스를 먼저 정의하고 컴포넌트를 나중에 정의,
서비스보다 컴포넌트를 먼저 정의하면 런타임 null 참조 에러가 발생

현재 계층에서 인젝터가 의존성 객체를 찾지 못하면 부모 인젝터에서 의존성 객체를 찾기때문에 인젝터는 상속된다고 볼 수 있다.

컴포넌트의 경우에 의존성으로 주입되는 서비스를 컴포넌트 인젝터에서 찾지 못하면 부모 인젝터에서 다시 찾으며, 이 과정은 부모 NgModule 을 거쳐 최상위 인젝터에 도달할 때까지 반복한다.


프로바이더는 다음과 같이 다양한 계층에 등록할 수 있다.
    서비스 클래스에서 @Injectable() 데코레이터로 직접 등록
    NgModule의 @NgModule() 데코레이터에 등록
    컴포넌트의 @Component() 데코레이터에 등록





의존성으로 주입할 객체는 프로바이더와 토큰을 연결하는 방식으로 인젝터에 등록된다.
그러면 인젝터가 프로바이더에 지정된 방법대로 의존성 객체의 인스턴스를 생성하며,
이 인스턴스는 컴포넌트나 디렉티브, 파이프, 서비스와 같이 의존성 객체가 필요한 곳에 주입된다

그래서 의존성 객체를 주입하려면 인젝터에 프로바이더를 꼭 등록해야한다.
서비스 클래스를 프로바이더로 등록하는 방법 중 가장 간단한 방법은 클래스를 선언하면서 직접 프로바이더를 등록하는 것이다.
이렇게 등록하면 서비스 클래스 이름을 바로 프로바이더 토큰으로 사용할 수 있으며, 인젝터가 new 키워드를 사용해서 서비스 클래스의 인스턴스를 생성한다.
roviders: [Logger]

프로바이더는 다양한 방법으로 등록할 수 있다
    클래스 프로바이더를 사용하면서 다른 클래스의 인스턴스를 주입할 수 있다.
    Looger 와 형태가 같은 객체를 프로바이더로 등록할 수 있다.
    팩토리 함수를 실행하고 받은 반환값을 프로바이더로 등록할 수 있다.



Provider 객체 리터럴
    클래스를 바로 프로바이더 배열에 등록하는 문법은 Provider 인터페이스에 정의된 문법을 짧게 줄인 것
    providers: [Logger] == [{ provide: Logger, useClass: Logger }]
        - provide 프로퍼티에는 토큰을 지정
        - 인젝터가 의존성 객체의 인스턴스를 생성하는 방법은 두번째 프로퍼티로 지정
        - 클래스를 직접 인젝터에 등록하는 경우에는 useClass를 사용하며, 상황에 따라 useExisting, useValue, useFactory를 사용하는 경우도 있다.

대체 클래스 프로바이더
    서비스 클래스 프로바이더에는  다른 클래스를 등록할 수 있다. 그래서 인젝터가 Logger 토큰으로 의존성 객체를 요청받았을 때
    BetterLogger 인스턴스를 제공하도록 설정할 수 있다.
    [{ provide: Logger, useClass: BetterLogger }]

추가 의존성이 있는 클래스의 프로바이더
    useClass 프로바이더-정의(provider-definition) 키를 사용하면 어떤 클래스의 프로바이더를 다른 클래스로 지정할 수 있다.
    [ UserService, { provide: Logger, useClass: EvenBetterLogger }]

별칭(aliased) 클래스 프로바이더
    프로바이더에 useClass 를 사용하면 OldLogger 를 NewLogger 로 대체하는것이 아니라
    NewLogger 인스턴스를 두 개로 나누는 방식으로 등록된다.
    [ NewLogger, { provide: OldLogger, useClass: NewLogger}] // 별칭으로 지정한 것이 아니다. `NewLogger`의 인스턴스는 2개 생성된다.

    NewLogger 의 인스턴스를 하나로 유지하려면 OldLogger 토큰에 useExisting 옵션을 사용해야한다. // OldLogger는 NewLogger를 가리키는 이름으로 지정된다.
    [ NewLogger, { provide: OldLogger, useExisting: NewLogger}]

값(value) 프로바이더
    의존성 객체는 클래스의 인스턴스를 만들어 제공하는 대신 미리 만들어둔 객체를 제공하는것이 더 간단할 때도 있다.
    객체를 프로바이더로 등록하려면 useValue 옵션을 사용한다.
    [{ provide: Logger, useValue: SilentLogger }]

클래스가 아닌 의존성 객체
    의존성 객체가 반드시 클래스 타입은 아니다. 문자열이나 함수, 객체도 의존성으로 주입될 수 있다.
    TypeScript 인터페이스는 토큰으로 사용할 수 없다.
    // 에러. 인터페이스는 프로바이더 토큰으로 사용할 수 없다.
    [{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
    // 에러. 인자의 타입으로 인터페이스를 지정하면 의존성 주입이 동작하지 않는다.
    constructor(private config: AppConfig){ }

    객체를 프로바이더로 등록하는 방식은 AppModule 과 같은 NgModule 에서 사용할 수 있다.
    providers: [
        UserService,
        { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
    ],

    클래스가 아닌 의존성 객체는 InjectionToken 객체를 정의하는 방법으로도 프로바이더를 등록할 수 있다.
    import { InjectionToken } from '@angular/core';
    export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
    이렇게 정의한 InjectionToken 은 다음과 같이 인젝터에 등록한다.
    providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]

    이 의존성 토큰은 생성자에서 @Inject() 인자 데코레이터를 사용하여 주입할 수 있다.
    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        this.title = config.title;
    }

팩토리 프로바이더
    팩토리 프로바이더는 의존성 주입을 제공하지 않는 서드파티 라이브러리에 의존성 주입 시스템을 적용하는 용도로 사용할 수 있다.
    팩토리 프로바이더는 팩토리 함수를 사용한다.

    서비스 프로바이더를 등록할 때 useFactory 필드를 사용하면 이 의존성 객체는 지정한 팩토리함수가 사용된다는 것을 의미한다
    팩토리 함수에 필요한 프로바이더 토큰은 deps 프로퍼티로 지정한다.

    팩토리 프로바이더는 변수에 할당하고 파일 외부로 공개(export) 해야한다.
    팩토리 프로바이더는 이렇게 정의해야 이후에도 재사용할 수 있다.

Angular 에 정의된 토큰과 다중 프로바이더
    angular 애플리케이션은 다양한 시스템 환경에서 실행될 수 있기 때문에, 각 상황에 맞게 커스터마이징할 때 사용하는 의존성 토큰 상수를 제공한다.
    이 토큰들을 사용하면 Angular 프레임워크의 부트스트랩 과정과 초기화 과정을 조정할 수 있다.
    그리고 이 토큰에 콜백함수를 연결하면 특정 환경에서 실행되어야 하는 로직을 실행할 수도 있다.
        - PLATFORM_INITIALIZER : 플랫폼이 초기화된 이후에 실행될 함수를 지정한다.
        - APP_BOOTSTRAP_LISTENER : 컴포넌트가 부트스트랩된 이후에 실행될 함수를 지정한다. 이 함수는 부트스트랩된 컴포넌트의 ComponentRef 인스턴스를 인자로 받는다
        - APP_INITIALIZER : 애플리케이션이 초기화된 이후에 실행될 함수를 지정한다. 이때 실행할 함수는 Promise 를 반환하도록 정의할 수 있는데, 이 프로미스는 모두 애플리케이션이 부트스트랩되기 전에 종료되어야 한다.
          부트스트랩되기 전에 종료되지 않은 프로미스가 있다면 애플리케이션이 부트스트랩되지 않는다.
    프로바이더 객체에는 multi: true 옵션을 사용할 수 있기 때문에 APP_INITIALIZER 와 같은 토큰에 여러 함수를 함께 등록할 수도 있다
    export const APP_TOKENS = [
        { provide: PLATFORM_INITIALIZER, useFactory: platformInitialized, multi: true },
        { provide: APP_INITIALIZER, useFactory: delayBootstrapping, multi: true },
        { provide: APP_BOOTSTRAP_LISTENER, useFactory: appBootstrapped, multi: true },
    ];
    한 토큰에 프로바이더를 여러개 등록하는 것은 Angular 가 제공하는 패턴 중 하나

트리 셰이킹 대상이 되는 프로바이더
    트리 셰이킹은 애플리케이션에 사용되지 않은 코드를 최종 번들링 결과물에 포함시키지 않는 기능을 의미한다.
    Angular 컴파일러는 트리 셰이킹될 수 있도록 등록된 프로바이더에만 트리 세이킹을 적용할 수 있다.
    이 과정을 통해 불필요한 코드를 제거하면 최종 빌드 결과물의 용량을 줄일 수 있다.

    NgModule 의 인젝터에 등록된 서비스 프로바이더는 트리 셰이킹의 대상이 아니다.

    NgModule 이나 컴포넌트에 등록하지않고 서비스에 @Injectable() 데코레이터로 직접 등록하면 트리 셰이킹 대상으로 지정할 수 있다.
    
    트리 셰이킹 대상이 되는 프로바이더를 오버라이드 하려면, 필요한 모듈의 @NgModule 데코레이터나 @Component 데코레이터에 providers: [] 를 지정하면 된다.





@Injectable()
    providedIn 메타데이터 옵션을 지정하면 이 서비스가 root 인젝터에 등록될지, 특정 NgModule에 등록될지 지정할 수 있다.
    @Injectable() 데코레이터는 모든 서비스에 지정해야 한다.


@NgModule()
    providers 

@Component()
    providers 
    서비스 프로바이더를 컴포넌트 트리의 특정 브랜치에 등로갛면 해당 브랜치 범위에 이 서비스를 사용하도록 지정할 수 있다.
    providers 로 이 계층에 새로운 Service 인스턴스가 생성된다


@Directive()
    providers 


Injector
    injector.get()
    injector.get(서비스)를 통해 직접 인스턴스를 가져올 수 있

서비스 안에 서비스를 의존성 주입
    생성자(constructor) 에 정의


클래스가 아닌 의존성 객체는 InjectionToken 객체를 정의하는 방법으로도 프로바이더를 등록



트리 셰이킹은 애플리케이션에 사용되지 않은 코드를 최종 번들링 결과물에 포함시키지 않는 기능을 의미
NgModule의 providers 배열이나 컴포넌트 계층에 등록된 서비스는 트리 셰이킹의 대상이 될 수 없습니다.
서비스 프로바이더를 NgModule이나 컴포넌트에 등록하지 않고 서비스에 @Injectable() 데코레이터로 직접 등록하면 트리 셰이킹 대상으로 지정할 수 있습니다.








