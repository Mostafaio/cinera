import {LoginComponent} from "./src/login/login.component";
import {RegisterComponent} from "./src/register/register.component";
import {Core} from "./@cinera/core";
import {ProfileComponent} from "./src/profile/profile.component";
import {MainCore} from "./@cinera/main-core";
import {Injector} from "./@cinera/injector";
import {AppModule} from "./src/app.module";

export class Main {
    title: string = 'aaaa';

    constructor() {
    }
}

const appModule = AppModule;

const element = document.createElement('div');
const button = document.createElement('button');
button.innerHTML = '222';
element.appendChild(button);

// Note that because a network request is involved, some indication
// of loading would need to be shown in a production-level site/app.
button.onclick = e => import(/* webpackChunkName: "print" */ './src/register.module').then(module => {
    const print = module.RegisterModule;
    console.log(print);
});
document.body.appendChild(element);
console.log(2);
// var agg = document.createElement('link');
// agg.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css');
// agg.setAttribute('rel', 'stylesheet');
//
// document.head.appendChild(agg);
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
