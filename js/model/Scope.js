class Scope {

    constructor(newScope){
        this.scope = newScope;
    }

    init(data){
        
        this.clean();
        let elements = document.querySelectorAll('[data-bind]');

        elements.forEach(element => {            
            
            let propToBind = element.getAttribute('data-bind');  
            
            if( element.type === "text" || element.type === "textearea" || element.type === "date" || element.type === "password" ){
                element.value = data[propToBind];
            }

            if( element.type === "checkbox" ){
                
                let bind = propToBind.split('[]');
                data[bind[0]].forEach(chk => {

                    if(bind.length==2){
                        
                        data[bind[0]].forEach(item => {
                            if( element.value == item[bind[1]]){
                                element.checked = true;
                            }
                        });

                    }else{

                        if(element.value == chk){
                            element.checked = true;
                        }
                    }
                });
            }
            
            element.addEventListener('keyup', (event) => {
                data[event.target.getAttribute('data-bind')] = event.target.value;
            });

            element.addEventListener('click', (event) => {
                if(event.target.checked){
                    if(data[event.target.getAttribute('data-bind')].indexOf(event.target.value) === -1) {
                        data[event.target.getAttribute('data-bind')].push(event.target.value);
                    }
                }else{
                    if(data[event.target.getAttribute('data-bind')].indexOf(event.target.value) > -1) {
                        let arr = data[event.target.getAttribute('data-bind')];
                        data[event.target.getAttribute('data-bind')] = arr.filter(item => item != event.target.value);
                    }
                }
            });
        });
    }

    clean(){

        document.querySelector('[data-frm-bind]').reset();
    }
}

