class Scope {

    constructor(newScope){
        this.scope = newScope;
    }

    init(data){
        
        let elements = document.querySelectorAll('[data-bind]');

        elements.forEach(element => {            
            
            let propToBind = element.getAttribute('data-bind');  
            
            if( element.type === "text" || element.type === "textearea" || element.type === "date" || element.type === "password" ){
                element.value = data[propToBind];
            }

            if( element.type === "checkbox" ){
                data[propToBind].forEach(chk => {
                    if(element.value == chk){
                        element.checked = true;
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
}

