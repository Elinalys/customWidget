(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <p>Error : <span id="text_error"></span></p>
		<form id="form">
			<fieldset>
				<legend>Properties</legend>
				<table>
					<tr>
						<td>Text color</td>
						<td><input id="sps_text_color" type="text" size="40" maxlength="40"></td>
					</tr>
					<tr>
						<td>Background color</td>
						<td><input id="sps_background_color" type="text" size="40" maxlength="40"></td>
					</tr>                    
				</table>
				<table>
					<tr>
						<td>Tooltip text</td>
						<td><input id="sps_tooltip" type="text" size="40" maxlength="40"></td>
					</tr>                 
				</table>                
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

    class ReadErrorSps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        textColor: this.textColor,
                        backgroundColor: this.backgroundColor,
                        tooltip: this.tooltip
                    }
                }
            }));
        }

        set textColor(newColor) {
            this._shadowRoot.getElementById("sps_text_color").value = newColor;
        }

        get textColor() {
            return this._shadowRoot.getElementById("sps_text_color").value;
        }

        set backgroundColor(newColor) {
            this._shadowRoot.getElementById("sps_background_color").value = newColor;
        }

        get backgroundColor() {
            return this._shadowRoot.getElementById("sps_background_color").value;
        }

        set tooltip(newText) {
            this._shadowRoot.getElementById("sps_tooltip").value = newText;
        }

        get tooltip() {
            return this._shadowRoot.getElementById("sps_tooltip").value;
        }

        get getTextError() {
            return this._shadowRoot.getElementById("text_error").value;
        }

    }

    customElements.define("com-synvance-readError-sps", ReadErrorSps);
})();
