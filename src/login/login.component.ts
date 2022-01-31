import {Component} from "../../@cinera/component";

// function baseEntity(ctr: Function) {
//     console.log(ctr);
//     ctr.prototype.id = Math.random();
//     ctr.prototype.created = new Date().toLocaleString("es-ES");
//     console.log(ctr.prototype.id);
//
//     // return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     //     console.log("first(): called");
//     // };
// }

// function first(obj: {selector: string, templateUrl: string, styleUrl: string}) {
//     console.log("first(): factory evaluated", obj);
//     return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log("first(): called");
//     };
// }
//
// function second() {
//     console.log("second(): factory evaluated");
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log("second(): called");
//     };
// }

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
}, 'login')
export class LoginComponent {
    havij = 'Man havij hastm!';

    constructor(public name: string) {
    }
}

// @baseEntity
// export class City {
//     constructor(public zicode: number) {
//     }
// }

// @first({
//     selector: 'app-inbox',
//     templateUrl: './inbox.component.html',
//     styleUrl: './inbox.component.scss'
// })
// export class LoginComponent {
//
// }
