$(document).ready(function() {
  $('#data-tables').DataTable({

    "language": {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "",//"_MENU_",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }
  });
});

$(document).ready(function() {
    // Setup - add a text input to each footer cell
    var columns_size = []
    $('#data-tables thead th').each( function () {
        var title = $('#data-tables tfoot th').eq( $(this).index() ).text();
        if (title != ""){
          columns_size.push(this.style.width);
        }
    } );

    var i = 0
    $('#data-tables tfoot th').each( function () {
        var title = $(this).text();
        if (title != ""){
          $(this).html( '<input type="text" style="max-width:'+columns_size[i]+'" class="form-control" placeholder="" />' );
          i++;
        }
    } );

    // DataTable
    var table = $('#data-tables').DataTable();

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
} );

/*$(document).ready(function() {
    $('#data-tables thead th').each( function () {
        var title = $('#data-tables tfoot th').eq( $(this).index() ).text();
        if (title != ""){
          $(this).html( '<input type="text" style="max-width:'+this.style.width+'" class="form-control" placeholder="">' );
        }
    } );

    var table = $('#data-tables').DataTable();
    if(table.columns().length > 0){
      table.columns().eq( 0 ).each( function ( colIdx ) {
          $( 'input', table.column( colIdx ).header() ).on( 'keyup change', function () {
              table
                  .column( colIdx )
                  .search( this.value )
                  .draw();
          } );
      });
    }
} );*/
