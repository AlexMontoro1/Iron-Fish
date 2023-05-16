$(document).ready(function() {
    var selectedFishId = "{{myFishParams.fish._id}}";
    $("#tipo-pez option[value='" + selectedFishId + "']").prop("selected", true);
  });