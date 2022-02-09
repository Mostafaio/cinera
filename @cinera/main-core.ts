export  class MainCore {
    tags: {org: any, current: any, changes: any, invVariables: [], invFunctions: []}[] = [];
    instance: any;
    constructor() {
        // super(props);

    }

    buildNewComponent(instance: any) {
        this.instance = instance;
        var instancePrototype = Object.getPrototypeOf(instance);
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        var classFunctions = Object.getOwnPropertyNames(instancePrototype);
        var classVariables = Object.keys(instance);
        var classFuncVars = classVariables.concat(classFunctions);
        console.log(classFunctions);
        console.log(classVariables);
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            var mainElement = document.createElement(instancePrototype.obj.selector);
            mainElement.innerHTML = htmlSource;
            var children = [];
            var tempTags = mainElement.getElementsByTagName('*');
            for (let i = 0; i < tempTags.length; i++) {
                if (tempTags[i].nodeType !== 3) {
                    children.push(tempTags[i]);
                }
            }
            console.log(children);
            for (let i = 0; i < children.length; i++) {
                this.tags.push({
                    org: children[i],
                    current: children[i],
                    changes: null,
                    invVariables: [],
                    invFunctions: []
                });
                for (let j = 0; j < children[i].attributes.length; j++) {
                    const split = children[i].attributes[j].value.split(';');
                    console.log(split);
                    for (let k = 0; k < split.length; k++) {
                        const perSplit = split[k].split('(');
                        if (perSplit.length > 1) {
                            for (let m = 0; m < classFunctions.length; m++) {
                                if (perSplit[0] === classFunctions[m]) {
                                    // @ts-ignore
                                    this.tags[i].invFunctions.push(classFunctions[m]);
                                }
                            }
                        } else {
                            const varSplit = split[k].split(' =');
                            for (let m = 0; m < classVariables.length; m++) {
                                if (varSplit[0] ===  classVariables[m]) {
                                    // @ts-ignore
                                    this.tags[i].invVariables.push(classVariables[m]);
                                }
                            }
                        }
                    }
                }
            }
            console.log(this.tags);
            return mainElement;
        });
    }

    changeDetection(oldValue: any, obj2: any) {
        if (oldValue) {
            setInterval(() => {
                // obj2 = this.instance[variableName];
                if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                    var tags = [];
                    // for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                    //     if (this.mainElement.childNodes[i].nodeType !== 3) {
                    //         tags.push(this.mainElement.childNodes[i]);
                    //     }
                    // }
                    oldValue = obj2.slice();
                }
            }, 50);
        }
    }

    getHTMLSource(tempHtmlLoc: string) {
        return fetch(tempHtmlLoc).then((data) => {
            return data.text().then(html => {
                return html;
            });
        });
    }
}
