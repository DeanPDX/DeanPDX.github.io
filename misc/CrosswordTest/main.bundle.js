webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  {{title}}\n</h1>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Angular Crossword App';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__crossword_view_crossword_view_component__ = __webpack_require__("../../../../../src/app/crossword-view/crossword-view.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__crossword_view_crossword_view_component__["a" /* CrosswordViewComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([
                { path: '', redirectTo: 'crossword-view', pathMatch: 'full' },
                { path: 'crossword-view', component: __WEBPACK_IMPORTED_MODULE_6__crossword_view_crossword_view_component__["a" /* CrosswordViewComponent */] },
                { path: '**', redirectTo: 'crossword-view' }
            ], { useHash: true })
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/crossword-view/crossword-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#crosswordContainer {\n    display: table;\n    border: solid 1px black;\n    float: left;\n}\n.crosswordCharacterSquare {\n    width: 22px;\n    height: 22px;\n    display: table-cell;\n    border: 1px solid black;\n    vertical-align: middle;\n    text-align: center;\n    float: left;\n    cursor: pointer;\n}\n.character {\n    margin-top: 2px;\n}\n.crosswordRow { \n    width: 100%;\n    clear: both;\n}\n.active {\n    background-color: yellow;\n}\n.wordActive {\n    background-color: lightblue;\n}\n.blankSquare {\n    background-color: black;\n    display:block;\n    height: 100%;\n}\n.clueListContainer {\n    float: left;\n    width: 200px;\n}\n.clueHeader {\n    font-weight: bolder;\n    margin: 0 0 5px 5px;\n}\n.clueList {\n    margin: 0px 0px 0px 26px;\n    padding: 0;\n    \n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/crossword-view/crossword-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"crosswordContainer\" (keydown)=\"keyDownHandler($event)\" tabindex=\"0\">\n  <div class=\"crosswordRow\" *ngFor=\"let charArray of characters; index as rowIndex;\">\n    <div [class]=\"getCharacterSquareClass(characterIndex, rowIndex)\" (click)=\"setActiveCharacterOrdinal(characterIndex, rowIndex)\" *ngFor=\"let character of charArray; index as characterIndex;\">\n        <div *ngIf=\"character.correctValue != ' '\" class=\"character\">{{character.currentValue}}</div>\n        <div *ngIf=\"character.correctValue === ' '\" class=\"blankSquare\">&nbsp;</div>\n    </div>\n  </div>\n</div>\n<div class=\"clueListContainer\">\n  <p class=\"clueHeader\">Across</p>\n  <ul class=\"clueList\">\n    <li *ngFor=\"let wordDef of horizontalDefinitions\" [class]=\"getHorizontalClueClass(wordDef)\" (click)=\"setActiveWord($event, wordDef)\">{{ wordDef.clue }}</li>\n  </ul>\n</div>\n<div class=\"clueListContainer\">\n  <p class=\"clueHeader\">Down</p>\n  <ul class=\"clueList\">\n    <li *ngFor=\"let wordDef of verticalDefinitions\" [class]=\"getVerticalClueClass(wordDef)\" (click)=\"setActiveWord($event, wordDef)\">{{ wordDef.clue }}</li>\n  </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/crossword-view/crossword-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrosswordViewComponent; });
/* unused harmony export WordDefinition */
/* unused harmony export CharacterDefinition */
/* unused harmony export WordDirection */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CrosswordViewComponent = (function () {
    function CrosswordViewComponent() {
        this.horizontalDefinitions = [];
        this.verticalDefinitions = [];
        this.characters = [];
        this.wordDirection = WordDirection.Horizontal;
    }
    CrosswordViewComponent.prototype.ngOnInit = function () {
        this.horizontalDefinitions.push(new WordDefinition('   AW ', 'used to express mild protest, entreaty, or sympathy'));
        this.horizontalDefinitions.push(new WordDefinition('   SOW', 'Plant seeds'));
        this.horizontalDefinitions.push(new WordDefinition(' JOHRI', 'Last name of the most attractive woman currently alive'));
        this.horizontalDefinitions.push(new WordDefinition('RANIS ', 'The wife of a raja'));
        this.horizontalDefinitions.push(new WordDefinition(' DEFT ', 'Fast-moving and clever'));
        this.horizontalDefinitions.push(new WordDefinition(' EST  ', 'A timezone that is also an abbreviation for an approximation'));
        this.verticalDefinitions.push(new WordDefinition('   R  ', 'Last letter of the sound a cat makes'));
        this.verticalDefinitions.push(new WordDefinition('  JADE', 'A lovely green'));
        this.verticalDefinitions.push(new WordDefinition('  ONES', 'Singles'));
        this.verticalDefinitions.push(new WordDefinition('ASHIFT', 'A move'));
        this.verticalDefinitions.push(new WordDefinition('WORST ', 'The opposite of Dean'));
        this.verticalDefinitions.push(new WordDefinition(' WI   ', 'Where cheese is made. Abbr.'));
        this.setCharactersUpFromDefinitions();
    };
    CrosswordViewComponent.prototype.setCharactersUpFromDefinitions = function () {
        for (var y = 0; y < this.horizontalDefinitions.length; y++) {
            this.characters[y] = [];
            for (var x = 0; x < this.horizontalDefinitions[y].value.length; x++) {
                this.characters[y][x] = new CharacterDefinition(this.horizontalDefinitions[y].value[x]);
            }
        }
    };
    CrosswordViewComponent.prototype.keyDownHandler = function (event) {
        event.preventDefault();
        console.log(event, event.keyCode, event.keyIdentifier);
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                this.moveToPreviousWord();
            }
            else {
                this.moveToNextWord();
            }
            return;
        }
        else if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }
        else if (event.key === 'Backspace') {
            this.activeCharacter.currentValue = '';
            this.moveToPreviousCharacter();
        }
        else {
            this.activeCharacter.currentValue = event.key.toUpperCase();
            this.moveToNextCharacter();
            if (this.isPuzzleSolved() === true) {
                alert('You have solved it! I love you!');
            }
        }
    };
    CrosswordViewComponent.prototype.isCharacterActive = function (characterIndex, rowIndex) {
        return this.activeY === rowIndex && this.activeX === characterIndex;
    };
    CrosswordViewComponent.prototype.isWordActive = function (characterIndex, rowIndex) {
        if (characterIndex === undefined || rowIndex === undefined || this.activeCharacter === undefined) {
            return false;
        }
        if (this.wordDirection === WordDirection.Horizontal) {
            return this.activeY === rowIndex;
        }
        else if (this.wordDirection === WordDirection.Vertical) {
            return this.activeX === characterIndex;
        }
        // return character.parentWord === this.activeCharacter.parentWord;
    };
    CrosswordViewComponent.prototype.setActiveCharacterOrdinal = function (x, y) {
        if (this.activeX === x && this.activeY === y) {
            this.swapWordDirection();
        }
        else {
            this.activeX = (x != undefined) ? x : this.activeX;
            this.activeY = (y != undefined) ? y : this.activeY;
            this.activeCharacter = this.characters[this.activeY][this.activeX];
        }
    };
    CrosswordViewComponent.prototype.swapWordDirection = function () {
        if (this.wordDirection === WordDirection.Horizontal) {
            this.wordDirection = WordDirection.Vertical;
        }
        else {
            this.wordDirection = WordDirection.Horizontal;
        }
    };
    CrosswordViewComponent.prototype.setActiveWord = function (event, word) {
        // this.setActiveCharacter(undefined, word.characters[0]);
    };
    CrosswordViewComponent.prototype.moveToNextCharacter = function () {
        if (this.wordDirection === WordDirection.Horizontal) {
            this.moveRight();
        }
        else {
            this.moveDown();
        }
    };
    CrosswordViewComponent.prototype.moveToPreviousCharacter = function () {
        if (this.wordDirection === WordDirection.Horizontal) {
            this.moveLeft();
        }
        else {
            this.moveUp();
        }
    };
    CrosswordViewComponent.prototype.moveToNextWord = function () {
        // TODO
    };
    CrosswordViewComponent.prototype.moveToPreviousWord = function () {
        // TODO
    };
    CrosswordViewComponent.prototype.moveRight = function () {
        this.activeX = this.activeX + 1;
        if (this.activeX === this.characters[this.activeY].length) {
            this.activeX = 0;
            this.activeY = this.activeY + 1;
            if (this.activeY === this.characters.length) {
                this.activeY = 0;
            }
        }
        if (this.characters[this.activeY][this.activeX].correctValue === ' ') {
            // Recursive call
            this.moveRight();
        }
        else {
            this.setActiveCharacterOrdinal();
        }
    };
    CrosswordViewComponent.prototype.moveLeft = function () {
        this.activeX = this.activeX - 1;
        if (this.activeX < 0) {
            this.activeX = this.characters[this.activeY].length - 1;
            this.activeY = this.activeY - 1;
            if (this.activeY < 0) {
                this.activeY = this.characters.length - 1;
            }
        }
        if (this.characters[this.activeY][this.activeX].correctValue === ' ') {
            // Recursive call
            this.moveLeft();
        }
        else {
            this.setActiveCharacterOrdinal();
        }
    };
    CrosswordViewComponent.prototype.moveUp = function () {
        this.activeY = this.activeY - 1;
        if (this.activeY < 0) {
            this.activeY = this.characters.length - 1;
            this.activeX = this.activeX - 1;
            if (this.activeX < 0) {
                this.activeX = this.characters[this.activeY].length - 1;
            }
        }
        if (this.characters[this.activeY][this.activeX].correctValue === ' ') {
            // Recursive call
            this.moveUp();
        }
        else {
            this.setActiveCharacterOrdinal();
        }
    };
    CrosswordViewComponent.prototype.moveDown = function () {
        this.activeY = this.activeY + 1;
        if (this.activeY === this.characters.length) {
            this.activeY = 0;
            this.activeX = this.activeX + 1;
            if (this.activeX === this.characters[this.activeY].length) {
                this.activeX = 0;
            }
        }
        if (this.characters[this.activeY][this.activeX].correctValue === ' ') {
            // Recursive call
            this.moveDown();
        }
        else {
            this.setActiveCharacterOrdinal();
        }
    };
    CrosswordViewComponent.prototype.getCharacterSquareClass = function (characterIndex, rowIndex) {
        if (this.isCharacterActive(characterIndex, rowIndex)) {
            return 'crosswordCharacterSquare active';
        }
        else if (this.isWordActive(characterIndex, rowIndex)) {
            return 'crosswordCharacterSquare wordActive';
        }
        else {
            return 'crosswordCharacterSquare';
        }
    };
    CrosswordViewComponent.prototype.getHorizontalClueClass = function (wordDef) {
        if (this.wordDirection === WordDirection.Horizontal && this.activeCharacter != undefined) {
            if (this.horizontalDefinitions.indexOf(wordDef) === this.activeY) {
                return 'wordActive';
            }
        }
        return '';
    };
    CrosswordViewComponent.prototype.getVerticalClueClass = function (wordDef) {
        if (this.wordDirection === WordDirection.Vertical && this.activeCharacter != undefined) {
            if (this.verticalDefinitions.indexOf(wordDef) === this.activeX) {
                return 'wordActive';
            }
        }
        return '';
    };
    CrosswordViewComponent.prototype.isPuzzleSolved = function () {
        var isSolved = true;
        for (var y = 0; y < this.characters.length; y++) {
            for (var x = 0; x < this.characters[y].length; x++) {
                var character = this.characters[y][x];
                if (character.correctValue != character.currentValue) {
                    isSolved = false;
                }
            }
        }
        return isSolved;
    };
    return CrosswordViewComponent;
}());
CrosswordViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-crossword-view',
        template: __webpack_require__("../../../../../src/app/crossword-view/crossword-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/crossword-view/crossword-view.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CrosswordViewComponent);

var WordDefinition = (function () {
    function WordDefinition(value, clue) {
        this.clue = clue;
        this.value = value;
    }
    return WordDefinition;
}());

var CharacterDefinition = (function () {
    function CharacterDefinition(correctValue) {
        this.correctValue = correctValue;
        this.currentValue = ' ';
    }
    return CharacterDefinition;
}());

var WordDirection;
(function (WordDirection) {
    WordDirection[WordDirection["Horizontal"] = 0] = "Horizontal";
    WordDirection[WordDirection["Vertical"] = 1] = "Vertical";
})(WordDirection || (WordDirection = {}));
//# sourceMappingURL=crossword-view.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map