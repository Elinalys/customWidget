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
            /*
            console.defaultError = console.error.bind(console);
            console.errors = [];
            console.error = function(){
                // default &  console.error()
                console.defaultError.apply(console, arguments);
                // new & array data
                console.errors.push(Array.from(arguments));
            }

            console.log("Test du text :");
            console.log(textErrors);
            */
            this.redraw("Bonjour");
        }
        
        transformErrorsToString(errors){
            let textErrors = "";
            for (var i=0;i<errors.length;i++){
                textErrors += "\nErreur " + i + "\n";
                for(var j=0;j<errors[i].length;j++){
                    textErrors += errors[i][j];
                }
            }
            console.log("Test du text :");
            console.log(textErrors);
            return textErrors;
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
            window.onerror = function (msg, url, line) {
                console.log("Message : " + msg );
                console.log("url : " + url );
                console.log("Line number : " + line );
                if (error) message = error.stack;
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            widgetText: msg
                        }
                    }
                }));
                ga('send', 'event', 'window.onerror', message, navigator.userAgent);
              }
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
            this._shadowRoot.appendChild(btn);

        }
    
    
    });
        
})();