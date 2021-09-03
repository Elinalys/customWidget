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
            this._tagText = new Date();
            
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
            this.redraw(new Date());
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
            let btn = document.createElement("button");
            btn.innerHTML = "Submit";
            btn.setAttribute("type", "submit");
            this._tagContainer.appendChild(btn);
            this._shadowRoot.appendChild(this._tagContainer);

        }
    
    
    });
        
})();