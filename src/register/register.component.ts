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
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
}, 'register')
export class RegisterComponent {
    havij = 'Man register havij hastm!';
    sib = 'aaa di di';

    constructor(public name: string) {
    }

    find() {
        return 2;
    }

    search(x: any) {
        console.log(x);
        return x;
    }

    gett(x: number, y: number) {
        return x * y;
    }

    fff(x: number, y: number) {
        return x * y;
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
