export class Core {
    htmlSource = '';
    obj: { selector: string, templateUrl: string, styleUrl: string } = {
        selector: '',
        templateUrl: '',
        styleUrl: ''
    };
    tags: { tag: any, xpath: string, tagAfterEval: any }[] = [];
    mainElement: any;
    tempTags: any[] = [];
    forTags: { mainTagIndex: number, newTags: any[], tagCode: number }[] = [];
    instance: any;


    constructor() {
    }

    updateTags(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        // console.log(this.mainElement);
        // console.log(this.tags);
        // console.log(instance.imageSource);
        // console.log(instance);
        // this.tags[2].tagAfterEval.innerHTML = 3333;
        console.log(this.tags);
        for (let i = 0; i < this.tags.length; i++) {
            const currentTag = this.tags[i].tagAfterEval.cloneNode(true);
            var tagAttributes = currentTag.attributes;
            var funcs = Object.getOwnPropertyNames(instancePrototype);
            var variables = Object.keys(instance);
            var funcVariables = variables.concat(funcs);
            const newTag = this.getTagAfterEval(tagAttributes, currentTag, funcVariables, instance, funcs, variables, this.tags[i].tagAfterEval, i).cTag;
            // console.log(newTag);
            // console.log(newTag, this.tags[i].tagAfterEval, JSON.stringify(newTag) === JSON.stringify(this.tags[i].tagAfterEval));+
            if (newTag) {
                // console.log(newTag, this.tags[i].tagAfterEval);
                if (!this.tags[i].tagAfterEval.isEqualNode(newTag)) {
                    this.tags[i].tagAfterEval.replaceWith(newTag);
                    this.tags[i].tagAfterEval = newTag;
                    // console.log(this.tags[i].tagAfterEval);
                }
                // console.log(this.tags[i].tagAfterEval.isEqualNode(newTag));
            }
            // console.log(this.tags[i]);
            // console.log(newTag, this.tags[i]);
            // if (!newTag) {
            //     tags[i].remove();
            // } else {
            //     tags[i].replaceWith(newTag);
            // }
        }

    }

    buildNewComponent(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        this.obj = instancePrototype.obj;
        this.instance = instance;
        var aa = instance.aTag;
        var ab = instance.arr.slice();
        // ab.push(5);
        // this.repeatChecking(aa, instance);

        var dg = instance.getImageSource();
        this.repeatChecking3(dg, instance);

        this.instance.imageSource = '65656';
        this.instance.imageSource = '2222';
        this.instance.imageSource = '42424';

        this.instance.aTag = '222222';
        // console.log(ab);
        // console.log(aa, this.instance.aTag);
        var componentHTML = '';
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            var mainElement = document.createElement(instancePrototype.obj.selector);
            mainElement.innerHTML = htmlSource;
            const vv = document.createElement('p');
            vv.innerHTML = '44444';
            mainElement.appendChild(vv);
            var funcs = Object.getOwnPropertyNames(instancePrototype);
            var variables = Object.keys(instance);
            var funcVariables = variables.concat(funcs);
            // var tags = mainElement.childNodes;
            // console.log(tags);
            // console.log(tags);
            this.mainElement = mainElement;
            console.log(this.mainElement.childNodes);
            var tags = [];
            for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                if (this.mainElement.childNodes[i].nodeType !== 3) {
                    tags.push(this.mainElement.childNodes[i]);
                }
            }
            // var tags = this.mainElement.childNodes.map((v: any) => v.nodeType !== 3);
            this.tempTags = tags;
            // this.mainElement.appendChild(vv);
            // console.log(tags[i].attributes);
            for (let i = 1; i < tags.length; i++) {
                if (tags[i].nodeType !== 3 && tags[i].nodeType !== 8) {
                    const currentTag = tags[i].cloneNode(true);
                    var tagAttributes = currentTag.attributes;
                    // var fd = document.createElement('span');
                    // tags[i].appendChild(fd);
                    const afterEval = this.getTagAfterEval(tagAttributes, currentTag, funcVariables, instance, funcs, variables, tags[i], i);
                    if (afterEval.isTarget) {
                        const newTag = afterEval.cTag;
                        this.tags.push({
                            tag: tags[i].cloneNode(true),
                            xpath: this.getXPathForElement(tags[i], mainElement),
                            tagAfterEval: newTag
                        });
                        // console.log(this.tags);
                        // console.log(newTag);
                        // console.log(tags[i]);
                        if (!newTag) {
                            tags[i].remove();
                        } else {
                            tags[i].replaceWith(newTag);
                        }
                    }
                }
            }
            // this.mainElement = mainElement;
            // console.log(this.tags);
            return mainElement;
        });
    }

    getTagAfterEval(tagAttributes: any, currentTag: any, funcVariables: string[], instance: any, funcs: string[] = [], variables: string[] = [], realTag: any, index: number) {
        var isTarget = false;

        // interpolation
        // console.log(variables);
        for (let i = 0; i < variables.length; i++) {
            var regex = "\{{\\s*" + variables[i] + "\\s*}}"; // \s*
            if (currentTag.textContent) {
                // console.log(regex);
                // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]));
                currentTag.textContent = currentTag.textContent.replace(new RegExp(regex, "g"), instance[variables[i]]);
                // console.log(currentTag.textContent.replace(new RegExp(regex, "g"), 'golabi'));
                // console.log([currentTag]);
            }
            // console.log(instance[funcVariables[i]]);
            isTarget = true;
        }
        // var regex = "\{{\\s*" + funcVariables[i] + "\\s*}}"; // \s*
        // if (currentTag.textContent) {
        //     var value = '';
        //     var dd = valSplit[i].split('(');
        //     if (dd.length > 1) {
        //         dd[1] = dd[1].substr(0, dd[1].length - 1);
        //         value = instance[dd[0]].apply(instance, dd[1].split(','));
        //     } else {
        //         value = instance[valSplit[i]];
        //     }
        //     currentTag.textContent = currentTag.textContent.replace(new RegExp(regex, "g"), instance[funcVariables[i]]);
        // }
        // }


        if (tagAttributes.length > 0) {
            for (let j = 0; j < tagAttributes.length; j++) {


                // directives with brackets []
                if (tagAttributes[j].nodeName.match(/\[.*?\]/)) {
                    isTarget = true;
                    var hh = tagAttributes[j].value;

                    const valSplit = hh.split(';');
                    var value = '';
                    for (let i = 0; i < valSplit.length; i++) {
                        var dd = valSplit[i].split('(');
                        if (dd.length > 1) {
                            dd[1] = dd[1].substr(0, dd[1].length - 1);
                            value = instance[dd[0]].apply(instance, dd[1].split(','));
                        } else {
                            value = instance[valSplit[i]];
                        }
                    }
                    // console.log( window[instance[]]);
                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     hh = hh.replace(funcVariables[k], "instance." + funcVariables[k]);
                    // }
                    // var a = 'aTag';
                    // console.log(instance[a]);
                    // var value = eval(hh);
                    currentTag.setAttribute(tagAttributes[j].nodeName.match(/(?<=\[).+?(?=\])/), value);
                    currentTag.removeAttribute(tagAttributes[j].nodeName);
                }

                // events with ()
                if (tagAttributes[j].nodeName.match(/\(.*?\)/)) {
                    isTarget = true;
                    // this.getHavij(tagAttributes, j, funcVariables, currentTag, instance);
                    var gg = tagAttributes[j].value;
                    var eventName = tagAttributes[j].nodeName.match(/(?<=\().+?(?=\))/);

                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     gg = gg.replace(funcVariables[k], "instance." + funcVariables[k]);
                    // }
                    const valSplit = gg.split(';');
                    var value = '';
                    currentTag.addEventListener(eventName, (event: any) => {
                        // eval(gg);
                        for (let i = 0; i < valSplit.length; i++) {
                            var dd = valSplit[i].split('(');
                            if (dd.length > 1) {
                                // @ts-ignore
                                var ggf = valSplit[i].match(/(?<=\().+?(?=\))/g);
                                if (ggf) {
                                    ggf = ggf[0].split(',');
                                    for (let b = 0; b < ggf.length; b++) {
                                        if (this.isJson(ggf[b])) {
                                            ggf[b] = JSON.parse(ggf[b].toLowerCase());
                                        }
                                        if (ggf[b].toString().replace(/ /g, '') === '$event') {
                                            ggf[b] = event;
                                        }
                                    }
                                }

                                instance[dd[0]].apply(instance, ggf);
                                // console.log(instance[dd[0]].apply(instance, ggf));
                            } else {
                                console.log(valSplit[i].split('='));
                                var valsplt = valSplit[i].split('=');
                                console.log(valsplt);
                                // instance[valsplt[0]] = Function("return " + valSplit[i].match(/\s*=\s*(.*)/)[0].replace('=', ''))(); // which is same as "return 2+4"
                                instance[valsplt[0].replace(/ /g, '')] = Function("return " + valsplt[1])(); // which is same as "return 2+4"
                            }
                        }
                        // console.log(instance);
                        // Function('"use strict";return (' + gg + ')')();
                        // console.log(instance.aTag);
                        // console.log(gg);
                    });
                }

                // *ngIf
                // if (tagAttributes[j].nodeName.match(/\B\*ngi\w+/)) {
                //     isTarget = true;
                //     // console.log(tagAttributes[j].value);
                //     var ff = tagAttributes[j].value;
                //     for (let k = 0; k < funcVariables.length; k++) {
                //         ff = ff.replace(funcVariables[k], "instance." + funcVariables[k]);
                //     }
                //     var value = eval(ff);
                //     // var value = Function('"use strict";return (' + ff + ')')();
                //     if (!value) {
                //         currentTag = value;
                //         // currentTag.remove();
                //     }
                //
                // }

                // *ngFor
                if (tagAttributes[j].nodeName.match(/\B\*ngfo\w+/)) {
                    isTarget = true;
                    // console.log(currentTag.COMMENT_NODE);
                    // console.log(tagAttributes[j].value);
                    var ff = tagAttributes[j].value.split(' of ');
                    var nameOfIn = ff[0].split('let ')[1];
                    // console.log(ff);
                    // console.log(nameOfIn);
                    // console.log(instance[ff[1]]);
                    // console.log(currentTag);
                    var arr = instance[ff[1]];
                    // var df = document.createElement('span');
                    // df.innerHTML = '333';
                    // realTag.after(df);
                    // console.log(currentTag.previousSibling);
                    const comment = document.createComment(tagAttributes[j].value);
                    // console.log([realTag]);
                    // console.log([this.tempTags[index - 1]]);
                    // (this.tempTags[index - 2] as any).before(comment);
                    // console.log([currentTag]);
                    currentTag.removeAttribute(tagAttributes[j].nodeName);
                    currentTag.setAttribute('ngFor', 'true');
                    // console.log(this.mainElement);
                    const tagCode = Math.random() * 10000;
                    realTag.ffor = ff[1];
                    currentTag.ffor = ff[1];
                    realTag.havij = tagCode;
                    currentTag.havij = tagCode;
                    realTag.forIndex = 0;
                    currentTag.forIndex = 0;
                    this.forTags.push({
                        mainTagIndex: index,
                        tagCode: tagCode,
                        newTags: []
                    });

                    var testD = [];
                    // currentTag.innerHTML = arr[0];

                    for (let i = 1; i < arr.length; i++) {
                        // console.log(currentTag);
                        if (!currentTag.parentNode) {
                            // var instancePrototype = Object.getPrototypeOf(instance);
                            // var parent = document.getElementsByTagName(instancePrototype.obj.selector);
                            // if (parent.length > 0) {
                            // var cloneNode = currentTag.cloneNode(true);
                            // var newD = currentTag.cloneNode(true);
                            var newD: any = document.createElement('p');
                            newD.setAttribute('aaa', '3333');
                            newD.ffor = ff[1];
                            newD.ffor = ff[1];
                            newD.innerHTML = currentTag.innerHTML;
                            newD.forIndex = i;
                            // newD.replaceWith(cloneNode);
                            // newD.innerHTML = arr[i];
                            testD.push(newD);
                            this.forTags[this.forTags.length - 1].newTags.push(newD);
                            if (i === 1) {
                                newD = this.mainElement.insertBefore(newD, realTag.nextSibling);
                            } else {
                                newD = this.mainElement.insertBefore(newD, this.forTags[this.forTags.length - 1].newTags[i - 2].nextSibling);
                            }
                            // newD.innerHTML = '333333';
                            // realTag.after(df);
                            this.tags.push({
                                tag: newD.cloneNode(true),
                                xpath: this.getXPathForElement(newD, this.mainElement),
                                tagAfterEval: newD
                            });
                            // console.log(this.mainElement);
                            // }
                        }
                    }
                    var ab = instance[ff[1]].slice();
                    this.repeatChecking2(ab, instance, ff[1], currentTag, this.forTags.length - 1, testD);
                    // currentTag.remove();
                    // console.log(this.forTags);
                    // currentTag.parentNode.insertBefore(newD, currentTag.nextSibling);
                    // for (let k = 0; k < funcVariables.length; k++) {
                    //     ff = ff.replace(funcVariables[k], "instance." + funcVariables[k]);
                    // }
                    // var value = eval(ff);
                    // var value = Function('"use strict";return (' + ff + ')')();
                    // if (!value) {
                    //     currentTag = value;
                    // currentTag.remove();
                    // }
                }
            }
        }

        let htmlFuncs: any = currentTag.textContent.match(/(?<=\{{).+?(?=\}})/g);
        // console.log(htmlFuncs);
        // for (let i = 0; i < funcs.length; i++) {
        if (htmlFuncs) {
            console.log([currentTag]);
            for (let j = 0; j < htmlFuncs.length; j++) {
                htmlFuncs[j] = htmlFuncs[j].replace(/ /g, '');
                var dd = htmlFuncs[j].split('(');
                if (dd.length > 1) {
                    // @ts-ignore
                    var ggf = htmlFuncs[j].match(/(?<=\().+?(?=\))/g);
                    if (ggf) {
                        ggf = ggf[0].split(',');
                        for (let b = 0; b < ggf.length; b++) {
                            if (this.isJson(ggf[b])) {
                                ggf[b] = JSON.parse(ggf[b].toLowerCase());
                            }
                            if (ggf[b].toString().replace(/ /g, '') === '$event') {
                                ggf[b] = event;
                            }
                        }
                    }
                }
                if (realTag.ffor) {
                    // console.log(currentTag.ffor + '[' + currentTag.forIndex + ']');
                    // console.log(instance['arr2'][2]);
                    // console.log(instance[currentTag.ffor][currentTag.forIndex]);
                    currentTag.textContent = instance[realTag.ffor][realTag.forIndex];
                } else {
                    // currentTag.textContent = instance[dd[0]].apply(instance, ggf);
                }
                console.log(currentTag);

                isTarget = true;
                // instance[dd[0]].apply(instance, ggf);
            }
        }

        return {cTag: currentTag, isTarget: isTarget};
    }

    repeatChecking3(oldValue: any, obj2: any) {
        if (oldValue) {
            setInterval(() => {
                obj2 = this.instance.getImageSource();
                if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                    console.log(`Value of ${oldValue} to ${obj2}`);
                    oldValue = obj2.slice();
                }
            }, 10);
        }
    }

    // test(testD: any) {
    //     // testD[0].innerHTML = Math.random();
    //     this.forTags[0].newTags[0].innerHTML = Math.random();
    //     console.log(2);
    //     this.sleep(50);
    //     // this.test(testD);
    //     // setTimeout(() => {
    //     //     this.test(testD);
    //     // }, 500);
    // }

    // sleep(milliseconds: any) {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //         if ((new Date().getTime() - start) > milliseconds){
    //             break;
    //         }
    //     }
    // }

    getNodeIndex(node: any) {
        var index = 0;
        for (let i = 0; i < this.mainElement.children.length; i++) {
            if (this.mainElement.children[i].havij === node.havij) {
                index = i;
            }
        }
        return index;
    }

    repeatChecking2(oldValue: any, obj2: any, variableName: string, currentTag: any, newTagIndex: any, testD: any[]) {
        // console.log(this.forTags, testD);
        // console.log(newTagIndex);
        // console.log(currentTag.havij);
        // console.log([currentTag]);
        console.log(Object.assign({}, this.mainElement.children));
        console.log(newTagIndex);
        if (oldValue) {
            // this.test(testD);
            // setTimeout(() => {
            //     testD[0].innerHTML = 33333;
            // }, 100);
            setInterval(() => {
                // console.log(tags);
                // tags[this.forTags[0].mainTagIndex] = Math.random();
                // console.log(this.tags);
                // testD[0].innerHTML = 33333;
                // testD[0].innerHTML = '22222';
                // this.forTags[0].newTags[0].innerHTML = '5555';
                obj2 = this.instance[variableName];
                if (JSON.stringify(obj2) !== JSON.stringify(oldValue)) {
                    // console.log(obj2);
                    let difference = obj2.filter((x: any) => !oldValue.includes(x));
                    // let bigger = obj2;
                    // let smaller = oldValue;
                    // if (bigger.length < oldValue.length) {dassadasdasdas
                    //     bigger = oldValue;
                    //     smaller = obj2;
                    // }
                    var tags = [];
                    for (let i = 0; i < this.mainElement.childNodes.length; i++) {
                        if (this.mainElement.childNodes[i].nodeType !== 3) {
                            tags.push(this.mainElement.childNodes[i]);
                        }
                    }
                    console.log(oldValue, obj2, tags);
                    console.log(newTagIndex, newTagIndex);
                    if (oldValue.length > obj2.length) {
                        newTagIndex = this.getNodeIndex(currentTag);
                        for (let i = 0; i < oldValue.length - obj2.length; i++) {
                            tags[newTagIndex + oldValue.length - 1 - i].remove();
                            // this.forTags[newTagIndex].newTags[obj2.length + i].remove();
                        }
                    } else if (oldValue.length < obj2.length) {
                        newTagIndex = this.getNodeIndex(currentTag);
                        for (let i = 0; i < obj2.length - oldValue.length; i++) {
                            var newD = currentTag.cloneNode(true);
                            newD.innerHTML = obj2[oldValue.length + i];
                            this.mainElement.insertBefore(newD, tags[newTagIndex + oldValue.length - 1].nextSibling);
                            // tags[this.forTags[0].mainTagIndex + oldValue.length - 1 + i].remove();
                            // this.forTags[newTagIndex].newTags[obj2.length + i].remove();
                        }
                    } else {
                        for (let i = 0; i < obj2.length; i++) {
                            if (obj2[i] !== oldValue[i]) {
                                console.log(444);
                                // testD[i].innerHTML = obj2[i];
                                tags[newTagIndex + i].innerHTML = obj2[i];
                                // this.forTags[newTagIndex].newTags[i].innerHTML = obj2[i];
                            }
                        }
                    }
                    console.log(this.forTags);
                    // for (let i = 0; i < bigger.length; i++) {
                    //     if (smaller[i] !== bigger[i]) {
                    //         if (!smaller[i] && smaller[i] === obj2[i]) {
                    //             var newD = currentTag.cloneNode(true);
                    //             console.log(this.forTags[0].newTags.length - 1);
                    //             this.forTags[0].newTags[this.forTags[0].newTags.length - 1].remove();
                    //             this.forTags[0].newTags.pop();
                    //             console.log(this.forTags);
                    //             // newD.innerHTML = newD.innerHTML + Math.random();
                    //             // this.mainElement.insertBefore(newD, this.forTags[0].newTags[this.forTags[0].newTags.length - 1].nextSibling);
                    //             // this.tags.push({
                    //             //     tag: newD.cloneNode(true),
                    //             //     xpath: this.getXPathForElement(newD, this.mainElement),
                    //             //     tagAfterEval: newD
                    //             // });
                    //             // this.forTags[this.forTags.length - 1].newTags.push(newD);
                    //             console.log(newD);
                    //             console.log(33);
                    //         } else if (!smaller[i] && smaller[i] !== obj2[i]) {
                    //             var newD = currentTag.cloneNode(true);
                    //             newD.innerHTML = newD.innerHTML + Math.random();
                    //             this.mainElement.insertBefore(newD, this.forTags[0].newTags[this.forTags[0].newTags.length - 1].nextSibling);
                    //             this.tags.push({
                    //                 tag: newD.cloneNode(true),
                    //                 xpath: this.getXPathForElement(newD, this.mainElement),
                    //                 tagAfterEval: newD
                    //             });
                    //             this.forTags[this.forTags.length - 1].newTags.push(newD);
                    //             console.log(newD);
                    //             console.log(33);
                    //         }
                    //         console.log(22);
                    //     }
                    // }
                    console.log(`Value of ${oldValue} to ${obj2}`);
                    oldValue = obj2.slice();
                }
            }, 50);
        }
    }

    repeatChecking(oldValue: any, obj2: any) {
        if (oldValue) {
            setInterval(() => {
                obj2 = this.instance.aTag;
                if (obj2 !== oldValue) {
                    console.log(`Value of ${oldValue} to ${obj2}`);
                    oldValue = obj2;
                }
            }, 10);
        }
    }

    isJson(str: any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    getXPathForElement(el: any, xml: any) {
        var xpath = '';
        var pos, tempitem2;

        while (el !== xml) {
            pos = -1;
            tempitem2 = el;
            while (tempitem2) {
                if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
                    pos += 1;
                }
                tempitem2 = tempitem2.previousSibling;
            }

            if (pos === 0) {
                xpath = el.nodeName + '/' + xpath;

            } else {
                xpath = el.nodeName + "[" + pos + ']' + '/' + xpath;
            }

            el = el.parentNode;
        }
        xpath = '[' + xml.nodeName + "']" + '/' + xpath;
        xpath = xpath.replace(/\/$/, '');
        return xpath.toLocaleLowerCase();
    }

    getHavij(tagAttributes: any, j: any, funcVariables: any, currentTag: any, instance: any) {

    }


    buildComponent(instance: any) {
        var instancePrototype = Object.getPrototypeOf(instance);
        this.obj = instancePrototype.obj;
        var componentHTML = '';
        var path = 'src/' + instancePrototype.mainPath + '/';
        var tempHtmlLoc = path + instancePrototype.obj.templateUrl.replace('./', '');
        return this.getHTMLSource(tempHtmlLoc).then((htmlSource: string) => {
            this.findUndefined(htmlSource, Object.keys(instance));
            // console.log(htmlSource.match(/(?<=\]=").+?(?=\")/g));
            // for (let i = 0; i < Object.keys(instance).length; i++) {
            //     // componentHTML = this.replaceTSVariableInHTML(htmlSource, Object.keys(instance)[i], instance[Object.keys(instance)[i]]);
            //     console.log(Object.keys(instance)[i]);
            //     componentHTML = this.replaceFunctionInHTML(componentHTML, Object.keys(instance), instancePrototype,  Object.keys(instance)[i]);
            // }

            componentHTML = htmlSource;
            // var dd: any = document.createElement('div');
            // dd.innerHTML = componentHTML;
            // console.log(componentHTML);
            // var elem: any = dd.getElementsByTagName("*");
            // console.log(elem);
            // var attrs = elem[0].attributes;
            // for (var i = 0; i < attrs.length; i++) {
            //     console.error("Name: " + attrs[i].name + " Value: " + attrs[i].value);
            // }


            let htmlVariables: any = componentHTML.match(/\{{(.*?)\}}/g);
            let htmlVariables2: any = componentHTML.match(/(?<=\]=").+?(?=\")/g);
            let htmlVariablesForEvents: any = componentHTML.match(/(?<=\)=").+?(?=\")/g);
            let htmlVariablesForIf: any = componentHTML.match(/(?<=\*ngIf=").+?(?=\")/g);
            // for (let i = 1; i < Object.getOwnPropertyNames(target.prototype).length; i++) {
            var funcVariables = Object.keys(instance).concat(Object.getOwnPropertyNames(instancePrototype));
            if (htmlVariables) {
                for (let i = 0; i < htmlVariables.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariables[i], 'interpolation');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            // console.log(funcVariables);
            // console.log(htmlVariables2);
            if (htmlVariables2) {
                for (let i = 0; i < htmlVariables2.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariables2[i], 'directive');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            console.log(htmlVariablesForIf);
            if (htmlVariablesForIf) {
                for (let i = 0; i < htmlVariablesForIf.length; i++) {
                    componentHTML = this.replaceFunctionInHTML(componentHTML, funcVariables, instance, htmlVariablesForIf[i], 'if');
                    // const funcValue = target.prototype[Object.getOwnPropertyNames(target.prototype)[i]]();
                    // if (funcValue) {
                    // console.log(instance[Object.keys(instance)[i]]);
                    // }
                    // console.warn();
                }
            }
            componentHTML = componentHTML.replace(/\[/g, '').replace(/]/g, '');
            // componentHTML = componentHTML.replace('(onclick)', 'onclick');
            componentHTML = componentHTML.replace(new RegExp('\\((.*?)\\">', '\g'), '>');
            this.htmlSource = componentHTML;
            return this.htmlSource;
            // attachHTMLToPage(componentHTML, mainPath, obj.selector);
            // target.prototype.sub.next('havij');
            // subscriber.next('havij');
        });
    }

    setEvents(instance: any) {
        var allTags = document.querySelectorAll('app-login *');
        console.log(allTags);
        allTags[0].addEventListener('click', () => {
            instance['onClickBox']();
        });
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i].outerHTML.includes(')="')) {
                console.log(i);
                // allTags[i].outerHTML = allTags[i].outerHTML.replace('(onclick)', 'onclick');
                let htmlVariablesForEvents: any = allTags[i].outerHTML.match(/(?<=\)=").+?(?=\")/g);
                console.log(htmlVariablesForEvents[0]);
                allTags[i].addEventListener('click', () => {
                    instance['onClickBox']();
                });
                console.log(allTags[i]);
            }
        }

        // document.getElementsByTagName('button')[1].addEventListener('click', () => {
        //     eval("loginInstance.onClickBox()");
        // });
    }

    replaceFunctionInHTML(htmlSource: string, funcNames: string[], targetPrototype: any, htmlVariable: string, type: string) {
        let funcValue = '';
        var ff = '';
        if (type === 'interpolation') {
            const temp = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any);
            ff = temp;
            if (temp) {
                // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
                ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0];
            }
        } else if (type === 'directive') {
            // const temp = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any);
            // ff = temp;
            // if (temp) {
            // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
            // ff = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any)[0];
            ff = htmlVariable;
            // }
        } else if (type === 'if') {
            // const temp = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any);
            // ff = temp;
            // if (temp) {
            // ff = (htmlVariable.match(/(?<=\{{).+?(?=\}})/g) as any)[0].replace(/ /g, '');
            // ff = (htmlVariable.match(/(?<=\]=").+?(?=\")/g) as any)[0];
            ff = htmlVariable;
            // }
        }
        for (let i = 0; i < funcNames.length; i++) {
            ff = ff.replace(funcNames[i], "targetPrototype." + funcNames[i]);
        }
        funcValue = eval(ff);
        return htmlSource.replace(htmlVariable, funcValue);
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

    }

    replaceTSVariableInHTML(htmlSource: string, variableName: string, variableData: string) {
        const varToString = (varObj: any) => Object.keys(varObj)[0];

        // const havij = 42;
        // const displayName = varToString({havij});
        // console.log(displayName)
        // var currentHTML = html.replace(/\{{(.*?)\}}/g, 'golabi');
        var regex = "\{{\\s*" + variableName + "\\s*}}"; // \s*
        // var currentHTML = html.replace(/\{{name}}/g, 'golabi');
        return htmlSource.replace(new RegExp(regex, "g"), variableData);
    }

    findUndefined(htmlSource: string, variableNames: string[]) {
        var undefinedVariables = [];
        let htmlVariables = htmlSource.match(/\{{(.*?)\}}/g);
        if (!htmlVariables) {
            htmlVariables = [];
        }
        for (let i = 0; i < variableNames.length; i++) {
            var index = htmlVariables.findIndex((v: any) => v === variableNames[i]);
            if (index === -1 && htmlVariables[i]) {
                undefinedVariables.push(htmlVariables[i]);
                // console.error('Error:', htmlVariables[i], 'is undefined');
            }
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
