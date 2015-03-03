/**
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-dom', 'onefold-js', 'ko-grid', 'ko-indexed-repeat', 'knockout'],    function(onefold_dom, onefold_js, ko_grid, ko_indexed_repeat, knockout) {
var ko_grid_links_links, ko_grid_links;

ko_grid_links_links = function (ko, koGrid) {
  koGrid.defineExtension('ko-grid-links', {
    Constructor: function LinksExtension(bindingValue, config, grid) {
      Object.keys(bindingValue).forEach(function (columnId) {
        var column = grid.columns.byId(columnId);
        var uriSpec = bindingValue[columnId].uri;
        var labelSpec = bindingValue[columnId].label;
        var uriSelector = typeof uriSpec === 'function' ? uriSpec : function (row) {
          return grid.data.observableValueSelector(ko.unwrap(row[uriSpec]));
        };
        var labelSelector = typeof labelSpec === 'function' ? labelSpec : function (row) {
          return grid.data.observableValueSelector(ko.unwrap(row[labelSpec || column.property]));
        };
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
  return koGrid.declareExtensionAlias('links', 'ko-grid-links');
}(knockout, ko_grid);
ko_grid_links = function (main) {
  return main;
}(ko_grid_links_links);return ko_grid_links;
});