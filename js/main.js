'use strict';

import {Controller} from '/js/controller.js';
import {Development} from '/js/modes/development.js';
import {Interactive} from '/js/modes/interactive.js';
import { Blank } from '/js/modes/blank.js';

class Main {
    constructor() {
        // Set up the controller.
        this.controller = new Controller('WORLDE easy pad');

        this.modes = {
            0: new Development(),
            1: new Interactive(),
            2: new Blank()
        };

        if (localStorage.getItem('mode') !== null) {
            this.currentMode = localStorage.getItem('mode');
        } else {
            this.currentMode = 0;
            localStorage.setItem('mode', this.currentMode);
        }

        console.log("Switched to " + this.modes[this.currentMode].constructor.name + " pad layout.");

        this.keydown = this.keyFired.bind(this);
        this.controller.on('midiDown', this.keydown);
    }

    keyFired(e) {
        const {
            keyName
        } = e;

        switch (keyName) {
            case 'Next':
                this.next();
                break;
            case 'Previous':
                this.prev();
                break;
            default:
                this.keydown = this.modes[this.currentMode].keyFired(e);
                break;
        }
    }

    prev() {
        this.currentMode--;

        if (this.currentMode < 0) {
            this.currentMode = Object.keys(this.modes).length - 1;
        }

        console.log("Switched to " + this.modes[this.currentMode].constructor.name + " pad layout.");
        localStorage.setItem('mode', this.currentMode);
    }

    next() {
        this.currentMode++;

        if (this.currentMode > Object.keys(this.modes).length - 1) {
            this.currentMode = 0;
        }

        console.log("Switched to " + this.modes[this.currentMode].constructor.name + " pad layout.");
        localStorage.setItem('mode', this.currentMode);
    }
}

new Main();
