'use strict';

define(['knockout', 'ko-grid'], function (ko, koGrid) {
    koGrid.defineExtension(module.id, {
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

    return koGrid.declareExtensionAlias('links', module.id);
});
