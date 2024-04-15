 function RedirectToHome(){
	document.location.href="/"
}

 function myFunction1() {
		  document.getElementById("myCategoriesMenu").classList.toggle("show");
	}
/*
 function Markdown_show(markdown){
	const options = {
	'tables': true,
	'tasklists': true,
	'strikethrough': true
}
const converter = new showdown.Converter(options)
	const html = converter.makeHtml(markdown)
	document.getElementById('review_comment').innerHTML = html;
}

*/
 function myFunction_Markdown(){

	const options = {
	'tables': true,
	'tasklists': true,
	'strikethrough': true
}

const converter = new showdown.Converter(options)
	console.log('change')
	
	const markdown = document.querySelector('.textarea1').value
	console.log(markdown)
	const html = converter.makeHtml(markdown)
	console.log(html)
	document.querySelector('.article1').innerHTML = html

 }


	window.onclick = function(event) {
		  if (!event.target.matches('.categories_button')) {
			var dropdowns = document.getElementsByClassName("categories_menu_content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
			  var openDropdown = dropdowns[i];
			}
		  }
		}


		//document.registrationForm.ageInputId.oninput = function(){
    //document.registrationForm.ageOutputId.value = document.registrationForm.ageInputId.value;}
