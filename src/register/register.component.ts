import {Component} from "../../@cinera/component";
import {SharedService} from "../shared/services/shared.service";

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
    styleUrl: './register.component.css'
}, 'register')
export class RegisterComponent {
    havij = 'Man register havij hastm!';
    sib = 'aaa di di';
    hg = 0;
    kio = 200;
    tColor = '#7b087b';
    profileMsg = 'Man Profile aaa!';

    constructor(public name: string,
                private sharedService: SharedService) {
        this.hg = Math.random() * 10;
        setTimeout(() => {
            // console.log(this.sharedService.hh);
            // this.testVar = 20;
            // this.objTest.a = 50;
            // this.imageSourceeee = '3423432432423';
        }, 3000);
    }

    onInit() {
        // console.log(444);
    }

    find() {
        return Math.random() * 10;
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


    mind(x: number) {
        console.log(333);
        this.sib = '7777';
        this.tColor = '#dadada';
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
