/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-dom', 'stringifyable', 'indexed-list', 'onefold-lists', 'onefold-js', 'ko-grid', 'ko-data-source', 'ko-indexed-repeat', 'knockout'],    function(onefold_dom, stringifyable, indexed_list, onefold_lists, onefold_js, ko_grid, ko_data_source, ko_indexed_repeat, knockout) {
var ko_grid_links_links, ko_grid_links;

ko_grid_links_links = function (module, ko, koGrid) {
  var extensionId = 'ko-grid-links'.indexOf('/') < 0 ? 'ko-grid-links' : 'ko-grid-links'.substring(0, 'ko-grid-links'.indexOf('/'));
  koGrid.defineExtension(extensionId, {
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
  return koGrid.declareExtensionAlias('links', extensionId);
}({}, knockout, ko_grid);
ko_grid_links = function (main) {
  return main;
}(ko_grid_links_links);return ko_grid_links;
});