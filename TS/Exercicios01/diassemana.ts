enum DiasSemana {Segunda, Terca, Quarta, Quinta, Sexta, Sabado, Domingo}

namespace DiasSemana {
    export function isDiaUtil(dia: DiasSemana){
        if (dia == DiasSemana.Sabado || dia == DiasSemana.Domingo){
            return false;
        }
        else{
            return true;
        }
    }
}

let day: DiasSemana = DiasSemana.Segunda;

if(DiasSemana.isDiaUtil(day) == true){
    console.log("Ok");
}