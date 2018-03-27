sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button'
], function (jQuery, Fragment, Controller, JSONModel, Popover, Button) {
	"use strict";

	var CController = Controller.extend("HeavensKitchen.controller.Navigation", {
		onInit : function() {
			var toolPage = sap.ui.getCore().byId(this.getView().getId() + "--toolPage");
			toolPage.setSideExpanded(false);
			
			var oModel = new sap.ui.model.json.JSONModel(),
				oViewModel = new sap.ui.model.json.JSONModel({
					"name": "HeavensKitchen.view.View2"
				}),
				myView = this.getView();
			
			oModel.loadData("model/modules.json"); // to load data to the model
			myView.setModel(oModel);
			myView.setModel(oViewModel, "viewModel");

			this._setToggleButtonTooltip(sap.ui.Device.system.desktop);
		},

		onItemSelect : function(oEvent) {
			// 			var item = oEvent.getParameter('item');
		//	debugger;
			//var oViewModel = this.getView().getModel("viewModel");
			// debugger;
			//oViewModel.setProperty("/name", "HeavensKitchen.view.View2");
			var view = this.getView().byId("view");
			view.setViewName("HeavensKitchen.view.View2");
			
			view.rerender();
			
			// var item = oEvent.getParameter('item');
			// var viewId = this.getView().getId();
			// sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},

		handleUserNamePress: function (event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		},

		onSideNavButtonPress : function() {
			debugger;
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		}

	});


	return CController;

});