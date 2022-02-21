
function getBookId(obj) {
  var query =obj.id;
  document.getElementById("titlename").innerHTML=query; // set the title name

var temphide = document.getElementById("hide");
temphide.style.display="none";
var tempshow = document.getElementById("show");
tempshow.style.display="block";

fetch("https://gutendex.com/books?topic="+query+"").then(data=>{ //button id is added for fetching books by catogory
  return data.json();
}).then((completedata)=>{

  console.log(completedata.results);
  let dataset ="";
completedata.results.map((values)=>{
    dataset+='<div class="imgDiv col-md-2"  ><img src="'+ values.formats["image/jpeg"] +'" id="coverImg" alt="">';
    dataset+='<div class="title">'+ values.title +'</div>';
    dataset+='<div class="name">'+ values.authors[0].name +'</div></div>';

});
document.getElementById("card").innerHTML=dataset;
});

}


function searchShow(searchquery) {
  var currentquery =document.getElementById("titlename").innerHTML;

  fetch("https://gutendex.com/books?topic="+currentquery+"&search="+searchquery+"")
  .then(response=>response.json())
  .then((jsondata)=>{
    console.log(jsondata)
    //const allresult=jsondata.results.map(element => element.book.name);
    //renderResult(allresult)
let dataset ="";
var hotText = 'MDN';

    jsondata.results.map((searchvalues)=>{
        dataset+='<div class="imgDiv col-md-2"  ><img src="'+ searchvalues.formats["image/jpeg"] +'" onclick="val('+ searchvalues.formats["text/html"] +')" id="coverImg" alt="">';
        dataset+='<div class="title">'+ searchvalues.title +'</div>';
        dataset+='<div class="name">'+ searchvalues.authors[0].name +'</div></div>';

  });
  document.getElementById("card").innerHTML=dataset;
})
}

let searchTimeoutToken = 0;
window.onload=()=>{
  const searchFieldElement= document.getElementById("searchhere");
  document.getElementById("card").innerHTML=" ";
  searchFieldElement.onkeyup = (event) => {

    clearTimeout(searchTimeoutToken);
    searchTimeoutToken = setTimeout(() =>{
      searchShow(searchFieldElement.value);
    },250);

  };
}
