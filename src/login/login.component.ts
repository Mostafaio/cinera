import {Component} from "../../@cinera/component";
import {SharedService} from "../shared/services/shared.service";
import {Route} from "../../@cinera/route";
import {PostsModel} from "../shared/models/posts.model";

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
    styleUrl: './login.component.css'
}, 'login')
export class LoginComponent {
    havij = 'Man havij hastm!';
    aTag = 'https://poralist.com';
    imageSourceeee = 'https://api.poralist.com/api-v1/files/file-test/public/logo.png';
    isShow = false;
    inpVal = 'fgfgf';
    arr = [1, 2, 3];
    arr2 = [5, 6, 7];
    testVar = 10;
    objTest = {
        a: 20
    };
    randImage = false;
    hav = 'dsds';
    posts: any = false;
    post0Title = '';
    post0Image = '';
    post1Title = '';
    post1Image = '';

    constructor(private sharedService: SharedService,
                private route: Route) {
        this.sharedService.getData().subscribe(
            (data: any) => {
                this.posts = data;
                this.post0Title = this.posts[0].title;
                this.post0Image = 'https://api.poralist.com/api-v1/files/file-test' + this.posts[0].image;
                this.post1Title = this.posts[1].title;
                this.post1Image = 'https://api.poralist.com/api-v1/files/file-test' + this.posts[1].image;
                console.log(this.posts);
            }
        );
        // this.sharedService.sendData('https://api.poralist.com/api-v1/ads/page/0', {"filters":{"search":"","main":true,"price":90000000,"gPrice":0,"category":"6108d7f682553205f350bad5"},"sort":{"type":"date","order":"-1"}}).subscribe();
        this.havij = this.sharedService.hh;


        this.sharedService.hh = '6666';
        // this.sharedService.getData().subscribe(
        //     (data: any) => {
        //         console.log(data.count);
        //         console.log(data);
        //     }
        // );
        setTimeout(() => {
            console.log(this.sharedService.hh);
            // this.testVar = 20;
            // this.objTest.a = 50;
            // this.imageSourceeee = '3423432432423';
        }, 2000);
        setTimeout(() => {
            // this.testVar = 20;
            // this.objTest.a = 50;
            // this.imageSourceeee = '5465656565';
            // this.havij = '5555';
            // @ts-ignore
            window['inpVal'] = this.inpVal;
            console.log(11);
        }, 4000);
        // setInterval(() => {
        //     this.arr2.push(Math.random() * 100);
        // }, 1000);

        // window['havij'] = (e: any, d: any) => {
        //     console.log(e, d);
        //     // this.test();
        // };

        // @ts-ignore
        window['aobj'] = {};

        // @ts-ignore

        window.aobj['kiko'] = () => {
            // @ts-ignore
            // window['havij']('22', '555');
            console.log('2222');
        };

        // Function("return " + 'aobj.kiko()')();

        // @ts-ignore
        window['getImageSource6'] = (x) => {
            // @ts-ignore
            return this.getImageSource2(x);
        };
        console.log(222.);
    }

    onInit() {
        console.log(444);
    }

    test4(havij: any) {
        return havij;
    }

    test5() {
        return 'test5 hastam';
    }

    onClickBox2() {
        // this.arr[0] = Math.round(+(Math.random() * 100).toString());
        // for (let i = 0; i < 30; i++) {
        // this.arr.push(Math.random() * 100);
        this.arr.pop();
        // this.arr.splice(1, 3);
        // this.arr[1] = 10;
        // this.arr.splice(1, 1);
        // this.havij = Math.random().toString();
        // console.log(this.havij);
        // }
        // console.log(this.arr);
        // setTimeout(() => {
        //     for (let i = 0; i < 30; i++) {
        //         this.arr.pop();
        //     }
        // }, 1000);
        // console.log(this.arr);
    }

    onClickBox3() {
        this.arr.push(Math.random() * 100);
        // this.arr.push(Math.random() * 100);
    }

    onClickBox4() {
        this.arr[1] = 10;
    }

    onClickBox(x: number) {

        this.randImage = !this.randImage;
        // this.arr.pop();
        // this.arr[0] = Math.round(+(Math.random() * 100).toString());
        // this.arr.pop();
        // console.log(333);
        // this.imageSourceeee = (Math.random() * 10).toString();
        // console.log(this.imageSourceeee);
        // this.aTag  = (Math.random() * 10).toString();
        // console.log(this.aTag);
        // console.log(x, y);
        if (this.randImage) {
            this.imageSourceeee = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhbmdlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';
        } else {
            this.imageSourceeee = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        }
        // console.log(this.imageSource);
        // console.log(this.arr);
        // alert('havij' + x);
    }


    onClickR(x: number, status: boolean): number {
        console.log(222);
        this.isShow = !this.isShow;
        return this.testVar * 10;
    }

    getImageSource() {
        return this.havij;
    }

    getTestVal() {
        return this.inpVal;
    }

    getImageSource2(x: number) {
        return this.imageSourceeee + 5555 + x;
    }

    getImageSource3(val: any, fr: any) {
        console.log(val);
        console.log(fr);
    }

    test() {
        console.log('hhhhhh');
    }

    getBool(x: any) {
        return x;
    }

    writeInp(e: any, t: any) {
        console.log(t);
        // this.inpVal = t.target.value;
        // this.havij = this.inpVal;
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
