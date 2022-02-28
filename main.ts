import {LoginComponent} from "./src/login/login.component";
import {RegisterComponent} from "./src/register/register.component";
import {Core} from "./@cinera/core";
import {ProfileComponent} from "./src/profile/profile.component";
import {MainCore} from "./@cinera/main-core";
import {Route} from "./@cinera/route";
import {Injector} from "./@cinera/injector";
import {AppModule} from "./src/app.module";
// main.ts

// const htm: string = "./src/product/product.component.html";
// var html = require(htm);
// console.log(html); // <p>Hello world !</p>

let fileName: any;

const demo = document.createElement('button');
demo.innerHTML = 'hvj';

const inp = document.createElement('input');

inp.addEventListener('input', (ev: any) => {
    fileName = ev.target.value;
});

fileName = 'product.component';

import(/* webpackChunkName: 'animal' */ `./src/product/${fileName}.html`)
    .then(m => {
        // console.warn('CHUNK LOADED!', m.default);
        // m.default();
    })
    .catch(console.warn);

demo.addEventListener('click', () => {
    import(/* webpackChunkName: 'animal' */ `./src/product/${fileName}.html`)
        .then(m => {
            // console.warn('CHUNK LOADED!', m.default);
            // m.default();
        })
        .catch(console.warn);
});


document.body.appendChild(demo);
document.body.appendChild(inp);
// export default function pageLoader(platform="desktop", componentName: any) {
//     switch (platform) {
//         case "mobile":
//             return import(`./${componentName}`);
//
//         case "desktop":
//             return import(`./${componentName}`);
//     }
// }

// async function getComponent() {
//     const lodash = 'lodash';
//     const dd = await import(lodash);
//     console.log(dd);
// }

export class Main {
    title: string = 'aaaa';

    constructor() {
    }
}
const appModule: any = AppModule;

// const element = document.createElement('div');
// const button = document.createElement('button');
// button.innerHTML = '222';
// element.appendChild(button);

// Note that because a network request is involved, some indication
// of loading would need to be shown in a production-level site/app.
// button.onclick = e => import(/* webpackChunkName: "print" */ './src/register.module').then(module => {
//     const print = module.RegisterModule;
//     console.log(print);
// });
// document.body.appendChild(element);
// console.log(2);
var agg = document.createElement('link');
agg.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css');
agg.setAttribute('rel', 'stylesheet');

document.head.appendChild(agg);

const route = new Route();

route.urlChanges().subscribe(
    (data: any) => {
        console.log(window);
        const split = data.pathName.split('/');
        for (let i = 0; i < appModule.routes.length; i++) {
            if (appModule.routes[i].path === split[1]) {
                console.log(split);
                console.log(appModule);
                console.log(data);
                if (appModule.routes[i].component) {
                    console.log(2, appModule.routes);
                    const instance = Injector.resolve(appModule.routes[i].component);
                    const mainCore = new MainCore();
                    console.log(1);
                    const tempWindow: any = Object.keys(window);
                    console.log(tempWindow);
                    for (let j = 0; j < tempWindow.length; j++) {
                        if (tempWindow[j].includes('comp_') && tempWindow[j] !== 'comp_app') {
                            console.log(111);
                            delete (window[tempWindow[j]] as any).instance;
                            delete window[tempWindow[j]];
                        }
                    }
                    console.log(window);
                    mainCore.buildNewComponent(instance, appModule.obj.declarations, null, appModule.routes[i].component).then((bootstrapHTML) => {
                        console.log(bootstrapHTML);
                        if (document.getElementsByTagName('router-outlet').length === 0) {
                            document.getElementsByTagName('app-root')[0].innerHTML = '<router-outlet></router-outlet>';
                        }
                        document.getElementsByTagName('router-outlet')[0].replaceWith(bootstrapHTML);
                    });
                } else {
                    console.log(3);
                    appModule.routes[i].loadChildren().then((dd: any) => {
                        fixModule(dd.obj, dd, dd);
                        // dd.previous = 'one';
                        // console.log(dd);
                        // const routes = dd.obj.imports.find((v: any) => v.routes).routes;
                        // console.log(routes);
                        // const route = new Route();
                        // for (let i = 0; i < routes.length; i++) {
                        //     let split = route.afterRawUrl.split('/');
                        //     // console.log(split);
                        //     split.splice(0, 2);
                         //     split = split.join();
                        //     console.log(split);
                        //     console.log(routes[i].path);
                        //     if (split === routes[i].path) {
                        //         console.log(routes[0]);
                        //         console.log(dd.obj);
                        //         onAfterBootstrap(routes[i].component, dd.obj, dd);
                        //         console.log(routes[i]);
                        //         if (routes[i].component) {
                        //
                        //         } else {
                        //             routes[i].loadChildren().then((dd: any) => {
                        //                 console.log(dd);
                        //             });
                        //         }
                        //         console.log(routes[i]);
                        //     }
                        // }
                    });
                }
            }
        }

    }
);

function fixModule(obj: any, target: any, topModule: any) {
    const routes = obj.imports.find((v: any) => v.routes).routes;
    const route = new Route();
    for (let i = 0; i < routes.length; i++) {
        let splitString = route.afterRawUrl;
        splitString = splitString.replace(topModule.mainPath, '');
        splitString = splitString.replace('//' , '');
        let sentence = '';
        let isFound = false;
        for (let j = 0; j < splitString.length; j++) {
            sentence = sentence + splitString[j];
            if (sentence === routes[i].path || sentence === (routes[i].path === '' ? '/' : routes[i].path)) {
                isFound = true;
            }
        }
        if (isFound) {
            if (routes[i].component) {
                onAfterBootstrap(routes[i].component, obj, target);
            } else {
                routes[i].loadChildren().then((dd: any) => {
                    dd.previous = 'one';
                    dd.mainPath = topModule.mainPath + '/' + routes[i].path;
                    console.log(topModule.mainPath + '/' + routes[i].path);
                    fixModule(dd.obj, target, dd);
                });
            }
        }
    }
}

function onAfterBootstrap(bootstrapComponent: any, mainObj: any, target: any) {
    const instance = Injector.resolve(bootstrapComponent);
    const mainCore = new MainCore();
    mainCore.buildNewComponent(instance, mainObj, null, bootstrapComponent).then((bootstrapHTML) => {
        console.log(bootstrapHTML);
        if (document.getElementsByTagName('router-outlet').length === 0) {
            document.getElementsByTagName('app-root')[0].innerHTML = '<router-outlet></router-outlet>';
        }
        document.getElementsByTagName('router-outlet')[0].replaceWith(bootstrapHTML);
    });
}

//
// var mainClass = new Main();
// var bootstrap: any = LoginComponent;
// var declarations: any[] = [
//     LoginComponent,
//     RegisterComponent,
//     ProfileComponent
// ];
// var loginInstance = Injector.resolve(bootstrap);
// const core = new Core();
// const mainCore = new MainCore();
//
//
// mainCore.buildNewComponent(loginInstance, declarations).then((bootstrapHTML) => {
//     document.body.appendChild(bootstrapHTML);
// });
//
// function loop(instance: any, mainCore: any) {
//     setTimeout(() => {
//         mainCore.updateTags(instance);
//         loop(instance, mainCore);
//     }, 100);
// }
//
// function attachHTMLToPage() {
//     for (let i = 0; i < declarations.length; i++) {
//         const tags = document.getElementsByTagName(declarations[i].prototype.obj.selector);
//         if (tags.length > 0) {
//             for (let j = 0; j < tags.length; j++) {
//                 if (!tags[j].firstChild) {
//                     const inst = new declarations[i];
//                     console.log(inst);
//                     const core3 = new Core();
//                     core3.buildNewComponent(inst).then((instHTML: any) => {
//                         console.log(instHTML);
//                         tags[j].replaceWith(instHTML);
//                         loop(inst, core3);
//                     });
//                 }
//
//             }
//         }
//     }
// }


// let user = new LoginComponent("dany");
// let register = new RegisterComponent('ddd');
// let city = new City(222);
// let ny = new City(254);
// console.log(Object.getPrototypeOf(user));
// console.log(user);

// window.addEventListener('popstate', function (event) {
//     // Log the state data to the console
//     console.log(event.state);
// });

// window.onpopstate = function(event) {
//     alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };

// var route = new Route();
// var testClass = new Test(route);

// testClass.buildButton();

// window.onpopstate = function (event) {
//     if (route.url !== location.href) {
//         route.url = location.href;
//         if (event.state) {
//             // history changed because of pushState/replaceState
//             console.warn('THEY DID IT AGAIN222!');
//         } else {
//             // history changed because of a page load
//             console.warn('THEY DID IT AGAIN!');
//         }
//     }
// }

// testClass.getQueryParams().subscribe(
//     (tt) => {
//         console.log(tt);
//     }
// );


// chartOptions.havij();


//     function color(value: string) {
//     // this is the decorator factory, it sets up
//     // the returned decorator function
//     return function (target) {
//         // this is the decorator
//         // do something with 'target' and 'value'...
//     };
// }
