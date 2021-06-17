$(function() {
    $(".task").draggable({
        cursor: 'pointer',
        revert: true,
        start: function( event, ui ) {
          $(this).css('position', 'absolute');
          $(this).css('z-index', '9999');
        },
        drag: function( event, ui ) {
          cursor_posicion(event, ui);
        },
        revert: function( event, ui ) {
        }
    });
    $(".incidence").draggable({
        cursor: 'pointer',
        revert: true,
        start: function( event, ui ) {
          $(this).css('position', 'absolute');
          $(this).css('z-index', '9999');
        },
        drag: function( event, ui ) {
          cursor_posicion(event, ui);
        },
        revert: function( event, ui ) {
        }
    });
    $(".column-task-task").droppable({
      hoverClass: 'hovered',
      drop: function(event, ui){
        draggable_position(event, ui, $(this));
        if (ui.draggable.hasClass('incidence'))
          cambiar_estado_incidencia(ui, 'TAREAS')
        else
          cambiar_estado(ui, 'TAREAS');
      }
    });
    $(".column-task-maintenance").droppable({
      hoverClass: 'hovered',
      drop: function(event, ui){
        draggable_position(event, ui, $(this));
        if (ui.draggable.hasClass('incidence'))
          cambiar_estado_incidencia(ui, 'MANTENIMIENTO')
        else
          cambiar_estado(ui, 'MANTENIMIENTO');
      }
    });
    $(".column-task-review").droppable({
      hoverClass: 'hovered',
      drop: function(event, ui){
        draggable_position(event, ui, $(this));
        if (ui.draggable.hasClass('incidence'))
          cambiar_estado_incidencia(ui, 'REVISIÓN')
        else
          cambiar_estado(ui, 'REVISIÓN');
      }
    });
    $(".column-task-ready").droppable({
      hoverClass: 'hovered',
      drop: function(event, ui){
        draggable_position(event, ui, $(this));
        if (ui.draggable.hasClass('incidence'))
          cambiar_estado_incidencia(ui, 'REALIZADO')
        else
          cambiar_estado(ui, 'REALIZADO');
      }
    });
});

function draggable_position(event, ui, this_drag){
  ui.draggable.css( 'background', "#BDBDBD" );
  ui.draggable.position( { of: this_drag, my: 'center center',
                                                  at: 'center center' } );
  ui.draggable.draggable( 'option', 'revert', false );
}

function cursor_posicion(event, ui){
  ui.position.top = event.clientY - 200
}

function cambiar_estado(ui,  estado){
  var evento = ui.draggable[0].id;
  var data_send = new Object();
  data_send.evento = evento;
  data_send.estado = estado;
  $.ajax({
      url: '/cambiar-evento-kanban/',
      type: 'POST',
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      datatype: 'json',
      data: data_send,
      success: function(data) {
        if(data.estado == 'REALIZADO')
          window.location = '/finalizar-evento-kanban/'+data.evento;
        else
          location.reload();
      }
  });
}

function cambiar_estado_incidencia(ui,  estado){
  var incidencia = ui.draggable[0].id;
  var data_send = new Object();
  data_send.incidencia = incidencia;
  data_send.estado = estado;
  $.ajax({
      url: '/cambiar-incidencia-kanban/',
      type: 'POST',
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      datatype: 'json',
      data: data_send,
      success: function(data) {
        if(data.estado == 'REALIZADO')
          window.location = '/finalizar-incidencia-kanban/'+data.incidencia;
        else
          location.reload();
      }
  });
}
