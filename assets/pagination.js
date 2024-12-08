function Pagination( options)
{
  this.defaultOptions = {
    $adjacents: 1,
    $limit:15,
    $page:1,
    $totalitems:0,
    $pagination:'',
		parentDiv:null,
    onClick:function(){},
   };
 this.config  = Object.assign({}, this.defaultOptions, options || {});

this.create();
this.setPagination();
};
Pagination.prototype.setPagination = function() {
   this.config.parentDiv.html(this.config.$pagination);
   var link = document.querySelectorAll("[role='pagination']");

   for (var i = 0; i < link.length; i++) {
   link[i].addEventListener('click', this.handleClick.bind(this), false);
   }
};
Pagination.prototype.handleClick = function(e) {
 page=parseInt(e.target.getAttribute("data-page"));
 if(page>0){
   this.config.onClick(e,page);
 }

};
Pagination.prototype.get = function() {

  return this.config.$pagination;
};
Pagination.prototype.create = function() {
  let $lastpage = Math.ceil(this.config.$totalitems / this.config.$limit);
  let $lpm1 = $lastpage - 1;
  let $pagestring1 = '';
  let $pagestring2 ='';
  let $pagestringlpm1 =$lpm1;
  let $pagestringlast =$lastpage;
  let $pagination = "";
  let $adjacents=this.config.$adjacents*1;
  this.config.$page=this.config.$page*1;
  if($lastpage > 1)
  {
  $pagination += ' <ul class="pagination"';

  if (this.config.$page > 1)
  {
    $prev=this.config.$page-1;
    if($prev==0 || $prev<0){
      $prev=1;
    }
    $pagination += "<li class='page-iteme'><a role='pagination' class='page-link' data-page='"+$prev+"' href=\"#\">Predhodna</a><li>";
  }
  //pages
  if ($lastpage < 7 + ($adjacents * 2))	//not enough pages to bother breaking it up
  {
    for ($counter = 1; $counter <= $lastpage; $counter++)
    {
      if ($counter == this.config.$page)
        $pagination += "<li class='page-item'><a role='pagination' class='page-link active' data-page='0' href=\"#\">"+$counter+"</a></li>";
      else
      {
        $pagination += "<li class='page-item'><a role='pagination'class='page-link' data-page='"+$counter+"' href=\"#\">"+$counter+"</a><li>";
      }
    }
  }
  else if($lastpage >= 7 + ($adjacents * 2))
  {

    if(this.config.$page < 2 + ($adjacents * 2))
    {
      for ($counter = 1; $counter < 4 + ($adjacents * 2); $counter++)
      {
        if ($counter == this.config.$page)
          $pagination+= "<li class='page-item active' ><a  class='page-link active' data-page='0'   href=\"#\">"+$counter+"</a></li>";
        else
        {
          $pagination += "<li class='page-item'><a role='pagination' class='page-link' data-page='"+$counter+"' href=\"#\">"+$counter+"</a><li>";
        }
      }
      $pagination += "<li class='page-item'><a class='page-link' role='pagination' data-page='"+$lpm1+"'  href=\"#\">"+$lpm1+"</a><li>";
      $pagination += "<li class='page-item'><a class='page-link' role='pagination'  data-page='"+$lastpage+"'  href=\"#\">"+$lastpage+"</a><li>";
    }
    //in middle; hide some front and some back
    else if($lastpage - ($adjacents * 2) > this.config.$page && this.config.$page > ($adjacents * 2))
    {
      $pagination += "<li class='page-item'><a class='page-link'  role='pagination'  data-page='1'  href=\"#\">1</a><li>";
      $pagination += "<li class='page-item'><a class='page-link'  role='pagination'  data-page='2'  href=\"#\">2</a><li>";
      for ($counter = this.config.$page - $adjacents; $counter <= this.config.$page + $adjacents; $counter++)
      {
        if ($counter == this.config.$page)
          $pagination += "<li class='page-item active'><a class='page-link active' role='pagination'   data-page='"+$counter+"'  href=\"#\">"+$counter+"</a></li>";
        else
        {
          $pagination += "<li class='page-item'><a class='page-link' data-page='"+$counter+"' role='pagination'   href=\"#\">"+$counter+"</a><li>";
        }
      }
      $pagination += "<li class='page-item'><a class='page-link'  data-page='"+$lpm1+"'  role='pagination'  href=\"#\">"+$lpm1+"</a><li>";
      $pagination += "<li class='page-item'><a class='page-link'  data-page='"+$lastpage+"'  role='pagination'  href=\"javascript:idinastrany('"+$lastpage+")\">"+$lastpage+"</a><li>";
    }
    //close to end; only hide early pages
    else
    {
      $pagination += "<li class='page-item'><a class='page-link' data-page='1'  role='pagination'  href=\"#\">1</a><li>";
      $pagination += "<li class='page-item'><a class='page-link'  data-page='2' role='pagination'  href=\"#\">2</a><li>";
      for ($counter = $lastpage - (1 + ($adjacents * 3)); $counter <= $lastpage; $counter++)
      {
        if ($counter == this.config.$page){
          $pagination += "<li  class='page-item active'><a class='page-link active' data-page='0'  href=\"#\">"+$counter+"</a></li>";
        }else
        {
            $pagination += "<li class='page-item'><a class='page-link'  role='pagination'   data-page='"+$counter+"' href=\"#\"> "+$counter+"</a><li>";
        }
      }
    }
  }

  if (this.config.$page < $counter - 1)
  {
    let $next=this.config.$page+1;
 $pagination += "<li><a class='page-link'  role='pagination'  data-page='"+$next+"' href=\"javascript:idinastrany('"+$next+"')\">Sledeća</a></li>";
  }
  else{
    $pagination += "<li><a class='page-link' href=\"#\">&raquo;</a></li>";
  $pagination += '</ul>';
  }
  }
  this.config.$pagination=$pagination;

};
(function ( $) {
	 $.prototype.Pagination = function (options) {
	  defaultOptions ={parentDiv:this };
	  config  = Object.assign({},defaultOptions, options || {});
	return new 	Pagination(config);
	}
})(JaJS);
