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
    aTag = 'https://poralist.com';
    imageSource = 'https://api.poralist.com/api-v1/files/file-test/public/logo.png';
    isShow = false;
    inpVal = '';

    constructor() {
    }

    onClickBox(x: number, y: number) {
        console.log(x, y);
        if (x === 2) {
            this.imageSource = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhbmdlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';
        } else {
            this.imageSource = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        }
        console.log(this.imageSource);
        // alert('havij' + x);
    }

    getImageSource(x: any, y: any) {
        return this.imageSource;
    }

    getTestVal() {
        return this.inpVal;
    }

    getImageSource2(x: number) {
        return this.imageSource + 5555 + x;
    }

    test() {
        console.log('hhhhhh');
    }

    writeInp(e: any, t: any) {
        this.inpVal = t.target.value;
        console.log(this.inpVal);
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
