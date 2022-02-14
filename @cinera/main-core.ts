export class MainCore {
    tags: { org: any, current: any, changes: any[], invVariables: [], invFunctions: [], arr?: any[] }[] = [];
    instance: any;
    mainElement: any;
    comments: any = [];
    testoli: any;

    constructor() {
        // super(props);

    }

    buildNewComponent(instance: any) {
        this.instance = instance;
        var instancePrototype = Object.getPrototypeOf(instance);
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        var tempCSSLoc = path + instancePrototype.obj.styleUrl.replace('./', '');
        var classFunctions = Object.getOwnPropertyNames(instancePrototype);
        var classVariables = Object.keys(instance);
        var classFuncVars = classVariables.concat(classFunctions);
        // @ts-ignore
        window['aobj'] = {
            variables: {},
            functions: {}
        };
        for (let i = 0; i < classVariables.length; i++) {
            // @ts-ignore
            // console.log(window['aobj']);
            // @ts-ignore
            window.aobj.variables[classVariables[i]] = this.instance[classVariables[i]];
        }
        for (let i = 1; i < classFunctions.length; i++) {
            // instance[dd[0]].apply(instance, dd[1].split(','))
            // @ts-ignore
            window.aobj.functions[classFunctions[i]] = (a, b, c, d, f, g, h, j, k, l) => {
                return this.instance[classFunctions[i]](a, b, c, d, f, g, h, j, k, l);
            };
        }
        // @ts-ignore
        for (let m = 0; m < classVariables.length; m++) {
            var ingg = instance[classVariables[m]];
            if (typeof ingg === 'object') {
                if (ingg.length) {
                    ingg = ingg.slice();
                } else {
                    ingg = Object.assign({}, ingg);
                }
            }
            var changes = this.changeDetection(ingg, classVariables[m]);
        }
        // for (let m = 0; m < classFunctions.length; m++) {
        // @ts-ignore
        // this.tags[m].invFunctions.push(classFunctions[m]);
        // console.log(this.tags[m].invFunctions.push);
        var value = '';
        // var dd = split[k].split('(');
        // if (dd.length > 1) {
        //     dd[1] = dd[1].substr(0, dd[1].length - 1);
        //     value = instance[dd[0]].apply(instance, dd[1].split(','));
        // } else {
        //     value = instance[split[k]];
        // }
        // var ingg = instance[dd[0]].apply(instance, dd[1].split(','));
        // if (typeof ingg === 'object') {
        //     ingg = ingg.slice();
        // }
        // var changes = this.changeFunctionDetection(ingg, dd[0], dd[1]);
        // this.tags[i].changes.push(changes);
        // }

        // this.instance.havij = '5';
        // console.log(classFunctions);
        this.getHTMLSource(tempCSSLoc).then((cssSource: string) => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.type = 'text/css';
            style.innerHTML = cssSource;

        });
        // console.log(classVariables);
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            var mainElement = document.createElement(instancePrototype.obj.selector);
            mainElement.innerHTML = htmlSource;
            this.mainElement = mainElement;
            var children = [];
            var tempTags = mainElement.getElementsByTagName('*');
            for (let i = 0; i < tempTags.length; i++) {
                if (tempTags[i].nodeType !== 3) {
                    children.push(tempTags[i]);
                }
            }
            for (let i = 0; i < children.length; i++) {
                children[i].uniqId = Math.random() * 10000;
                this.tags.push({
                    org: children[i].cloneNode(true),
                    current: children[i],
                    changes: [],
                    invVariables: [],
                    invFunctions: []
                });
                for (let j = 0; j < children[i].attributes.length; j++) {
                    if (this.tags[i].org.attributes[j]) {
                        if (!this.tags[i].org.attributes[j].nodeName.match(/\(.*?\)/)) {
                            const split = children[i].attributes[j].value.split(';');
                            for (let k = 0; k < split.length; k++) {
                                const perSplit = split[k].split('(');
                                if (perSplit.length > 1) {
                                    for (let m = 0; m < classFunctions.length; m++) {
                                        perSplit[0] = perSplit[0].replace('!', '');
                                        perSplit[0] = perSplit[0].replace('+', '');
                                        if (perSplit[0] === classFunctions[m]) {
                                            // @ts-ignore
                                            this.tags[i].invFunctions.push(classFunctions[m]);
                                            var value = '';
                                            var dd = split[k].split('(');
                                            if (dd.length > 1) {
                                                dd[1] = dd[1].substr(0, dd[1].length - 1);
                                                value = instance[dd[0]].apply(instance, dd[1].split(','));
                                            } else {
                                                value = instance[split[k]];
                                            }
                                            var ingg = instance[dd[0]].apply(instance, dd[1].split(','));
                                            if (typeof ingg === 'object') {
                                                ingg = ingg.slice();
                                            }
                                            var changes = this.changeFunctionDetection(ingg, dd[0], dd[1]);
                                            this.tags[i].changes.push(changes);
                                        }
                                    }
                                } else {
                                    const varSplit = split[k].split(' =');
                                    for (let m = 0; m < classVariables.length; m++) {
                                        varSplit[0] = varSplit[0].replace('!', '');
                                        varSplit[0] = varSplit[0].replace('+', '');
                                        if (varSplit[0] === classVariables[m]) {
                                            // @ts-ignore
                                            this.tags[i].invVariables.push(classVariables[m]);
                                            var ingg = instance[classVariables[m]];
                                            if (typeof ingg === 'object') {
                                                if (ingg.length) {
                                                    ingg = ingg.slice();
                                                } else {
                                                    ingg = Object.assign({}, ingg);
                                                }
                                            }
                                            // console.log(this.tags[i]);
                                            // var changes = this.changeDetection(ingg, classVariables[m]);
                                            this.tags[i].changes.push(changes);
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                this.updateTag(i);
            }
            // console.log(this.tags);
            return mainElement;
        });
    }

    changeFunctionDetection(oldValue: any, functionName: any, args: any) {
        if (oldValue) {
            setInterval(() => {
                let obj2 = this.instance[functionName].apply(this.instance, args.split(','));
                // obj2 = this.instance[variableName];
                if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                    // console.log(oldValue, obj2);
                    var tags = [];
                    // for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                    //     if (this.mainElement.childNodes[i].nodeType !== 3) {
                    //         tags.push(this.mainElement.childNodes[i]);
                    //     }
                    // }
                    oldValue = obj2;
                    for (let i = 0; i < this.tags.length; i++) {
                        var founds = this.tags[i].invFunctions.filter((v: any) => v === functionName);
                        if (founds.length > 0) {
                            this.updateTag(i);
                        }
                    }
                }
            }, 50);
        }
    }

    changeDetection(oldValue: any, varName: string) {
        // if (oldValue) {
        setInterval(() => {
            let obj2 = this.instance[varName];
            // obj2 = this.instance[variableName];
            if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                // console.log(oldValue, obj2);
                var tags = [];
                // for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                //     if (this.mainElement.childNodes[i].nodeType !== 3) {
                //         tags.push(this.mainElement.childNodes[i]);
                //     }
                // }
                if (typeof obj2 === 'object') {
                    if (obj2.length) {
                        oldValue = obj2.slice();
                    } else {
                        oldValue = Object.assign({}, obj2);
                    }
                } else {
                    oldValue = obj2;
                }
                // @ts-ignore
                window.aobj.variables[varName] = oldValue;
                for (let i = 0; i < this.tags.length; i++) {
                    var founds = this.tags[i].invVariables.filter((v: any) => v === varName);
                    if (founds.length > 0) {
                        this.updateTag(i);
                    }
                }
            }
        }, 50);
        // }
    }

    splitMulti(str: any, tokens: any) {
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar).replace(/ /g, '');
        }
        str = str.split(tempChar);
        return str;
    }

    updateTag(index: number) {
        let isTarget = false;

        const classVariables = Object.keys(this.instance);
        const instancePrototype = Object.getPrototypeOf(this.instance);
        const classFunctions = Object.getOwnPropertyNames(instancePrototype);
        // @ts-ignore
        // window.aobj.functions['getImageSource6'] = (x) => {
        //     // @ts-ignore
        //     return this.instance.getImageSource2(x);
        // };

        // console.log(mainSentence);
        // if (this.tags[index].current.textContent.match(/\B\\w+/)) {
        //     this.tags[index].current.textContent = this.replaceNames(this.tags[index].current.textContent);
        // }
        // for (let i = 0; i < classVariables.length; i++) {
        //     var regex = "\{{\\s*" + classVariables[i] + "\\s*}}"; // \s*
        //     if (this.tags[index].current.textContent) {
        //         // console.log(regex);
        //         // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]));
        //         this.tags[index].current.textContent = this.tags[index].current.textContent.replace(new RegExp(regex, "g"), this.instance[classVariables[i]]);
        //         // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), 'golabi'));
        //         // console.log([currentTag]);
        //     }
        //     // console.log(instance[funcVariables[i]]);
        //     isTarget = true;
        // }
        // for (let f = 0; f < classFunctions.length; f++) {
        //     var regex = "\{{\\s*" + classFunctions[f] + "\\s*}}"; // \s*
        //     console.log(this.tags[index].current.textContent);
        //     if (this.tags[index].current.textContent) {
        // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]));
        // this.tags[index].current.textContent = this.tags[index].current.textContent.replace(new RegExp(regex, "g"), this.instance[classFunctions[f]]);
        // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), 'golabi'));
        // console.log([currentTag]);
        // }
        // console.log(instance[funcVariables[i]]);
        //     isTarget = true;
        // }


        if (this.tags[index].org.attributes.length > 0) {
            for (let j = 0; j < this.tags[index].org.attributes.length; j++) {
                // directives with brackets []
                if (this.tags[index].org.attributes[j].nodeName.match(/\[.*?\]/)) {
                    if (this.tags[index].org.attributes[j].nodeName === '[ngstyle]') {
                        const splitNode = this.tags[index].org.attributes[j].value.split('?');
                        const splitStyles = splitNode[1].split(':');
                        const condition = this.replaceNames(this.tags[index].org.attributes[j].value.split('?')[0]);
                        let targetStyles = this.replaceNames(this.tags[index].org.attributes[j].value);
                        this.setStylesOnElement(targetStyles, this.tags[index].current);
                    }
                    if (this.tags[index].org.attributes[j].nodeName === '[ngclass]') {
                        const splitNode = this.tags[index].org.attributes[j].value.split('?');
                        const splitClasses = splitNode[1].split(':');
                        let targetClasses = '';
                        const condition = this.replaceNames(splitNode[0]);
                        if (condition) {
                            targetClasses = splitClasses[0].replace(/'/g, '');
                            targetClasses = targetClasses.slice(1, targetClasses.length - 1)
                        } else {
                            targetClasses = splitClasses[1].replace(/'/g, '');
                            targetClasses = targetClasses.slice(1, targetClasses.length - 1)
                        }
                        this.tags[index].current.className = targetClasses;
                    }
                    isTarget = true;
                    var hh = this.tags[index].org.attributes[j].value;
                    // const valSplit = hh.split(';');
                    // var value = '';
                    // console.log(hh);
                    const withoutSpace = this.replaceNames(hh);
                    // console.log(withoutSpace);
                    // for (let i = 0; i < valSplit.length; i++) {
                    //     var dd = valSplit[i].split('(');
                    //     console.log(dd);
                    //     if (dd.length > 1) {
                    //         dd[1] = dd[1].substr(0, dd[1].length - 1);
                    //         console.log(this.instance);
                    //         console.log(dd[0]);
                    //         value = this.instance[dd[0]].apply(this.instance, dd[1].split(','));
                    //     } else {
                    //         const ddSplit = this.splitMulti(dd[0], ['+', '-', '/', '*', +'%']);
                    //         const ddSplit2 = this.splitMulti(dd[0], ['+', '-', '/', '*', +'%']);
                    //         const ddSplitOperations = this.splitMulti(dd[0], ddSplit);
                    //
                    //         console.log(ddSplitOperations);
                    //         console.log(ddSplit);
                    // for (let m = 0; m < classVariables.length; m++) {
                    //     for (let l = 0; l < ddSplit.length; l++) {
                    //         if (ddSplit[l] === classVariables[m]) {
                    //             ddSplit[l] = this.instance[ddSplit[l]];
                    //         }
                    //     }
                    // }
                    // let varReplace = 0;
                    //
                    // for (let m = 0; m < ddSplitOperations.length; m++) {
                    //     if (ddSplitOperations[m] === '') {
                    // console.log(typeof (ddSplit[varReplace]));
                    // const replaced = ddSplit2[varReplace].replace(/'/g, '').replace(/"/g, '');
                    // console.log(replaced);
                    // console.log(ddSplit[varReplace]);
                    // console.log(ddSplit2[varReplace]);
                    // ddSplitOperations[m] = ddSplit2[varReplace].replace(replaced, ddSplit[varReplace]);
                    // } else {
                    //     varReplace++;
                    // }
                    // }
                    // console.log(ddSplitOperations.join(' '));
                    // console.log(Function("return " + ddSplitOperations.join(' '))());
                    // console.log(ddSplit);
                    // value = this.instance[valSplit[i]];
                    // }
                    // console.log(valSplit[i]);

                    // }
                    this.tags[index].current.setAttribute(this.tags[index].org.attributes[j].nodeName.match(/(?<=\[).+?(?=\])/), withoutSpace);
                    this.tags[index].current.removeAttribute(this.tags[index].org.attributes[j].nodeName);
                }

                // events with ()
                if (this.tags[index].org.attributes[j].nodeName.match(/\(.*?\)/)) {
                    isTarget = true;
                    var gg = this.tags[index].org.attributes[j].value;
                    var eventName = this.tags[index].org.attributes[j].nodeName.match(/(?<=\().+?(?=\))/);

                    const valSplit = gg.split(';');
                    var value = '';
                    this.tags[index].current.addEventListener(eventName, (event: any) => {
                        for (let i = 0; i < valSplit.length; i++) {
                            var dd = valSplit[i].split('(');
                            if (dd.length > 1) {
                                // @ts-ignore
                                var ggf = valSplit[i].match(/(?<=\().+?(?=\))/g);
                                if (ggf) {
                                    ggf = ggf[0].split(',');
                                    for (let b = 0; b < ggf.length; b++) {
                                        ggf[b] = ggf[b].replace(/ /g, '');
                                        if (this.isJson(ggf[b])) {
                                            ggf[b] = JSON.parse(ggf[b].toLowerCase());
                                        }
                                        if (ggf[b].toString().replace(/ /g, '') === '$event') {
                                            ggf[b] = event;
                                        }
                                        for (let m = 0; m < classVariables.length; m++) {
                                            if (ggf[b] === classVariables[m]) {
                                                ggf[b] = this.instance[ggf[b]];
                                            }
                                        }
                                    }
                                }
                                this.instance[dd[0]].apply(this.instance, ggf);
                            } else {
                                var valsplt = valSplit[i].split('=');
                                this.instance[valsplt[0].replace(/ /g, '')] = Function("return " + valsplt[1])(); // which is same as "return 2+4"
                            }
                        }
                    });
                }

                // *ngIf
                if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngi\w+/)) {
                    isTarget = true;
                    const ff = this.tags[index].org.attributes[j].value;

                    const value2 = this.replaceNames(ff);
                    // var ff = this.tags[index].org.attributes[j].value;
                    // for (let k = 0; k < classVariables.length; k++) {
                    //     ff = ff.replace(classVariables[k], "this.instance." + classVariables[k]);
                    // }
                    // var value2 = eval(ff);
                    if (!value2) {
                        const comment = document.createComment(this.tags[index].current.uniqId);
                        this.comments.push(comment);
                        this.tags[index].current.parentNode.insertBefore(comment, this.tags[index].current.nextSibling);
                        this.mainElement = this.tags[index].current.parentNode;

                        this.tags[index].current.remove();
                    } else {
                        for (let g = 0; g < this.comments.length; g++) {
                            if (+this.comments[g].data === +this.tags[index].current.uniqId) {
                                this.tags[index].current = this.tags[index].org.cloneNode(true);
                                this.tags[index].current.uniqId = this.comments[g].data;
                                this.comments[g].parentNode.insertBefore(this.tags[index].current, this.comments[g].nextSibling);
                                this.comments[g].remove();
                                this.comments.splice(g, 1);
                                this.mainElement = this.tags[index].current.parentNode;
                                this.updateTag(index);
                            }
                        }
                    }

                }

                // *ngFor
                if (this.tags[index].org.attributes[j].nodeName.match(/\B\*ngfo\w+/)) {
                    isTarget = true;
                    //      console.log(this.tags[index].current.COMMENT_NODE);
                    //     console.log(this.tags[index].org.attributes[j].value);
                    var ff = this.tags[index].org.attributes[j].value.split(' of ');
                    var nameOfIn = ff[0].split('let ')[1];
                    // console.log(nameOfIn);
                    // console.log(this.tags[index]);
                    //     // console.log(this.tags[index].current);
                    var arr = this.replaceNames(ff[1]);
                    //     // var df = document.createElement('span');
                    //     // df.innerHTML = '333';
                    //     realTag.after(df);
                    //     // console.log(this.tags[index].current.previousSibling);
                    //     const comment = document.createComment(this.tags[index].org.attributes[j].value);
                    //     // console.log([realTag]);
                    //     console.log([this.tempTags[index - 1]]);
                    //     // (this.tempTags[index - 2] as any).before(comment);
                    //     // console.log([this.tags[index].current]);
                    //     this.tags[index].current.removeAttribute(this.tags[index].org.attributes[j].nodeName);
                    //     this.tags[index].current.setAttribute('ngFor', 'true');
                    //     // console.log(this.mainElement);
                    //     const tagCode = Math.random() * 10000;
                    //     realTag.ffor = ff[1];
                    //     this.tags[index].current.ffor = ff[1];
                    //     realTag.havij = tagCode;
                    //     this.tags[index].current.havij = tagCode;
                    //     realTag.forIndex = 0;
                    //     this.tags[index].current.forIndex = 0;
                    //     this.forTags.push({
                    //         mainTagIndex: index,
                    //         tagCode: tagCode,
                    //         newTags: []
                    //     });
                    //
                    //     var testD = [];
                    //     // this.tags[index].current.innerHTML = arr[0];
                    //

                    this.tags[index].current.removeAttribute(this.tags[index].org.attributes[j].nodeName);

                    if (!this.tags[index].arr) {
                        for (let i = 1; i < arr.length; i++) {
                            //         if (!this.tags[index].current.parentNode) {
                            // var this.instancePrototype = Object.getPrototypeOf(this.instance);
                            // var parent = document.getElementsByTagName(this.instancePrototype.obj.selector);
                            //             // if (parent.length > 0) {
                            //             // var cloneNode = this.tags[index].current.cloneNode(true);
                            var newD = this.tags[index].current.cloneNode(true);
                            var newDOrg = this.tags[index].org.cloneNode(true);
                            newDOrg.removeAttribute(newDOrg.attributes[j].nodeName);
                            newD = this.mainElement.insertBefore(newD, this.tags[index].current.nextSibling);
                            newD.forIndex = i;
                            newD.forName = ff[1];
                            newD.forOfName = ff[0];
                            this.tags.splice(index + i, 0, {
                                current: newD,
                                changes: [],
                                invFunctions: this.tags[index].invFunctions,
                                invVariables: this.tags[index].invVariables,
                                org: newDOrg
                            });
                            // this.updateTag(index + i);
                            console.log(this.tags, index);
                            //             var newD: any = document.createElement('p');
                            //             newD.setAttribute('aaa', '3333');
                            //             newD.ffor = ff[1];
                            //             newD.ffor = ff[1];
                            //             newD.innerHTML = this.tags[index].current.innerHTML;
                            //             newD.forIndex = i;
                            //             // newD.replaceWith(cloneNode);
                            //             // newD.innerHTML = arr[i];
                            //             testD.push(newD);
                            //             this.forTags[this.forTags.length - 1].newTags.push(newD);
                            //             if (i === 1) {
                            //                 newD = this.mainElement.insertBefore(newD, realTag.nextSibling);
                            //             } else {
                            //                 newD = this.mainElement.insertBefore(newD, this.forTags[this.forTags.length - 1].newTags[i - 2].nextSibling);
                            //             }
                            //             // newD.innerHTML = '333333';
                            //             // realTag.after(df);
                            //             this.tags.push({
                            //                 tag: newD.cloneNode(true),
                            //                 xpath: this.getXPathForElement(newD, this.mainElement),
                            //                 tagAfterEval: newD
                            //             });
                            //             // console.log(this.mainElement);
                            //             // }
                            //         }
                        }

                    } else {
                        // @ts-ignore
                        if (this.tags[index].arr.length > arr.length) {
                            console.log(77);
                            // @ts-ignore
                            for (let c = 0; c < this.tags[index].arr.length; c++) {
                                // @ts-ignore
                                if (this.tags[index].arr[c] !== arr[c]) {
                                    // @ts-ignore
                                    this.tags[index + c].current.remove();
                                }
                            }
                            // @ts-ignore
                        } else if (this.tags[index].arr.length < arr.length) {
                            // this.tags.splice(index + 1, 0, {
                            //     current: newD,
                            //     changes: [],
                            //     invFunctions: this.tags[index].invFunctions,
                            //     invVariables: this.tags[index].invVariables,
                            //     org: newDOrg
                            // });
                        } else {

                        }
                    }

                    this.tags[index].current.forIndex = 0;
                    this.tags[index].current.forName = ff[1];
                    this.tags[index].current.forOfName = ff[0];
                    this.tags[index].arr = arr.slice();
                    //     var ab = this.instance[ff[1]].slice();
                    //     this.repeatChecking2(ab, this.instance, ff[1], this.tags[index].current, this.forTags.length - 1, testD);
                    // this.tags[index].current.remove();
                    // console.log(this.forTags);
                    // this.tags[index].current.parentNode.insertBefore(newD, this.tags[index].current.nextSibling);
                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     ff = ff.replace(funcVariables[k], "this.instance." + funcVariables[k]);
                    // }
                    // var value = eval(ff);
                    // var value = Function('"use strict";return (' + ff + ')')();
                    // if (!value) {
                    //     this.tags[index].current = value;
                    // this.tags[index].current.remove();
                    // }
                }

            }
        }
        let mainSentence = '';
        let sentence = '';
        // console.log(this.tags[index].current.textContent);
        for (let i = 0; i < this.tags[index].current.textContent.length; i++) {
            if ((sentence === '' || sentence === '{') && this.tags[index].current.textContent[i] === '{') {
                sentence = sentence + this.tags[index].current.textContent[i];
            } else if (sentence.length > 1) {
                // console.log(sentence);
                sentence = sentence + this.tags[index].current.textContent[i];
                if (sentence[sentence.length - 1] === '}' && sentence[sentence.length - 2] === '}') {
                    // @ts-ignore
                    // console.log(sentence.match(/(?<=\{\{).+?(?=\}})/g)[0], this.replaceNames('getImageSource()'));
                    // @ts-ignore
                    mainSentence = mainSentence + this.replaceNames(sentence.match(/(?<=\{\{).+?(?=\}})/g)[0]);
                    sentence = '';
                    // console.log(mainSentence);
                }
            } else {
                mainSentence = mainSentence + this.tags[index].current.textContent[i];
            }
        }
        this.tags[index].current.textContent = mainSentence;
        // let htmlFuncs: any = this.tags[index].current.textContent.match(/(?<=\{{).+?(?=\}})/g);
        // // console.log(htmlFuncs);
        // // for (let i = 0; i < funcs.length; i++) {
        // if (htmlFuncs) {
        //     // console.log([this.tags[index].current]);
        //     for (let j = 0; j < htmlFuncs.length; j++) {
        //         htmlFuncs[j] = htmlFuncs[j].replace(/ /g, '');
        //         var dd = htmlFuncs[j].split('(');
        //         if (dd.length > 1) {
        //             // @ts-ignore
        //             var ggf = htmlFuncs[j].match(/(?<=\().+?(?=\))/g);
        //             if (ggf) {
        //                 ggf = ggf[0].split(',');
        //                 for (let b = 0; b < ggf.length; b++) {
        //                     if (this.isJson(ggf[b])) {
        //                         ggf[b] = JSON.parse(ggf[b].toLowerCase());
        //                     }
        //                     if (ggf[b].toString().replace(/ /g, '') === '$event') {
        //                         ggf[b] = event;
        //                     }
        //                 }
        //             }
        //         }
        //         this.tags[index].current.textContent = this.instance[dd[0]].apply(this.instance, ggf);
        //         // if (realTag.ffor) {
        //         // console.log(currentTag.ffor + '[' + currentTag.forIndex + ']');
        //         // console.log(instance['arr2'][2]);
        //         // console.log(instance[currentTag.ffor][currentTag.forIndex]);
        //         // currentTag.textContent = instance[realTag.ffor][realTag.forIndex];
        //         // } else {
        //         // console.log(dd[0]);
        //         // }
        //         // console.log(currentTag);
        //
        //         isTarget = true;
        //         // instance[dd[0]].apply(instance, ggf);
        //     }
        // }
    }

    replaceNames(hh: any) {
        const classVariables = Object.keys(this.instance);
        const instancePrototype = Object.getPrototypeOf(this.instance);
        const classFunctions = Object.getOwnPropertyNames(instancePrototype);
        var withoutSpace = hh.replace(/ /g, '');
        var aa = 'adasd';
        // console.log('havok 4545 adasd'.replace(/\{{aa}}/g, 'golabi'));
        // console.log('.aobj.aobj.haaaaa'.replace(/\.aobj\.aobj/g, '.aobj'));
        for (let m = 0; m < classVariables.length; m++) {
            var regex = "\s*" + classVariables[m] + "\s*";
            withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), 'aobj\.variables.' + classVariables[m]);
            withoutSpace = withoutSpace.replace(/aobj\.variables\.aobj\.variables/g, 'aobj\.variables');
        }
        for (let m = 0; m < classFunctions.length; m++) {
            var regex = "\s*" + classFunctions[m] + "\s*";
            withoutSpace = withoutSpace.replace(new RegExp(regex, "g"), 'aobj.functions.' + classFunctions[m]);
            withoutSpace = withoutSpace.replace(/aobj\.functions\.aobj\.functions/g, 'aobj\.functions');
            withoutSpace = withoutSpace.replace(/aaobj\.functions\./g, 'a');
        }
        return Function("return " + withoutSpace)();
    }

    setStylesOnElement(styles: any, element: any) {
        Object.assign(element.style, styles);
    }

    isJson(str: any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    getHTMLSource(tempHtmlLoc: string) {
        return fetch(tempHtmlLoc).then((data) => {
            return data.text().then(html => {
                return html;
            });
        });
    }
}