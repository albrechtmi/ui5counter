sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'webapp/control/ui5counter/ui5counter'
], function(jQuery, Controller, JSONModel, MessageToast, UI5Counter) {
    "use strict";
    var MainController = Controller.extend("webapp.controller.Main", {

        /**
         * onInit - Life Cylcle Method init
         * setting a router & i18n model
         */
        onInit: function() {
            //router
            this.setRouter();
            //i18n
            this.seti18n();
        },

        setRouter: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("main").attachMatched(this._onRouteMatched, this);
        },

        /**
         * seti18n - Setter of i18n Model
         * could be done as well with the manifest
         */
        seti18n: function() {
            jQuery.sap.require("jquery.sap.resources");
            var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
            var oBundle = jQuery.sap.resources({
                url: "webapp/i18n/messagebundle.properties",
                locale: sLocale
            });
            var i18noModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "webapp/i18n/messagebundle",
                bundleLocale: sLocale
            });
            this.getView().setModel(i18noModel, "i18n");
        },

        /**
         * onSubmit - Eventhandler for Submiting the form
         * would do something with the form data
         * @param  {type} oEvt description
         */
        onSubmit: function(oEvt) {
            MessageToast.show("Send Form Content");
        },

        /**
         * onResetCounter - Eventhandler for Reseting the counter
         * to show a Control Call of reset() Function
         * @param  {type} oEvt description
         */
        onResetCounter: function(oEvt) {
            this.getView().byId("counter").reset();
        },

        /**
         * onCountGet - Get Counter Value
         *
         * @param  {type} oEvt description
         * @return {type}      description
         */
        onCountGet:function(oEvt) {
          MessageToast.show("Counter Value: " + this.getView().byId("counter").getValue());
        },

        /**
         * onCounterChange - Event Listner for Change on Counter
         *
         * @param  {type} oEvt description
         * @return {type}      description
         */
        onCounterChange: function(oEvt) {
            console.log("Counter Changed - Value = " + oEvt.getParameter("value"));
        },

        /**
         * _onRouteMatched - Handler for RouteMatched
         * No Routes here - just a handler
         * @param  {type} oEvt description
         */
        _onRouteMatched: function(oEvt) {},

    });
    return MainController;
});
