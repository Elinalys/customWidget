(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    `;

    class ReadErrors extends HTMLElement {

		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
            this._tagContainer;
            this._tagType = "h1";
            this._tagText = "Hello World";
            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
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

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        }
        */

        data
         () {
            return {
                data: []
            }
        }

       //Getters and Setters
        get widgetText() {
            return this._tagText;
        }

        set widgetText(value) {
            let current_log = console.log;
            let test;
            window.onerror = function myErrorHandler(err, url, line) {  
                //Do some  stuff 
                test = err // Uncaught SyntaxError: Invalid or unexpected token at Line no:- 1
                return false;   // so you still log errors into console 
            }
            console.log = msg => {
                if (msg !== undefined) this.data.push(msg);
                current_log.apply(null, arguments);
            }
            value = current_log + "tata" + test;
            this._tagText = value;
        }

        redraw(){
            if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
            }

            var shadow = window.getSelection(this._shadowRoot);
            this._tagContainer = document.createElement(this._tagType);
            var theText = document.createTextNode(this._tagText);
            this._tagContainer.appendChild(theText); 
            this._shadowRoot.appendChild(this._tagContainer);
        }
    }
    customElements.define("com-synvance-readerrors", ReadErrors);
})();