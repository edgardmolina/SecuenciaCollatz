$(document).ready(function() {
    $('#calendar').fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek, basicDay'
			},
      lang: 'es',
      events: function() {
        $.ajax({
            url: '/ver-calendario/',
            success: function(data) {
              $('#calendar').fullCalendar( 'removeEvents');
              addFeriados(data.feriados);
              addMantenimientos(data.eventos);
              addIncidencias(data.incidencias);
              addChecklists(data.checklists);
            }
        });
      }
    })
});

function addCalanderEvent(id, start, end, title, colour, url){
    var eventObject = {
      id:id,
      title: title,
      start: start,
      end: end,
      color: colour,
      url: url
    };
    $('#calendar').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
}

function addFeriados(feriados){
  $.each(feriados, function( i, d ) {
    addCalanderEvent(i, d.label, d.label,
                    '\nferiado\n\n\n\n\n', 'red')
  });
}

function addMantenimientos(eventos){
  $.each(eventos, function( i, d ) {
    var label = d.actividad + "\n" + d.padre + "\nparte: " + d.equipo  ;
    color = definirColor(d.prioridad);
    addCalanderEvent(i, d.fecha, d.fecha, label, color,
                                          '/ver-actividad/'+d.id_actividad )
  });
}

function addIncidencias(eventos){
  $.each(eventos, function( i, d ) {
    var label = d.descripcion + "\nparte: " + d.equipo  ;
    color = '#5882FA'
    addCalanderEvent(i, d.fecha, d.fecha, label, color, '#' )
  });
}

function addChecklists(eventos){
  $.each(eventos, function( i, d ) {
    var label = d.descripcion + "\nparte: " + d.equipo  ;
    color = '#B404AE'
    addCalanderEvent(i, d.fecha, d.fecha, label, color,
                                        '/finalizar-checklist/'+d.id_checklist)
  });
}

function definirColor(prioridad){
  if (prioridad == "ALTA")
    color = '#FA5858';
  if (prioridad == "MEDIA")
    color = '#FACC2E';
  if (prioridad == "BAJA")
    color = '#01DF3A'
  return color;
}
