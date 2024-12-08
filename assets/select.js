function Selects( options) {
	  this.defaultOptions = {
			button: null,
		  dropdown: null,
		  options:null,
		 	search:null,
			parentDiv:null,
			issearch:false,
			option:'',
			didoption:null,
			placeholder:'Select',
			searchplaceholder:'search',
			odabrano:'Odabrano',
			ajaxUrl:'',
			data:{q:'q'},
      ismultiselect:false,
		  find: null,
			onSelect: null,
	   };
  this.config  = Object.assign({}, this.defaultOptions, options || {});
  this.isDropdownOpen = false;
	this.currentOptionIndex = 0;
	this.lastTypedChar = '';
  this.lastMatchingIndex = 0;
	this.optionName='';
	this.create();
};
Selects.prototype.create = function() {
	if(this.config.option==''){
		return ;
	 }
	 this.config.didoption= $("#"+this.config.option)[0];
   if(typeof this.config.didoption=== "undefined"   ) {
		return ;
    }
		if( this.config.didoption=== null  ) {
		 return ;
		 }
	let opts = this.config.didoption.options;
	let name=this.config.didoption.getAttribute("name");
  this.optionName=name;
if(this.config.didoption.getAttribute("multiple")!==null){
this.config.ismultiselect=true ;
}
   this.config.didoption.style.opacity = "0";

	let html='<div class="select-container">\
		<button\
			role="combobox"\
			id="select"\
			value="';
			html+=this.config.placeholder+'"\
			aria-controls="listbox"\
			aria-haspopup="listbox"\
			tabindex="0"\
			aria-expanded="false">';
	  	html+=this.config.placeholder+'</button>\
		<ul role="listbox" id="listbox">';
  if(this.config.issearch){
		html+='<li class="select-search-box"><input type="text" class="select-search" placeholder="'+this.config.searchplaceholder+'" title="'+this.config.searchplaceholder+'"> </li>';
	}
	for(i = 0; i < opts.length; i++)
	{
		selected=false;
		if(opts[i].getAttribute("selected")!==null){
				selected=true;
		}
if(!this.config.ismultiselect){
  	if(selected ){
		html+='<li role="option" class="active" data-value="'+opts[i].value+'" aria-selected="true">'+opts[i].textContent+'</li>';
   	}else{
			html+='<li role="option" data-value="'+opts[i].value+'" >'+opts[i].textContent+'</li>';
   	}
   }else{
		if(selected ){
					html+='<li role="option" class="active" data-value="'+opts[i].value+'" aria-selected="true"><label><input type="checkbox" checked="checked" name="'+name+'[]" value="'+opts[i].value+'" />'+opts[i].textContent+'</label></li>';
		}else{
			html+='<li role="option" data-value="'+opts[i].value+'" ><label><input type="checkbox" name="'+name+'[]" value="'+opts[i].value+'" />'+opts[i].textContent+'</label></li>';
      }
		}
	}
			html+='</ul>';
    if(!this.config.ismultiselect){
				html+='<div style="opacity:0;"><select id="'+this.config.option+'" name="'+name+'">';
				for(i = 0; i < opts.length; i++)
				{
					selected='';
					if(opts[i].getAttribute("selected")!==null){
							selected='selected="selected"';
					}
						html+='<option  value="'+opts[i].value+'" '+selected+' >'+opts[i].textContent+'</option>';
				}
html+=' </select></div>';
    }
	html+='</div>';
	let element = document.createElement('div');
	element.innerHTML = html;
  this.config.parentDiv[0].replaceWith(element);
	this.config.didoption= document.querySelector("#"+this.config.option);
this.config.button=document.querySelector('[role="combobox"]');
this.config.dropdown= document.querySelector('[role="listbox"]');
this.config.options= document.querySelectorAll('[role="option"]');
if(this.config.issearch){
this.config.search=document.querySelector('.select-search');
}
if(this.config.ismultiselect){
    let broj=0; let ukupno=0;
		this.config.options.forEach(option => {

			ukupno++;
			if(option.firstElementChild.firstChild===null){
				if(option.firstElementChild.checked == true){
					broj++;
				}
			}else{
				if(option.firstElementChild.firstChild.checked == true){
					broj++;
				}
			}

		});
		if(broj>0){
			 this.config.button.innerHTML=this.config.odabrano+" " +broj+'/'+ukupno;
		}

 }
this.bindEvent();
};
 Selects.prototype.Search = function (text) {
	 if(text==''){
		 this.config.options.forEach(option => {
		 option.style.display = 'flex' ;

	 });
	  return ;
	 }
	 if(typeof this.config.find === 'function'){
		this.config.find(text ,option,this);
		return ;
	 }
	 this.config.options.forEach(option => {
     option.style.display = option.innerHTML.toLowerCase().indexOf(text.toLowerCase()) > -1 ? 'flex' : 'none';
    });
 };
Selects.prototype.handleDocumentInteraction = function (event) {
	const isClickInsideButton = this.config.button.contains(event.target);
  const isClickInsideDropdown = this.config.dropdown.contains(event.target);
	if (isClickInsideButton || (!isClickInsideDropdown && this.isDropdownOpen)) {
    this.toggleDropdown();
	}
		const clickedOption = event.target.closest('[role="option"]');
			if( clickedOption=== null  ) {
           return ;
        }


	if(!this.config.ismultiselect){
	if(typeof clickedOption!== "undefined"   ) {
			if( clickedOption!== null  ) {

					for (var i=0; i<this.config.didoption.length; i++) {
						option = this.config.didoption.options[i];
						if(option.value==clickedOption.getAttribute("data-value")){
							option.setAttribute('selected', 'selected');
						}else{
							option.removeAttribute("selected");
						}
					}

		}
	}
	if (clickedOption) {
		this.selectOptionByElement(clickedOption);
	}
}else{

	if(clickedOption.firstElementChild.firstChild===null){
		if(clickedOption.firstElementChild.checked == true){
				clickedOption.firstElementChild.setAttribute("checked",'checked');
				clickedOption.classList.add('active');
		}else{
			clickedOption.firstElementChild.removeAttribute("checked");
				clickedOption.classList.remove('active');

		}
	}else{
		if(clickedOption.firstElementChild.firstChild.checked == true){
				clickedOption.firstElementChild.firstChild.setAttribute("checked",'checked');
				clickedOption.classList.add('active');
		}else{
			clickedOption.firstElementChild.firstChild.removeAttribute("checked");
				clickedOption.classList.remove('active');

		}
	}

	let broj=0; let ukupno=0;
      this.config.options.forEach(option => {
				ukupno++;
				if(option.firstElementChild.firstChild===null){
					if(option.firstElementChild.checked == true){
						broj++;
					}
				}else{
					if(option.firstElementChild.firstChild.checked == true){
						broj++;
					}
				}

			});
		 this.config.button.innerHTML=this.config.odabrano+' '+broj+'/'+ukupno;
   }

};
Selects.prototype.selectOptionByElement = function(optionElement) {
	const optionValue = optionElement.textContent;
	 if(typeof this.config.onSelect === 'function'){
	this.config.onSelect(optionElement,this.config.options);
}
	this.config.button.textContent = optionValue;
	this.config.options.forEach(option => {
		option.classList.remove('active');
	option.setAttribute('aria-selected', 'false');
	});
	optionElement.classList.add('active');
 optionElement.setAttribute('aria-selected', 'true');
	this.toggleDropdown();

};
Selects.prototype.toggleDropdown = function()  {
	this.config.dropdown.classList.toggle('active');
	this.isDropdownOpen = !this.isDropdownOpen;
	this.config.button.setAttribute('aria-expanded', this.isDropdownOpen.toString());

	if (this.isDropdownOpen) {
		this.focusCurrentOption();
	} else {
  if(this.config.issearch){
	this.config.search.value='';
     }
		 this.config.options.forEach(option => {
			option.style.display = 'flex' ;

		});
		 this.config.button.focus();
	}
};
Selects.prototype.ajax = function(text) {
			 let 	$this=this;
      let obj={};
			 Object.entries(this.config.data).forEach(entry => {
      const [key, value] = entry;

       if(key=='q'){
				 obj[value]=text;
			 }else{
				  obj[key]=value;
			 }
      });
   $.ajax({url:this.config.ajaxUrl,type:'POST',data:obj,dataType:"json",success :function(msg){
		 $this.config.options.forEach(option => {
			  if(!$this.config.ismultiselect){
 	      	option.remove();
	     	}else{
 				 if(option.firstElementChild.firstChild.checked !== true){
					 option.remove();
				 }
 			 }
 	    });
		 if(!$this.config.ismultiselect){
		   	while ($this.config.didoption.options.length > 0) {
			   $this.config.didoption.remove(0);
			 }
    	}
			for (var i = 0; i < msg.length; i++) {
			   $this.addelement(msg[i].name,msg[i].id);
			}
 	 		}
 			});
};
Selects.prototype.clear= function() {
	//this.config.dropdown.innerHTML='';
	this.config.options.forEach(option => {
		  option.remove();

	 });

	this.config.dropdown= document.querySelector('[role="listbox"]');
	this.config.options=document.querySelectorAll('[role="option"]');
}
Selects.prototype.addelement = function(name,value) {
		if(!this.config.ismultiselect){
			let li = document.createElement("li");
     li.textContent = name;
		 li.setAttribute("role", "option");
		 li.setAttribute("data-value",value);
		  this.config.dropdown.appendChild(li);
		}else{
		 	html='<li role="option" data-value="'+value+'" ><label><input type="checkbox" name="'+this.optionName+'[]" value="'+value+'" />'+name+'</label></li>';
      this.config.dropdown.innerHTML +=html
		 }
    this.config.dropdown= document.querySelector('[role="listbox"]');
    this.config.options=document.querySelectorAll('[role="option"]');
		if(!this.config.ismultiselect){
		const option = new Option(name,value);
		this.config.didoption.add(option);
  	}
};
Selects.prototype.handleSearch = function(e) {
	let text = e.target.value;

	if(this.config.ajaxUrl==''){
		if(text==''){
			this.config.options.forEach(option => {
			option.style.display = 'flex' ;

		});
		 return ;
		}

		this.Search(text);
		return;
	}

	if(text.length<2){
		return ;
	}
	 this.ajax(text);
};
Selects.prototype.bindEvent = function() {
	if(this.config.issearch){
 this.config.search.addEventListener('keyup', this.handleSearch.bind(this));
	}
	document.addEventListener('click', this.handleDocumentInteraction.bind(this));

};
Selects.prototype.focusCurrentOption = function() {

  if(this.currentOptionIndex=='0'){

		 return ;
	}
	const currentOption = this.config.options[this.currentOptionIndex];
	if(typeof currentOption=== "undefined"   ) {
		 this.config.button.focus();
	   return ;
	}
	if(typeof currentOption.textContent=== "undefined"   ) {

 	return ;
 	}
		const optionLabel = currentOption.textContent;
	currentOption.classList.add('current');
	currentOption.focus();

	currentOption.scrollIntoView({
		block: 'nearest',
	});
	this.config.options.forEach((option, index) => {
		if (option !== currentOption) {
			option.classList.remove('current');
		}
	});
};

(function ( $) {
	 $.prototype.Selects = function (options) {
	  defaultOptions ={parentDiv:this };
	  config  = Object.assign({},defaultOptions, options || {});
	return new 	Selects(config);
	}
})(JaJS);
