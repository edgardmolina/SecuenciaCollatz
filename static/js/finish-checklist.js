function finalizarChecklist(id_checklist){
  console.log("FINISH HIM!!!");
  var data_send = new Object();
  var checklists = $(".task");
  var array_checks = new Array();
  $.each(checklists, function( i, check ) {
    var object_check = new Object();
    if($('#'+check.id).is(":checked"))
      array_checks.push(check.id);
  });
  $.ajax({
      url: '/finalizar-checklist-items/',
      type: 'POST',
      headers: { "X-CSRFToken": getCookie("csrftoken") },
      datatype: 'json',
      data: {'checks[]' : array_checks},
      success: function(data) {
          window.location = '/ver-checklist/'+id_checklist;
      }
  });
}
