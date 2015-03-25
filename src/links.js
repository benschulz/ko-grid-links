'use strict';

define(['module', 'knockout', 'ko-grid'], function (module, ko, koGrid) {
    var extensionId = module.id.indexOf('/') < 0 ? module.id : module.id.substring(0, module.id.indexOf('/'));

    koGrid.defineExtension(extensionId, {
        Constructor: function LinksExtension(bindingValue, config, grid) {
            Object.keys(bindingValue).forEach(function (columnId) {
                var column = grid.columns.byId(columnId);
                var uriSpec = bindingValue[columnId].uri;
                var labelSpec = bindingValue[columnId].label;
                var uriSelector = typeof  uriSpec === 'function'
                    ? uriSpec
                    : row => grid.data.observableValueSelector(ko.unwrap(row[uriSpec]));
                var labelSelector = typeof labelSpec === 'function'
                    ? labelSpec
                    : row => grid.data.observableValueSelector(ko.unwrap(row[labelSpec || column.property]));

                column.overrideValueBinding(function () {
                    return {
                        init: function (element) {
                            var anchor = window.document.createElement('a');
                            anchor.appendChild(window.document.createTextNode(''));
                            element.appendChild(anchor);
                        },
                        update: function (element, cell, row) {
                            element.firstChild.firstChild.nodeValue = labelSelector(row);
                            element.firstChild.href = uriSelector(row);
                        }
                    };
                });
            });
        }
    });

    return koGrid.declareExtensionAlias('links', extensionId);
});
