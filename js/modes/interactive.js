import KeyEvent from '/js/modes/keyevent.js';

class Interactive extends KeyEvent {
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
                location.reload();
                break;
            case 'Select':
                console.log(keyName);
                break;
            case 'Pad_1':
                if (this.checkFileLoaded("cornify")) {
                    const cornifyRun = document.createElement('script');
                    cornifyRun.type = "application/javascript";
                    cornifyRun.src = "chrome-extension://" + this.chromeId + "/js/cornify_run.js";
                    document.getElementsByTagName('head')[0].appendChild(cornifyRun);
                    cornifyRun.remove();

                    console.log("Unicorn added.");
                    return;
                }

                const cornify = document.createElement('script');
                cornify.type = "application/javascript";
                cornify.src = "chrome-extension://" + this.chromeId + "/js/cornify.js";
                document.getElementsByTagName('head')[0].appendChild(cornify);

                this.diagnosticsFiles.push({name: 'cornify', link: cornify});
                console.log("Cornify loaded.");
                break;
            case 'Pad_7':
                this.removeDiagFile("cornify");
                console.log("Cornify removed.");
                break;
            case 'Pad_2':
                const harlemShake = document.createElement('script');
                harlemShake.type = "application/javascript";
                harlemShake.src = "chrome-extension://" + this.chromeId + "/js/harlem_shake.js";
                document.getElementsByTagName('head')[0].appendChild(harlemShake);

                console.log("Harlem Shake loaded.");
                this.diagnosticsFiles.push({
                    name: 'harlemShake',
                    link: harlemShake
                });
                break;
            case 'Pad_8':
                this.removeDiagFile("harlemShake");
                console.log("Harlem Shake removed.");
                break;
            case 'Pad_3':
                console.log(keyName);   
                break;
            case 'Pad_9':
                console.log(keyName);
                break;
            case 'Pad_4':
                console.log(keyName);
                break;
            case 'Pad_5':
                console.log(keyName);
                break;
            case 'Pad_10':
                console.log(keyName);
                break;
            case 'Pad_11':
                console.log(keyName);
                break;
            case 'Pad_6':
                console.log(keyName);
                break;
            case 'Pad_12':
                console.log(keyName);
                break;
        }
    }
}

export {Interactive};
