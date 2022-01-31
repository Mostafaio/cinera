import {LoginComponent} from "./src/login/login.component";
import {RegisterComponent} from "./src/register/register.component";


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

var a = document.createElement('element-details');
var p = document.createElement('p');
// p.innerHTML = '{{firstname}} {{lastname}}';
// a.appendChild(p);
document.body.appendChild(a);
console.log(a);

var mainClass = new Main();
// var login = new LoginComponent();

let user = new LoginComponent("dany");
let register = new RegisterComponent('ddd');
// let city = new City(222);
// let ny = new City(254);
console.log(Object.getPrototypeOf(user));
console.log(user);

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

0
