import {MainCore} from "./main-core";

export class Handler {
    selector = '';

    constructor(private selectorName: string, private declarations: any, private tag: any) {
        console.log(selectorName);
        const mainCore = new MainCore();
        this.createHTML(mainCore);
    }

    createHTML(mainCore: any) {
        console.log(this.tag);
        const classIndex = this.declarations.findIndex((v: any) => v.prototype.obj.selector === this.selectorName);
        const inst = new this.declarations[classIndex];
        // if (this.selectorName === 'app-profile') {
        //     this.tag.current.remove();
        // }
        mainCore.buildNewComponent(inst, this.declarations, this.tag).then((instHTML: any) => {
            console.log(instHTML);
            // this.tag.org.innerHTML = instHTML.innerHTML;

            // this.tag.current.innerHTML = instHTML.innerHTML;

            var tempTags = document.getElementsByTagName('*');
            console.log([tempTags]);

            console.log(this.tag.current);
        });
        // document.body.appendChild(bootstrapHTML);
        // loop(loginInstance, core);
        // attachHTMLToPage();
    }
}
