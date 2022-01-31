// declare module "*.html" {
//     const content: string;
//     export default content;
// }
// @ts-ignore
import templateString from "../src/login/login.component.html";
// @ts-ignore
import cssString from "../src/login/login.component.css";
console.log(cssString[0][1]);

export function Component(obj: {selector: string, templateUrl: string, styleUrl: string}, mainPath: string) {
    var path = 'src/' + mainPath + '/';
    console.log(__dirname);
    var tempHtmlLoc = path + obj.templateUrl.replace('./', '');
    fetch(tempHtmlLoc).then((data) => {
        data.text().then(html => {
            var hoora = 'aaaaaaa';
            const varToString = (varObj: any) => Object.keys(varObj)[0];

            const havij = 42;
            const displayName = varToString({ havij });
            console.log(displayName)
            // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
            var regex= "\{{" + displayName + "}}";
            console.log(regex);
            // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
            var currentHTML = html.replace(new RegExp(regex, "g"), havij.toString());
            console.log(currentHTML);
            var wrapper= document.createElement('div');
            wrapper.innerHTML = currentHTML;
            if (mainPath === 'login') {
                document.body.appendChild(wrapper);
            }
        });
    });

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
        console.log(target);
        console.log(target.prototype);
        console.log(propertyKey);
        console.log(descriptor);
        console.log("first(): called");
    };
}
