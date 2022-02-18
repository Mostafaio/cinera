import {MainCore} from "./main-core";

export class Handler {
    selector = '';

    constructor(private selectorName: string, private declarations: any, private tag: any) {
        console.log(selectorName);
        const mainCore = new MainCore();
        this.createHTML(mainCore);
    }

    createHTML(mainCore: any) {
        const classIndex = this.declarations.findIndex((v: any) => v.prototype.obj.selector === this.selectorName);
        const inst = new this.declarations[classIndex];
        mainCore.buildNewComponent(inst, this.declarations).then((instHTML: any) => {
            console.log(instHTML);
            // this.tag.org.innerHTML = instHTML.innerHTML;
            this.tag.current.innerHTML = instHTML.innerHTML;
            console.log(this.tag.current);
        });
        // document.body.appendChild(bootstrapHTML);
        // loop(loginInstance, core);
        // attachHTMLToPage();
    }
}
