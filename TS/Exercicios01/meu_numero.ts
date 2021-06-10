class MeuNumero{
    readonly numero: number;
    constructor(numero: number){
        this.numero = numero;
    }

    getInteiro(){
        let int: number = Math.round(this.numero);
        if(int > this.numero){
            return int-1;
        }
        else{
            return int;
        }
    }

    getDecimal(){
        return this.numero-this.getInteiro();
    }
}

let n = new MeuNumero(24.56);

console.log(n.numero);

console.log(n.getInteiro());

console.log(n.getDecimal());