class PhjTextInput extends ComponentLogics {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this._layoutStates = {
            enabled: {
                layoutState: {
                    disabled: false
                },
                css: `
<style>
    input{
        border: 2px solid #284260;
        padding: 6px;
        border-radius: 5px;
        margin: 2px;
        width: 80%;
    }
    :host{
display: block;
    }                                
</style>
`
            },
            disabled: {
                layoutState: {
                    disabled: true
                },
                css: `
<style>
    input{
        border: 1px solid #525456;
        padding: 6px;
        border-radius: 5px;
        margin: 2px;
        width: 80%;
        color: #a7a2a2;
    }
    input:hover{
        cursor: not-allowed;
    }                                
</style>
`

            },
            invalid: {
                layoutState: {
                    invalid: true
                },
                css: `
<style>
    input{
        border: 1px solid red;
        padding: 6px;
        border-radius: 5px;
        margin: 2px;
        width: 80%;
    }
    :host{
display: block;
    }                                
</style>
`
            }
        }

        this._state = {
            text: '',
            hasLabel: false,
            label: ''
        }
    }

    connectedCallback(){
        // set css of the webcomponent
        this._setLayoutState('enabled')
        // set HTML of the webcomponent
        this._setShadow(`
        <div id="text" style="display: none"><slot></slot></div>
        <input type="text" id="text2" oninput="if(this.value.length===1)this.dispatchEvent(new CustomEvent('fill',{bubbles:true,composed:true,detail:this.value}))">
        `)
        // set innerhtml
        this._executeShadow()
        // set eventHandlers and handle attributes
        // todo make the label attribute do its job
        this._setUpAttributes('text','events','label','prop')
    }
}
customElements.define('phj-text-input',PhjTextInput)
