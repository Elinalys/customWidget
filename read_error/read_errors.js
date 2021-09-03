(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <h1 id="id01">Hello World</h1>
    `;

    class ReadErrors extends HTMLElement {

		constructor() {
			super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		}
        
        render(){
            this.document.getElementById("id01").innerHTML = "New text!";
        }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.render();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            //this.render();
            this.document.getElementById("id01").innerHTML = "Nop!";
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

       //Getters and Setters
       
        get widgetText() {
            return this._tagText;
        }

        set widgetText(value) {
            this._tagText = value;
        }

    }
    customElements.define("com-synvance-readerrors", ReadErrors);
})();