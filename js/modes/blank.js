import KeyEvent from '/js/modes/keyevent.js';

class Blank extends KeyEvent {
    constructor() {
        super();
        this.chromeId = localStorage.getItem("chromeRuntimeId");
    }

    keyFired(e) {
        const {
            keyName
        } = e;

        switch (keyName) {
            case 'Repeat':
                console.log(keyName);
                break;
            case 'Start':
                console.log(keyName);
                break;
            case 'Select':
                console.log(keyName);
                break;
            case 'Pad_1':
                console.log(keyName);
                break;
            case 'Pad_2':
                console.log(keyName);
                break;
            case 'Pad_3':
                console.log(keyName);
                break;
            case 'Pad_4':
                console.log(keyName);
                break;
            case 'Pad_5':
                console.log(keyName);
                break;
            case 'Pad_6':
                console.log(keyName);
                break;
            case 'Pad_7':
                console.log(keyName);
                break;
            case 'Pad_8':
                console.log(keyName);
                break;
            case 'Pad_9':
                console.log(keyName);
                break;
            case 'Pad_10':
                console.log(keyName);
                break;
            case 'Pad_11':
                console.log(keyName);
                break;
            case 'Pad_12':
                console.log(keyName);
                break;
            default:
                console.log(keyName);
                break;
        }
    }
}

export {Blank};
