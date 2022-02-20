// declare module "*.html" {
//     const content: string;
//     export default content;
// }
// @ts-ignore
// import templateString from "../src/login/login.component.html";
// @ts-ignore
// import cssString from "../src/login/login.component.css";
import {Injector} from "./injector";

export function Component(obj: { selector: string, templateUrl: string, styleUrl: string }, mainPath: string) {
    //  {{  }}
    // ctr: Function,
    // var html = require(obj.templateUrl);
    // console.log(html);
    // fs.readFile(obj.templateUrl, 'utf8' , (err: any, data: any) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.log(data)
    // })
    //     ctr.prototype.id = Math.random();
    // ctr.prototype.created = new Date().toLocaleString("es-ES");
    // console.log(ctr.prototype.id);

    return <any>function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // console.log(Reflect.getMetadata('design:paramtypes', target));
        // console.log(target);
        // const example = Injector.resolve(target);
        // console.log(example);
        target.prototype.obj = obj;
        target.prototype.mainPath = mainPath;
        // var cc = [Test2];
        // console.log(cc[0].prototype.declarations);
        // var path = 'src/' + mainPath + '/';
        // var tempHtmlLoc = path + obj.templateUrl.replace('./', '');
        // var instance = new target();
        // console.log(Math.random() * 10);
        // target.prototype.sub = new Subject();

        // target.prototype.sub = new Observable(subscriber => {
        //     console.log(44);
        //     getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
        //         findUndefined(htmlSource, Object.keys(instance));
        //         for (let i = 0; i < Object.keys(instance).length; i++) {
        //             componentHTML = replaceTSVariableInHTML(htmlSource, Object.keys(instance)[i], instance[Object.keys(instance)[i]]);
        //         }
        //
        //         let htmlVariables: any = htmlSource.match(/\{{(.*?)\}}/g);
        //
        //         // for (let i = 1; i < Object.getOwnPropertyNames(target.prototype).length; i++) {
        //         if (htmlVariables) {
        //             for (let i = 0; i < htmlVariables.length; i++) {
        //                 componentHTML = replaceFunctionInHTML(componentHTML, Object.getOwnPropertyNames(target.prototype), target.prototype, htmlVariables[i]);
        //                 // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
        //                 // if (funcValue) {
        //                 // console.log(instance[Object.keys(instance)[i]]);
        //                 // }
        //                 // console.warn();
        //             }
        //         }
        //         // console.log(componentHTML);
        //         // attachHTMLToPage(componentHTML, mainPath, obj.selector);
        //         target.prototype.html = componentHTML;
        //         // console.log(target);
        //         target.prototype.sub.next('havij');
        //         // subscriber.next('havij');
        //     });
        //     buildOtherComponents();
        //     if (mainPath === 'register') {
        //         // var x = "console.warn(target.prototype['find']())";
        //         // eval(x);
        //     }
            // console.log(Object.getOwnPropertyNames(target.prototype));
            // console.log(Object.keys(target.prototype));
            // console.log(propertyKey);
            // console.log(descriptor);
            // console.log("first(): called");
        // });
    };
}

// function test() {
//     console.log(3 + 5);
// }

// function buildOtherComponents() {
// var login = new LoginComponent();
// }

// function replaceFunctionInHTML(htmlSource: string, funcNames: string[], targetPrototype: any, htmlVariable: string) {
//     let funcValue = '';
//     var ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
//     for (let i = 1; i < funcNames.length; i++) {
//         ff = ff.replace(funcNames[i], "targetPrototype." + funcNames[i]);
//     }
    // funcValue = eval(ff);
    // return htmlSource.replace(htmlVariable, funcValue);
    // const varToString = (varObj: any) => Object.keys(varObj)[0];
    // const havij = 42;
    // const displayName = varToString({havij});
    // console.log(displayName)
    // var regex = "\{{\\s*" + funcName + "\\((.*?)\\)\\s*}}"; // \s*
    // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
    // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
    // console.warn(funcValue);
    // let htmlVariables: any = htmlSource.match(/\{{(.*?)\}}/g);
    // console.log(i);
    // if (htmlVariables.length > 0) {
    // console.log('1111', htmlVariable.replace('{{', '').replace('}}', '').replace(/ /g, ''));
    // var ff = htmlVariable.replace('{{', '').replace('}}', '').replace(/ /g, '');
    // if (ff.includes('(') && ff.includes(')')) {
    //     console.log("targetPrototype." + ff);
    //     funcValue = eval("targetPrototype." + ff);
    // } else {
    //     funcValue = eval(ff);
    // }
    // console.log(ff);
    // if (!isNumeric(ff)) {
    //     funcValue = eval("targetPrototype." + ff);
    // } else {
    //     funcValue = ff;
    // }
    // console.log(htmlSource, ff, funcValue, htmlVariable);
    // var regex = "" + htmlVariable + "\g"; // \s*
    // var regex = "" + htmlVariable + ""; // \s*
    // console.log();
    // }
    // eval(x);
    // console.log(new RegExp(regex));

// }

// function isNumeric(n: any) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }
//
// function hh() {
//     console.log(333);
// }
//
// function replaceTSVariableInHTML(htmlSource: string, variableName: string, variableData: string) {
//     const varToString = (varObj: any) => Object.keys(varObj)[0];
//
//     // const havij = 42;
//     // const displayName = varToString({havij});
//     // console.log(displayName)
//     // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
//     var regex = "\{{\\s*" + variableName + "\\s*}}"; // \s*
//     // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
//     return htmlSource.replace(new RegExp(regex, "g"), variableData);
// }
//
// function findUndefined(htmlSource: string, variableNames: string[]) {
//     var undefinedVariables = [];
//     let htmlVariables = htmlSource.match(/\{{(.*?)\}}/g);
//     if (!htmlVariables) {
//         htmlVariables = [];
//     }
//     for (let i = 0; i < variableNames.length; i++) {
//         var index = htmlVariables.findIndex((v: any) => v === variableNames[i]);
//         if (index === -1 && htmlVariables[i]) {
//             undefinedVariables.push(htmlVariables[i]);
//             // console.error('Error:', htmlVariables[i], 'is undefined');
//         }
//     }
// }
//
// function attachHTMLToPage(htmlSource: string, mainPath: string, selector: string) {
//     var wrapper = document.createElement(selector);
//     wrapper.innerHTML = htmlSource;
//     document.body.appendChild(wrapper);
// }
//
// function getHTMLSource(tempHtmlLoc: string) {
//     return fetch(tempHtmlLoc).then((data) => {
//         return data.text().then(html => {
//             return html;
//         });
//     });
// }
