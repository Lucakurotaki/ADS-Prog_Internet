class Transacao{
    constructor (readonly _valor: number, readonly _desconto: number){}

    calcDesconto(){
        let val = this._valor;
        let des = this._desconto;

        return val * (1-des/100);
    }

    get valor(): number{
        return this._valor;
    }

    get desconto(): number{
        return this._desconto;
    }
}

let t = new Transacao(100,10);

console.log(t.valor);

console.log(t.desconto);

console.log(t.calcDesconto());