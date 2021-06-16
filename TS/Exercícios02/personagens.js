"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cavaleiro = exports.Soldado = exports.Personagem = void 0;
var Personagem = /** @class */ (function () {
    function Personagem(id, nome, energia) {
        this.id = id;
        this.nome = nome;
        if (energia >= 1 && energia <= 100) {
            this.energia = energia;
        }
        else {
            this.energia = 100;
        }
    }
    Personagem.prototype.estaVivo = function () {
        if (this.energia > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Personagem.prototype.defenderAtaque = function (valor) {
        if (valor > this.energia) {
            this.energia = 0;
        }
        else {
            this.energia = this.energia - valor;
        }
    };
    return Personagem;
}());
exports.Personagem = Personagem;
var Soldado = /** @class */ (function (_super) {
    __extends(Soldado, _super);
    function Soldado(id, nome, energia, forca) {
        var _this = _super.call(this, id, nome, energia) || this;
        if (forca <= 10 && forca >= 0) {
            _this.forcaDeAtaque = forca;
        }
        else {
            _this.forcaDeAtaque = 10;
        }
        return _this;
    }
    Soldado.prototype.atacar = function (p) {
        p.defenderAtaque(this.forcaDeAtaque);
    };
    Soldado.prototype.defenderAtaque = function (valor) {
        this.energia = this.energia - (valor / 2);
    };
    return Soldado;
}(Personagem));
exports.Soldado = Soldado;
var Cavaleiro = /** @class */ (function (_super) {
    __extends(Cavaleiro, _super);
    function Cavaleiro(id, nome, energia, forca) {
        return _super.call(this, id, nome, energia, forca) || this;
    }
    Cavaleiro.prototype.atacar = function (p) {
        p.defenderAtaque(2 * this.forcaDeAtaque);
    };
    Cavaleiro.prototype.defenderAtaque = function (valor) {
        this.energia = this.energia - (valor / 3);
    };
    return Cavaleiro;
}(Soldado));
exports.Cavaleiro = Cavaleiro;
//# sourceMappingURL=personagens.js.map