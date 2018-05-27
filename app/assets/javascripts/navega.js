(function($){
  $(function(){
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  });
})(jQuery);
$(document).ready(function(){
  $('.datepicker').datepicker();
});
$(document).ready(function() {
  var now = moment();
  $("#aDate").text(now.format("lll"));
});
$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal({opacity: 0.8});
});
$(document).ready(function(){
  $('select').formSelect();
});
