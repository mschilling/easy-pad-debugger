export default class KeyEvent {
    constructor() {
        this.diagnosticsFiles = [];
    }

    removeDiagFile(filename) {
        for (let i = 0; i < this.diagnosticsFiles.length; i++) {
            if (this.diagnosticsFiles[i].name == filename) {
                this.diagnosticsFiles[i].link.remove();
                this.diagnosticsFiles.splice(i, 1);
            }
        }
    }

    checkFileLoaded(filename) {
        for (let i = 0; i < this.diagnosticsFiles.length; i++) {
            if (this.diagnosticsFiles[i].name == filename) {
                return true;
            }
        }
        return false;
    }
}