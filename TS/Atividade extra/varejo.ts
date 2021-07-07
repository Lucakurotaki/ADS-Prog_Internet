class Varejo{
    vendedor: string;
    venda: number;
    
    constructor(nome: string, venda: number){
        this.vendedor = nome;
        this.venda = venda;
    }

    menorAmt(){
        var menor = (this.venda-5000)*0.05;

        return menor;
    }

    medioAmt(){
        var medio = (this.venda-1000)*0.1;

        return medio;
    }

    maiorAmt(){
        var maior = this.venda*0.2;

        return maior;
    }

    salario(){
        var salario = 1100;
        var menor = 0,medio = 0,maior = 0;
        if(this.venda > 5000 && this.venda <= 10000){
            menor = this.menorAmt();
            salario+=menor;
            
        }
        else if(this.venda > 10000 && this.venda <= 30000){
            menor = this.menorAmt();
            medio = this.medioAmt();
            salario+=menor+medio;
        }else if(this.venda > 30000){
            maior = this.maiorAmt();
            salario+=maior;
        }

        return '\n\nVendedor: ' + this.vendedor + '\nSalario fixo: R$ 1100' + '\nComissão 5%: R$ ' + menor + '\nComissão 10%: R$ ' + medio + '\nComissão 20%: R$ ' + maior + '\nSalário Total: R$ ' + salario;
    }

}

export {Varejo};