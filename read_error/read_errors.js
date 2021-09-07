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
            this._tagBtn ;
            this._tagBtn = document.createElement('button');
            this._tagBtn.textContent = "Submit";
            this._tagBtn.onclick = this._submit.bind(this);
            this._tagType = "p";
            this._tagText = "Bonjour !!";
            this._firstConnection = false;
            this._isStarting = true;

            //Adding event handler for click events
            this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            console.log("test 11");
            this._firstConnection = true;
            this._shadowRoot.appendChild(this._tagBtn);
            this.redraw();
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

        _submit(e) {
			e.preventDefault();
			this._tagText = this.getMessageError();
            this.redraw();
		}

        getMessageError(){
            var i = 1;
            var textErrors = "";

            // To avoid -> Uncaught RangeError: Maximum call stack size exceeded
            if(this._isStarting){
                console.defaultError = console.error.bind(console);
                this._isStarting = false;
            }

            var logMessages = [];
            console.error = function(){
                // default &  console.error()
                console.defaultError.apply(console, arguments);
                // new & array data
                logMessages.push(Array.from(arguments));
            }
            window.onerror = function(error, url, line) {
                console.error("I get somes errors :\n" + error + "\nurl : " + url + "\nline : " + line);	
            };
            console.error("You make a mistake");
            console.error("You make a mistake 2");
            console.error("You really make a mistake");
            

            logMessages.forEach(element => {
                textErrors += "Erreur " + i + " : \n";
                element.forEach(tab => {
                    textErrors += tab + "\n";
                });
                i++;
            });
            
            console.log("textErrors :");
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
    
    });
        
})();