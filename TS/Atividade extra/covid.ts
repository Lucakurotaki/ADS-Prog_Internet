class Covid{
    constructor(private media_v: number, private media_h: number){}

    calcVaria(){
        var varia: number = ((this.media_h-this.media_v)/this.media_v)*100;
        return varia;
    }

    classifica(){
        if(this.calcVaria()>15){
            return 'Em alta';
        }
        else if(this.calcVaria()<-15){
            return 'Em queda';
        }else{
            return 'Em estabilidade';
        }
    }
}

export{Covid};