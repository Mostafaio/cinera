import {LoginComponent} from "./src/login/login.component";
import {RegisterComponent} from "./src/register/register.component";
import {Core} from "./@cinera/core";
import {ProfileComponent} from "./src/profile/profile.component";
import {MainCore} from "./@cinera/main-core";

export class Main {
    title: string = 'aaaa';

    constructor() {
        // var test = new Test();
        // test.buildButton();
    }

    // havij() {
    //     console.log(1222);
    //     range(1, 200)
    //         .pipe(
    //             filter(x => x % 2 === 1),
    //             map(x => x + x)
    //         )
    //         .subscribe(x => console.log(x));
    // }

    // sib() {
    //     return aaaa;
    // }
}

customElements.define('element-details',
    class extends HTMLElement {
        constructor() {
            super();
            // const newEl = document.createElement('p');
            // newEl.innerHTML = 'gggg';
            // this.appendChild(newEl);
            // const shadowRoot = this.attachShadow({mode: 'open'})
            //     .appendChild(newEl.cloneNode(true));
        }

        connectedCallback() {
            this.className = 'ddddd';
            // browser calls this method when the element is added to the document
            // (can be called many times if an element is repeatedly added/removed)
        }

        disconnectedCallback() {
            // browser calls this method when the element is removed from the document
            // (can be called many times if an element is repeatedly added/removed)
        }

        static get observedAttributes() {
            return [/* array of attribute names to monitor for changes */];
        }

        attributeChangedCallback(name: any, oldValue: any, newValue: any) {
            // called when one of attributes listed above is modified
        }

        adoptedCallback() {
            // called when the element is moved to a new document
            // (happens in document.adoptNode, very rarely used)
        }
    }
);

var agg = document.createElement('link');
agg.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css');
agg.setAttribute('rel', 'stylesheet');

document.head.appendChild(agg);


var a = document.createElement('element-details');
var p = document.createElement('p');
// p.innerHTML = '{{firstname}} {{lastname}}';
// a.appendChild(p);
document.body.appendChild(a);
// console.log(a);

var mainClass = new Main();
// var login = new LoginComponent();
var bootstrap: any = LoginComponent;
var declarations: any[] = [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
];
// var cc = Test2;
// (cc.prototype as any).declarations = declarations;
// console.log(bootstrap.prototype);
// console.log(declarations);
// console.log((declarations[0].prototype as any).obj);
// bootstrap.prototype.sub.subscribe(
//     (dd: any) => {
//         attachHTMLToPage((bootstrap.prototype as any).html, (bootstrap.prototype as any).obj.selector);
//     }
// );

// console.log((declarations[0].prototype as any));

var loginInstance = new bootstrap();
// var ad = new declarations[1]();
// var ad2 = new declarations[1]();
const core = new Core();
const mainCore = new MainCore();


mainCore.buildNewComponent(loginInstance, declarations).then((bootstrapHTML) => {
    document.body.appendChild(bootstrapHTML);
    // loop(loginInstance, core);
    // attachHTMLToPage();
});

// @ts-ignore

// const obj = {
//     localA: loginInstance.havij,
//     get a() {
//         return this.localA;
//     },
//     set a(value) {
//         this.localA = value;
//         console.log(`localA is changed to ${value}`);
//     }
// };

const obj2 = {
    foo: 'havij'
};

function repeatChecking(oldValue: any) {
    if(oldValue) {
        setInterval(() => {
            if(obj2.foo !== oldValue) {
                console.log(`Value of ${oldValue} to ${obj2.foo}`);
                oldValue = obj2.foo;
            }
        }, 10);
    }
}

// repeatChecking(obj2.foo);
// obj2.foo = "I have changed.";

setTimeout(()=> {
    obj2.foo = "I have changed again.";
}, 1000);

// loginInstance.havij = 111
// obj.a = 5;
// obj.a = 6;
// loginInstance.havij = 'aaa';
// console.log(obj.a);

// core.buildNewComponent(loginInstance).then((bootstrapHTML) => {
//     // console.log(bootstrapHTML);
//     // console.log(loginInstance.obj);
//     // var wrapper: any = document.createElement('div');
//     // wrapper.innerHTML = bootstrapHTML;
//     document.body.appendChild(bootstrapHTML);
//     loop(loginInstance, core);
//     attachHTMLToPage();
//
//     // core.setEvents(loginInstance);
//     // attachHTMLToPage();
// });

function loop(instance: any, mainCore: any) {
    setTimeout(() => {
        mainCore.updateTags(instance);
        loop(instance, mainCore);
    }, 100);
}

function attachHTMLToPage() {
    for (let i = 0; i < declarations.length; i++) {
        // htmlSource = htmlSource.replace('/' + 'as' + '/g', '');
        // var regex = "<" + declarations[i].prototype.obj.selector + ">.*?<\/" + declarations[i].prototype.obj.selector + '>'; // \s*
        // console.log(regex);
        // console.log(htmlSource.includes(declarations[i].prototype.obj.selector));
        const tags = document.getElementsByTagName(declarations[i].prototype.obj.selector);
        if (tags.length > 0) {
            for (let j = 0; j < tags.length; j++) {
                if (!tags[j].firstChild) {
                    const inst = new declarations[i];
                    console.log(inst);
                    // if (j === 0) {
                    const core3 = new Core();
                    core3.buildNewComponent(inst).then((instHTML: any) => {
                        console.log(instHTML);
                        tags[j].replaceWith(instHTML);
                        loop(inst, core3);
                        // attachHTMLToPage();
                    });
                    // } else {
                    //     var core2 = new Core();
                    //     core2.buildNewComponent(inst).then((instHTML) => {
                    //         console.log(instHTML);
                    //         tags[j].replaceWith(instHTML);
                    //         loop(inst, core2);
                    //         attachHTMLToPage();
                    // });
                    // }

                    // core.buildComponent(inst).then((instHTML) => {
                    //     tags[j].innerHTML = instHTML;
                    //     attachHTMLToPage();
                    // });
                    // Object.getPrototypeOf(inst).sub.subscribe(
                    //     () => {
                    //         // htmlSource = htmlSource.replace(new RegExp(regex, '\g'), declarations[i].prototype.html);
                    //         // wrapper.innerHTML = htmlSource;
                    //     }
                    // );
                    // console.log(111, tags[j].localName, Object.getPrototypeOf(inst).html);
                }

            }
        }
    }
}


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
