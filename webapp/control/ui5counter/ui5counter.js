jQuery.sap.declare("webapp.control.ui5counter.ui5counter");
sap.ui.define([
    'sap/ui/core/Control',
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button"
], function(Control, Label, Input, Button) {
    "use strict";
    var UI5Counter = Control.extend("webapp.control.ui5counter.ui5counter", {
        metadata: {
            properties: {
                add: {
                    type: "boolean",
                    defaultValue: true
                },
                sub: {
                    type: "boolean",
                    defaultValue: true
                },
                max: {
                    type: "string",
                    defaultValue: "100"
                },
                min: {
                    type: "string",
                    defaultValue: "-100"
                },
                intervall: {
                    type: "string",
                    defaultValue: "1"
                },
                value: {
                    type: "string",
                    defaultValue: "0.5"
                },
                label: {
                    type: "string",
                    defaultValue: ""
                },
                width: {
                    type: "string",
                    defaultValue: "50px"
                },
                startvalue: {
                    type: "string",
                    defaultValue: ""
                }
            },
            aggregations: {
                _label: {
                    type: "sap.m.Label",
                    multiple: false,
                    visibility: "hidden"
                },
                _add: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                },
                _sub: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                },
                _input: {
                    type: "sap.m.Input",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                change: {
                    parameters: {
                        value: {
                            type: "string"
                        }
                    }
                }
            }
        },

        /**
         * init - Init of Counter Control
         * Setting the Label and User Input
         */
        init: function() {
            //Set a Label
            var sText = "";
            if (this.getLabel() !== "") {
                sText = this.getLabel();
            } else {
                sText = "{i18n>countFor}";
            };

            this.setAggregation("_label", new Label({
                text: sText
            }));
            //Set an Input for the Counter
            this.setAggregation("_input", new Input({
                liveChange: this._onLiveChange.bind(this),
                value: this.getValue(),
                width: this.getWidth(),
                textAlign: sap.ui.core.TextAlign.Center
            }));

            //Set Add Button
            this.setAggregation("_add", new Button({
                press: this._onAdd.bind(this),
                text: "{i18n>add}"
            }));
            //Set Sub Button
            this.setAggregation("_sub", new Button({
                press: this._onSub.bind(this),
                text: "{i18n>sub}"
            }));
        },

        /**
         * _onAdd - Add
         *
         * @param  {type} oEvt description
         * @return {type}      description
         */
        _onAdd: function(oEvt) {
            var currentCount = parseInt(this.getAggregation("_input").getValue());
            currentCount = currentCount + parseInt(this.getIntervall());
            var noMax = false;
            if (this.getMax() === "") {
                noMax = true;
            }
            if (currentCount <= this.getMax() || noMax === true) {
                this.getAggregation("_input").setValue(currentCount);
                this.setValue(currentCount);
                this._fireChange(oEvt);
            };
        },

        /**
         * _onSub - Sub
         *
         * @param  {type} oEvt description
         * @return {type}      description
         */
        _onSub: function(oEvt) {
            var currentCount = parseInt(this.getAggregation("_input").getValue());
            currentCount = currentCount - parseInt(this.getIntervall());
            var noMin = false;
            if (this.getMin() === "") {
                noMin = true;
            }
            if (currentCount >= this.getMin() || noMin === true) {
                this.getAggregation("_input").setValue(currentCount);
                this.setValue(currentCount);
                this._fireChange(oEvt);
            };
        },

        /**
         * reset - Resetting the Counter Control & Initalizing Controls
         */
        reset: function() {
            //Remove User Input from Counter Input Field
            this.getAggregation("_input").setValue("0.5");
            //Call Before Rendering => Generation of New Counter Content
            this.onBeforeRendering();
            //Rerender the Counter
            this.rerender();
        },

        /**
         * onBeforeRendering - Life Cycle Method - Called before renderer
         */
        onBeforeRendering: function() {
            if (this.getAggregation("_input").getValue() === "0.5") {
                this.getAggregation("_input").setValue(this.getStartvalue());
                this.setValue(this.getStartvalue());
                this.getAggregation("_input").setWidth(this.getWidth());
                this.getAggregation("_label").setText(this.getLabel());

            };
        },

        /**
         * _fireChange - Fire the change event
         */
        _fireChange: function(oEvt) {
            //publish counter changed
            //{value:"The users input"}
            this.fireEvent("change", {
                value: this.getAggregation("_input").getValue()
            });
        },

        /**
         * renderer - Renders the Counter Control Content
         *
         * @param  {type} oRM      Renderer Manager
         * @param  {type} oControl Control Instance
         */
        renderer: function(oRM, oControl) {
            //here the controls are rendered
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.addClass("myAppDemoWTProductRating");
            oRM.writeClasses();
            oRM.write(">");
            oRM.write("<br>");
            oRM.renderControl(oControl.getAggregation("_label"));
            oRM.write("<br>");
            oRM.renderControl(oControl.getAggregation("_sub"));
            oRM.renderControl(oControl.getAggregation("_input"));
            oRM.renderControl(oControl.getAggregation("_add"));
            oRM.write("</div>");
        },

        /**
         * _onLiveChange - Change of the user Input field
         *
         * @param  {type} oEvt event of input field
         */
        _onLiveChange: function(oEvt) {
            this._fireChange(oEvt);
        }
    });
    return UI5Counter;
});
