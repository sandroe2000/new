export class ScopeHelper {

    constructor(newScope){
        this.scope = newScope;
    }

    init(data){
        
        this.clean();
        let elements = document.querySelectorAll('[data-bind]');

        elements.forEach(element => {            
            
            let propToBind = element.getAttribute('data-bind'); 
            
            if( element.type === "file" ){

                let img = propToBind.replace('Upload', '');
                document.querySelector(`#${img}Preview`).style.backgroundImage = `url(${data[img]})`; 
            }
            
            if( element.type === "text" || 
                element.type === "textearea" || 
                element.type === "date" || 
                element.type === "password" ||
                element.type === "select-one" ){

                element.value = data[propToBind];

                element.addEventListener('keyup', (event) => {
                    data[event.target.getAttribute('data-bind')] = event.target.value;
                });
            }

            if( element.type === "checkbox" ){                

                if(JSON.stringify(data).indexOf(propToBind) > -1){

                    if(typeof data[propToBind] === 'string'){

                        if(element.value == data[propToBind]){
                            element.checked = true;
                        }
                    }

                    if( Array.isArray( data[propToBind])){

                        data[propToBind].forEach(chk => {
                            if(element.value == chk){
                                element.checked = true;
                            }
                        });
                    }                

                    element.addEventListener('click', (event) => {

                        if(event.target.checked){
                            
                            if(typeof data[event.target.getAttribute('data-bind')] === 'string'){

                                data[event.target.getAttribute('data-bind')] = event.target.value;
                            }
                            
                            if( Array.isArray(data[event.target.getAttribute('data-bind')]) ){

                                data[event.target.getAttribute('data-bind')].push(event.target.value);
                            }
                        }else{
                            if(data[event.target.getAttribute('data-bind')].indexOf(event.target.value) > -1) {

                                if(typeof data[event.target.getAttribute('data-bind')] === 'string'){

                                    data[event.target.getAttribute('data-bind')] = "";
                                }

                                if( Array.isArray( data[event.target.getAttribute('data-bind')] )){
                                    
                                    let arr = data[event.target.getAttribute('data-bind')];
                                    data[event.target.getAttribute('data-bind')] = arr.filter(item => item != event.target.value);
                                }
                            }
                        }

                        console.log(data);
                        
                    });
                }
            }
        });
    }

    clean(){

        document.querySelector('[data-frm-bind]').reset();
    }
}