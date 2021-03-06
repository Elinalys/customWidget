(function() {
	let template = document.createElement("template");
	template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Custom Widget Text</legend>
                <table>
                    <tr>
                        <td>Text</td>
                        <td><input id="text_sps" type="string"></td>
                    </tr>
                </table>
            </fieldset>
        </form>
	`;

	class ReadErrorsSps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
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

        set widgetText(newText) {
            this._shadowRoot.getElementById("text_sps").value = newText;
        }
        
        get widgetText() {
            return this._shadowRoot.getElementById("text_sps").value;
        }

	}

customElements.define("com-synvance-readerrors-sps", ReadErrorsSps);
})();