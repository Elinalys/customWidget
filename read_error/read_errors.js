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
            this._tagType = "p";
            this._tagText = "";
            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		}

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            
            console.log("window.onerror");
            window.onerror = function(error, url, line) {
                
                console.log(error + url + line);
            };

            console.defaultError = console.error.bind(console);
            var logMessages = [];
            console.error = function(){
                // default &  console.error()
                console.defaultError.apply(console, arguments);
                // new & array data
                logMessages.push(Array.from(arguments));
            }
            console.error("You make a mistake");
            
            var textErrors = "";
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

            this.redraw("Bonjour1");
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

        redraw(test){
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        widgetText: test
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
            /*
            var btn = document.createElement("button");
            btn.innerHTML = "Submit";
            btn.setAttribute("type", "submit");
            */
            this._shadowRoot.appendChild(this._tagContainer);
            //this._shadowRoot.appendChild(btn);

        }
    
    
    });
        
})();