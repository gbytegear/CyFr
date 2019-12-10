const replaceLowLineToHyphen = str => str.replace(/_/gi, '-');

const jscss = new class {
    css = {root:new Object};
    element = document.createElement('style');

    constructor () {
        document.head.appendChild(this.element);
    }

    addMedia(media){
        this.css[media] = new Object;
    }

    add(selector, properties = {}, media = "root") {
        if(this.css[media] == undefined)this.addMedia(media);
        let props = {};
        for(let prop in properties){
            props[replaceLowLineToHyphen(prop)] = properties[prop];
        }
        this.css[media][selector] = props;
        this.reload();
    }

    change(selector, properties, media = "root") {
        if(this.css[media] == undefined)
            throw `Media "${media}" isn't exist!`
        else if(this.css[media][selector] == undefined)
            throw `Selector "${selector}" isn't exist!`
        
        for(let property in properties)this.css[media][selector][replaceLowLineToHyphen(property)] = properties[property];
        this.reload();
    }

    remove(selector, media = "root") {
        delete this.css[media][selector];
        this.reload();
    }

    reload() {
        const parseProperty = property => {
                switch(property.constructor.name){
                    case "Color": return property.str;
                    case "String": return property;
                    case "Array":
                        let prop_str = "";
                        for(let sub_prop in property)
                            prop_str += ` ${parseProperty(property[sub_prop])}`;
                        return prop_str;
                    case "Number": return property.toString();
                }
            }
        let css = new String;
        for(let media in this.css){
            css += (media == 'root')?'':`@media ${media}{`
            for(let selector in this.css[media]){
                css += `${selector}{`;
                for(let property in this.css[media][selector])css += `${property}:${parseProperty(this.css[media][selector][property])};`
                css += "}";
            }
            css += (media == 'root')?'':'}'
        }
        this.element.innerText = css;
    }
}

const Color = class {
    constructor (red = 0, green = 0, blue = 0, alpha = 255) {
        const rgba = new Uint8Array([red, green, blue, alpha]);
        Object.defineProperties(this, {
            red: {
                get: () => rgba[0],
                set: red => rgba[0] = red
            },
            green: {
                get: () => rgba[1],
                set: green => rgba[1] = green
            },
            blue: {
                get: () => rgba[2],
                set: blue => rgba[2] = blue
            },
            alpha: {
                get: () => rgba[3],
                set: alpha => rgba[3] = alpha
            },

            str: {
                get: () => 
                `#${(()=>{
                    let red = rgba[0].toString(16);
                    if(red.length < 2)red += "0";
                    return red;
                })()}${(()=>{
                    let green = rgba[1].toString(16);
                    if(green.length < 2)green += "0";
                    return green;
                })()}${(()=>{
                    let blue = rgba[2].toString(16);
                    if(blue.length < 2)blue += "0";
                    return blue;
                })()}${(()=>{
                    if(rgba[3] == 255) return "";
                    let alpha = rgba[3].toString(16);
                    if(alpha.length < 2)alpha += "0";
                    return alpha;
                })()}`
            }
        });
    }

    invert() {
        this.red = 255 - this.red;
        this.green = 255 - this.green;
        this.blue = 255 - this.blue;
    }
}

/*
{
    media : {
        selector : {
            property : value
        }
    }
}
*/