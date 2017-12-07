//== Class definition

var DatatableHtmlTable = function() {

  return {
    //== Public functions
    init: function() {
        var datatable = $('.m-datatable').mDatatable({
            data: {
                saveState: {cookie: false},
            },
            search: {
                input: $('#generalSearch'),
            },
            columns: [
                {
                    field: 'Deposit Paid',
                    type: 'number',
                },
                {
                    field: 'Order Date',
                    type: 'date',
                    format: 'YYYY-MM-DD',
                },
            ],
        });
    },
  };
}();

jQuery(document).ready(function() {
  DatatableHtmlTable.init();
});