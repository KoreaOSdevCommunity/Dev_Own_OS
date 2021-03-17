function readfile(file)
{
    var rawFile = new XMLHttpRequest();
    var contenst = -1;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                contenst = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return contenst;
}

function searchParam(key) {
  const query = new URLSearchParams(location.search);
  if(query.has(key)){
	return query.get(key);
  }else{
	  return -1;
  }
};

window.onload = function () {
	if(searchParam("stepno")===-1 && searchParam("conceptno")===-1 && searchParam("search")===-1){
		var i = 1;
		var tutorial = {};
		var tutorial_mark = 0;
		var concept = {};
		var concept_mark = 0;
		while (1) {
		  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/step"+i+".md");
		  if(temp!=-1){
			var no = temp.split('\n')[0].split(' | ')[0];
			var name = temp.split('\n')[0].split(' | ')[1];
			tutorial[no]=name;
		  }else{
			  break;
		  }
		  i++;
		}
		while(1){
		  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/concept"+i+".md");
		  if(temp!=-1){
			var no = temp.split('\n')[0].split(' | ')[0];
			var name = temp.split('\n')[0].split(' | ')[1];
			concept[no]=name;
		  }else{
			  break;
		  }
			i++;
		}
		concept_mark="### 개념\n";
		tutorial_mark="### 튜토리얼\n"
		for (i = 1; i < Object.keys(tutorial).length+1; i++) {
		  tutorial_mark+="["+i+". "+tutorial[i]+"](http://www.osdev.kro.kr/?stepno="+i+")<br>";
		}
		for (i = 1; i < Object.keys(concept).length+1; i++) {
		  concept_mark+="["+concept[i]+"](http://www.osdev.kro.kr/?conceptno="+i+")<br>";
		}
		document.getElementById('content').innerHTML =
			marked(tutorial_mark+"\n"+concept_mark);
	}else{
		var stepno=searchParam("stepno");
		var conceptno=searchParam("conceptno");
		var search_keyword=searchParam("search");
		if(conceptno===-1 && search_keyword===-1){
			var temp = readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/step"+stepno+".md").split("\n");
			var content = "";
			for(i=1; i < temp.length; i++){
				content+=temp[i]+"\n";
			}
			document.getElementById('content').innerHTML =
				marked(content);
		}else if(stepno===-1 && search_keyword===-1){
			var temp = readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/concept"+conceptno+".md").split("\n");
			var content = "";
			for(i=1; i < temp.length; i++){
				content+=temp[i]+"\n";
			}
			document.getElementById('content').innerHTML =
				marked(content);
		}else{
			var i = 1;
			var cont=[];
			var post={};
			var result='<h2 class="title text-center">"'+search_keyword+'" 검색기록</h2><br>';
			
			while (1) {
			  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/step"+i+".md");
			  if(temp!=-1){
				  cont.push(temp);
			  }else{
				  break;
			  }
			  i++;
			}
			while(1){
			  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/concept"+i+".md");
			  if(temp!=-1){
				  cont.push(temp);
			  }else{
				  break;
			  }
				i++;
			}
			for(i=0; i < cont.length; i++){
				if(cont[i].indexOf(search_keyword)!=-1){
					var temp=cont[i].split("\n")[0].split(" | ");
					post[temp[1]]="http://www.osdev.kro.kr/?stepno="+temp[0];
				}
			}
			for(i=0; i < Object.keys(post).length; i++){
				result=result+'<h4 class="basic text-center"><a href="'+post[Object.keys(post)[i]]+'">'+Object.keys(post)[i]+'</a></h4><br>'
			}
			document.getElementById('content').innerHTML =
				result;
		}
	}
}
