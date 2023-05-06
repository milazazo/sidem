// GET TL DATA

fetch('data.csv')
  .then(response => response.text())
  .then(tlCsv => {
    console.log(tlCsv);
    // Parse the CSV data and do something with it


const rows = tlCsv.split('\n');
const tlDataArray = rows.map(row => {
  const values = row.split(',');
  return {
    name: values[0],
    year: values[1],
    source: values[2],
    type: values[3],
    unitidol: values[4],
    description: values[5],
    link: values[6],
    translator: values[7],
    voiced: values[8]
  };
});

console.log(tlDataArray);

///////////////////////////////////////////////////////////////////////////////////

// CREATE TL BOXES

let tlWrapper = document.getElementById('tl-wrapper');
    
    for (let i = 0; i < tlDataArray.length; i++) {
      let tlBox = document.createElement('div');
      tlBox.className = 'tl';
      tlWrapper.appendChild(tlBox);
    }

    const tlData = document.querySelectorAll(".tl");


// INSERT TL DATA

    tlData.forEach((box, index) => {
        let descOutput = ""; // CHECK IF THERE IS DESCRIPTION
        if (tlDataArray[index].hasOwnProperty("description")) {
          console.log(tlDataArray[index].description);
          descOutput += `<p>${tlDataArray[index].description}</p>`;
        } else {
          descOutput += ``;
        }

        let voicedOutput = ""; // CHECK IF THERE IS VOICE
        if (tlDataArray[index].voiced == "voiced") {
          voicedOutput += ` voiced`;
        } else {
          voicedOutput += ``;
        }

        box.innerHTML =`<a href="` + tlDataArray[index].link + `"><div class="tl-header">` + tlDataArray[index].name + `</div></a>
        <p><div class="tag tag-year">year: ` + tlDataArray[index].year + `</div><div class="tag tag-source">source: ` + tlDataArray[index].source + `</div><div class="tag tag-type">type: ` + tlDataArray[index].type + `</div><div class="tag tag-unit">characters: ` + tlDataArray[index].unitidol + `</div><div class="tag tag-translator">translator: ` + tlDataArray[index].translator + `</div></p>` + descOutput;
        box.className = 'tl all-source all-unit all-year ' + tlDataArray[index].source + " " + tlDataArray[index].year + " " + tlDataArray[index].unitidol + voicedOutput;
      });


///////////////////////////////////////////////////////////////////////////////////
// ISOTOPE FILTERING
$(document).ready( function() {

// quick search regex
var qsRegex;
var buttonFilter;

// init Isotope
var $grid = $('.wrapper').isotope({
  itemSelector: '.tl',
  layoutMode: 'fitRows',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});


$('.filters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  $grid.isotope();
});

// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}) );


  // change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.ischecked').removeClass('ischecked');
    $( this ).addClass('ischecked');
  });
});
  

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}

});

    });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// SWITCH FONT SIZE

var tsw_demo_font_is_large = false ;
function tsw_demo_change_font_size( )
{
  demo_paragraph = document.getElementById( 'tl-wrapper' );
  if (!tsw_demo_font_is_large) {
    demo_paragraph.style.fontSize = "120%" ;
    tsw_demo_font_is_large = true ;
  }
  else {
    demo_paragraph.style.fontSize = "100%" ;
    tsw_demo_font_is_large = false ;
  }
}