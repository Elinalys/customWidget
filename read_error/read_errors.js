(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    `;

    customElements.define("com-synvance-readerrors", class ReadErrors extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            //this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._tagContainer;
            this._tagType = "p";
            this._tagText = "Hello World1";

            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		}

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        widgetText: this.widgetText
                    }
                }
            }));
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            this.redraw();
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


        get headingType() {
            return this._tagType;
            }

        set headingType(value) {
            this._tagType = value;
        }

        // End - Getters and Setters

        redraw(){
            if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
            }
            var shadow = window.getSelection(this._shadowRoot);
            this._tagContainer = document.createElement(this._tagType);
            var theText = document.createTextNode(new Date()); 
            this._tagContainer.appendChild(theText); 
            this._shadowRoot.appendChild(this._tagContainer);

        }
    
    
    });
        
})();