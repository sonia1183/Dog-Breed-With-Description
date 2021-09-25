var $breeds = $('select.breeds');
$breeds.change(function() {
  var id = $(this).children(":selected").attr("id");
  getBreed(id)
});

// Load all the Breeds

function get() {
  ajax_get('https://api.thedogapi.com/v1/breeds', function(data) {
    printBreeds(data)
  });
}

// This function Add options

function printBreeds(breeds) {
  $breeds.empty().append(function() {
    var output = '';
    $.each(breeds, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}

// This Function Trigger Selected Breed

function getBreed(breed_id) {
  ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {
      displayData(data[0])
  });
}

// Clear data

function clearData() {
  /*$('#images-breed-1').attr('src', "");
  $('#images-breed-2').attr('src', "");
  $('#images-breed-3').attr('src', "");
  $('#images-breed-4').attr('src', "");
  $('#images-breed-5').attr('src', "");
  $('#images-breed-6').attr('src', "");
  $('#images-breed-7').attr('src', "");
  $('#images-breed-8').attr('src', "");
  $('#images-breed-9').attr('src', "");
  $('#images-breed-10').attr('src', "");
  $('#images-breed-11').attr('src', "");
  $('#images-breed-12').attr('src', "");*/
  $("#images-breed").attr('src',"");
  $("#info-table tr").remove();
}

// display data of dog/Breed
/*function addImage(data)
{ 
   $('.image-section').each(function(){
            for(let i=0;i<12;i++){
              this.append('<img class="img-dog" src="'+data[i].url+'">');
            }
          
   });
}*/

function displayData(image) {

  $("#info-table tr").remove();
  $("#images-breed").attr('src',image.url);
  var dog_image = image.breeds[0]
  $.each(dog_image, function(key, value) {
    if (key == 'weight' || key == 'height') value = value.metric
    $("#info-table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  });
}

//Print Name

$(function(){
    var select = $('.breeds');
    var selected = $('#selected1');
    var select_option =$('#selected2');

    select.on('change', function(){
        var selectedText = $(this).children(':selected').text();
        
        selected.text(selectedText);
        select_option.text(selectedText);
    });
});

//Ajax request

function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('Text:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

get();
