import KeyEvent from '/js/modes/keyevent.js';

class Development extends KeyEvent {
    constructor() {
        super();
        this.keyFired = this.keyFired.bind(this);
        this.chromeId = localStorage.getItem("chromeRuntimeId");
    }

    async keyFired(e) {
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
            // Adds Karl's Groves CSS diagnosis file into your page.
            case 'Pad_1':
                if (this.checkFileLoaded("karlCss")) {
                    console.log("Karl Groves Diagnostics Tool Already loaded.");
                    return;
                }

                const karlCss = document.createElement('link');
                karlCss.rel = "stylesheet";
                karlCss.type = "text/css";
                karlCss.href = "https://rawgit.com/karlgroves/diagnostic.css/master/diagnostic.css";
                document.getElementsByTagName('head')[0].appendChild(karlCss);

                console.log("Karl Groves Diagnostics Tool Loaded.");

                this.diagnosticsFiles.push({name: 'karlCss', link: karlCss});
                break;
            // Removes the Karl's Groves CSS diagnosis file.
            case 'Pad_7':
                this.removeDiagFile("karlCss");
                console.log("Karl Groves Diagnostics Tool Removed.");
                break;
            // Adds Eric Meyer's CSS diagnosis file into your page.
            case 'Pad_2':
                if (this.checkFileLoaded("ericCss")) {
                    console.log("Eric Meyer Diagnostics Tool Already loaded.");
                    return;
                }

                const ericCss = document.createElement('link');
                ericCss.rel = "stylesheet";
                ericCss.type = "text/css";
                ericCss.href = "chrome-extension://" + this.chromeId + "/css/EricDiagnostics.css";
                document.getElementsByTagName('head')[0].appendChild(ericCss);

                console.log("Eric Meyer Diagnostics Tool Loaded.");
                this.diagnosticsFiles.push({
                    name: 'ericCss',
                    link: ericCss
                });
                break;
            // Removes Karl's Groves CSS diagnosis file.
            case 'Pad_8':
                this.removeDiagFile("ericCss");
                console.log("Eric Meyer Diagnostics Tool Removed.");
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
            // Clear the LocalStorage.
            case 'Pad_6':
                localStorage.clear();
                console.info("LocalStorage cleared.");
                break;
            // Get the cookies from the current domain.
            case 'Pad_12':
                let cookies = document.cookie.split(';');
                let aString = '';
                for (let i = 1; i <= cookies.length; i++) {
                    let cookieParts = cookies[i - 1].split('=');
                    aString += cookieParts[0] + " = " + cookieParts[1] + "\n";
                }
                console.log(aString);
                break;
        }
    }
}

export {Development};
