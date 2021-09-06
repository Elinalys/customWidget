(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    `;

    customElements.define("com-synvance-readerrors", class ReadErrors extends HTMLElement {

		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._tagContainer;
            this._tagBtn;
            this._tagType = "p";
            this._tagText = "Bonjour !!";
            //Adding event handler for click events
            this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
            this.addButton();
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) { 
            if (this._firstConnection){
                this.redraw();
            }          
        }

        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        //Getters and Setters
        get widgetText() {
            return this._tagType;
        }

        set widgetText(value) {
            this._tagText = value;
        }
        // End - Getters and Setters

        getMessageError(){
            console.defaultError = console.error.bind(console);
            var logMessages = [];
            console.error = function(){
                // default &  console.error()
                console.defaultError.apply(console, arguments);
                // new & array data
                logMessages.push(Array.from(arguments));
            }
            console.error("You make a mistake");
            
            var textErrors = "Coucou !\n";
            var i = 1;

            logMessages.forEach(element => {
                textErrors += "Erreur " + i + " : \n";
                element.forEach(tab => {
                    textErrors += tab + "\n";
                });
                i++;
            });
            
            console.log("textErrors");
            console.log(textErrors);

            return textErrors;
        }

        redraw(){
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        widgetText: this._tagText
                    }
                }
            }));
            if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
            }
            var shadow = window.getSelection(this._shadowRoot);

            this._tagContainer = document.createElement(this._tagType);
            var theText = document.createTextNode(this._tagText);
            this._tagContainer.appendChild(theText);
            this._shadowRoot.appendChild(this._tagContainer);
        }

        addButton(){        
            this._tagBtn = document.createElement('button');
            this._tagBtn.textContent = "Submit";
            this._tagBtn.onclick = function () {
                console.defaultError = console.error.bind(console);
                var logMessages = [];
                console.error = function(){
                    // default &  console.error()
                    console.defaultError.apply(console, arguments);
                    // new & array data
                    logMessages.push(Array.from(arguments));
                }
                console.error("You make a mistake");
                
                var textErrors = "Coucou !\n";
                var i = 1;

                logMessages.forEach(element => {
                    textErrors += "Erreur " + i + " : \n";
                    element.forEach(tab => {
                        textErrors += tab + "\n";
                    });
                    i++;
                });
                
                console.log("textErrors");
                console.log(textErrors);
                this._tagText = textErrors;
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            widgetText: this._tagText
                        }
                    }
                }));
                if (this._tagContainer){
                    this._tagContainer.parentNode.removeChild(this._tagContainer);
                }
                var shadow = window.getSelection(this._shadowRoot);
    
                this._tagContainer = document.createElement(this._tagType);
                var theText = document.createTextNode(this._tagText);
                this._tagContainer.appendChild(theText);
                this._shadowRoot.appendChild(this._tagContainer);
            };
            this._shadowRoot.appendChild(this._tagBtn);
        }
    
    
    });
        
})();