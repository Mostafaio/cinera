import {Route} from "./route";

export class Test {
    constructor(private route: Route) {
        console.log('havijg');
    }

    buildButton() {
        var button = document.createElement('button');
        button.innerHTML = 'Change';
        button.addEventListener('click', () => {
            this.route.navigate('', {});
        });
        document.body.appendChild(button);
    }
}
