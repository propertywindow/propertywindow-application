import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PropertyService} from '../../../shared/services';
import {Property} from '../../../shared/models/property';
declare var $;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./properties.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PropertiesComponent implements OnInit, AfterViewInit {

    properties: Property[] = [];

    constructor(private propertyService: PropertyService) {

    }

    ngOnInit() {
        this.getProperties();
    }

    ngAfterViewInit() {
        $('#m_form_status, #m_form_type').selectpicker();
    }

    getProperties() {
        this.propertyService.getProperties().subscribe(
            data => {
                this.properties = data;
                $(function () {
                    let datatable = $('#m_table').mDatatable({
                        data: {
                            type: 'local',
                            pageSize: 8
                        },
                        search: {
                            input: $('#generalSearch'),
                        },
                    });

                    let query = datatable.getDataSourceQuery();

                    $('#m_form_status').on('change', function () {
                        // shortcode to datatable.getDataSourceParam('query');
                        let query = datatable.getDataSourceQuery();
                        query.Status = $(this).val().toLowerCase();
                        // shortcode to datatable.setDataSourceParam('query', query);
                        datatable.setDataSourceQuery(query);
                        datatable.load();
                    }).val(typeof query.Status !== 'undefined' ? query.Status : '');

                    $('#m_form_type').on('change', function () {
                        // shortcode to datatable.getDataSourceParam('query');
                        let query = datatable.getDataSourceQuery();
                        query.Type = $(this).val().toLowerCase();
                        // shortcode to datatable.setDataSourceParam('query', query);
                        datatable.setDataSourceQuery(query);
                        datatable.load();
                    }).val(typeof query.Type !== 'undefined' ? query.Type : '');

                    $('#m_form_status, #m_form_type').selectpicker();

                });
            }
        );
    }
}
