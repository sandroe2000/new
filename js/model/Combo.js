export class Combo {

    constructor(newCombo){
        this.combo = [
            {
                "descr": "",
                "value": ""
            }
        ];
        this.init(newCombo);
    }

    init(newCombo){

        if(newCombo){
            this.combo = newCombo;
        }
    }
}