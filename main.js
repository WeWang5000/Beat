console.log('hi')
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }

var getAll =function () {
    $.getJSON('https://api.airtable.com/v0/apparv2j6EOOrgYaX/Table%201?api_key=keyFqsLeVJmDj3HEX',
    function(data){
        var html=[];
        $.each(data.records, function(index,record) {
            var id = record.id;
            var name = record.fields['Name'];
            var audio = record.fields['Audio'];
            var picture = record.fields['Pictures'];
            var created = record.fields['Created'];
            var description = record.fields['Description'];
            console.log(name)
            html.push(listView(id, name, audio, picture, created, description));
            console.log(id)
        });
        $('.list').append(html);
    }
    );
  }



var listView = function(id, name, audio, picture, created, description ) {
    return `
    <div class="card-deck" style="padding: 20px;">
    <div class="card" style="width: 21.5rem;">
   ${picture ? `<img src="${picture[0].url}">` : ``}
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text">Year created: ${created}</p>
      <audio controls>
        ${audio ? `<source src="${audio[0].url}">` : ``} type="audio/mpeg">
    </audio>
    </div>
    </div>
  </div>
      `;
   }





 var id = getParameterByName('id');
if (id) {
 getOneRecord(id);
} else {
 getAll();
}