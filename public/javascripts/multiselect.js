var index = -1;
var htmlStr = tags.reduce(function(a,b){
    index++;
    return a + "<option value="+(index+1)+">"+b+"</option>"; 
},'');
// console.log(tags);
$("#options").html(htmlStr);

$(function () {
	$('#options').multiselect({
		includeSelectAllOption: true,
	});
});