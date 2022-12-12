var imageURL;
var radioButton;
var yearSelection = 2022;
var imageId = 0;
document.addEventListener("DOMContentLoaded", function(event) { 
    var sliderValue = document.getElementById('sliderBar');
    var output = document.getElementById("yearText");
    output.innerHTML = sliderValue.value;
    sliderValue.oninput = function() {
        output.innerHTML = this.value;
    }
    
  });
  
function SearchButton(){
    var radioButtons = document.querySelector('input[name="resultsPerPage"]:checked');
    var sliderValue = document.getElementById('sliderBar');
    yearSelection = sliderValue.value;
    radioButton = radioButtons.value;
    //console.log(radioButton);
    var searchInput = document.getElementById("searchInput").value;
    document.getElementById("imageContainer").innerHTML = "";

    var filteredYear = document.getElementById("filteredYear");
    var filteredResults = document.getElementById("filteredResults");
    filteredYear.innerHTML = yearSelection;
    filteredResults.innerHTML = radioButton;

    
    fetch('https://images-api.nasa.gov/search?q=' + searchInput + '%' + yearSelection + '&media_type=image')
    .then(response => response.json())
    .then(data =>{
        var imageURL = data.collection.items[0].href;
        var imageURLArray = data.collection.items;
       

        for(i = 0; i < radioButton; i++){

            fetch(imageURLArray[i].href) //JSON href
            .then(response => response.json())
            .then(data =>{

                function truncateString(string, size) {
                    if (string.length <= size) {
                      return string
                    }
                    return string.slice(0, size) + '.....'
                  }
  
                
                imageURL = data[0]; //image size
                var sourceImage = document.createElement('img');
                var imageTitle = document.createElement('h5'); 
                imgContainer = document.getElementById("imageContainer");
                sourceImage.src = imageURL;
                imageId++;
                sourceImage.id = imageId;
                console.log(imageURLArray[imageId].data[0].title);
                imageTitle.innerHTML = imageURLArray[imageId].data[0].title;
                document.getElementById("imageContainer").innerHTML +=  "<div class='gallery'><img src=" + imageURL +"><h5>"+ truncateString(imageURLArray[imageId].data[0].title, 16) +"</h5><div class='desc'>"+ truncateString(imageURLArray[imageId].data[0].description, 64) + "</div></div>";
                
                sourceImage.className = "rounded p-3";
                
                
                
                
    });
        }
    
    });
}
function filterResults() {
    var x = document.getElementById("filterCard");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }