var option_add = false;
var supply_add = false;
var isAndroid = (navigator.userAgent.toLowerCase().indexOf("android") > -1);

$(function() {
    // 선택옵션
    /* 가상커서 ctrl keyup 이베트 대응 */
    /*
    $(document).on("keyup", "select.it_option", function(e) {
        var sel_count = $("select.it_option").size();
        var idx = $("select.it_option").index($(this));
        var code = e.keyCode;
        var val = $(this).val();

        option_add = false;
        if(code == 17 && sel_count == idx + 1) {
            if(val == "")
                return;

            sel_option_process(true);
        }
    });
    */

    /* 키보드 접근 후 옵션 선택 Enter keydown 이벤트 대응 */
    $(document).on("keydown", "select.it_option", function(e) {
        var sel_count = $("select.it_option").size();
        var idx = $("select.it_option").index($(this));
        var code = e.keyCode;
        var val = $(this).val();
				
				//14K/18K 선택시 document.fitem.it_price 값조정
				var it_id = $("input[name='it_id[]']").val();				 
				if(val.match(/18K/i)){
				 $.post(
         	"./itemnewval.php",
          { it_id: it_id, it_k : '18K'},
          function(data) {
           document.fitem.it_price.value = data[1];
           document.fitem.tt_rough_price.value = data[01];
         });
				}else if(val.match(/14K/i)){
					$.post(
         		"./itemnewval.php",
          	{ it_id: it_id, it_k : '14K'},
          	function(data) {
           	 document.fitem.it_price.value = data[1];
           	 document.fitem.tt_rough_price.value = data[01];
         	});
				}
				
				

        option_add = false;
        if(code == 13 && sel_count == idx + 1) {
            if(val == "")
                return;

            sel_option_process(true);
        }
    });

    if(isAndroid) {
        $(document).on("touchend", "select.it_option", function() {
            option_add = true;
        });
    } else {
        $(document).on("mouseup", "select.it_option", function() {
            option_add = true;
        });
    }

		function clearSubOption(){
	    var idx = $("select.it_option").index(0);
			// 선택옵션 disabled
			$("select.it_option:gt("+idx+")").val("").attr("disabled", true);
			// 추가옵션 리셋
			$('select.it_supply').val('');
			$("ul#sit_opt_added li").remove();
			if(whoAreYou=='gn') 
			 	price_calculate();
			else
				price_wholesale_calculate();
			
		}
		
    $(document).on("change", "select.it_option", function() {
    	
        var sel_count = $("select.it_option").size();
        var idx = $("select.it_option").index($(this));
        
        // 선택옵션 첫번째가 변경될때 하위옵션 클리어
        if(!idx){
      		clearSubOption();  
        }
       
        
        var val = $(this).val();
        var it_id = $("input[name='it_id[]']").val();
        
       //14K/18K 선택시 document.fitem.it_price 값조정
				 
				if(val.match(/18K/i)){
				 $.post(
         	"./itemnewval.php",
          { it_id: it_id, it_k : '18K'},
          function(data) {
          obj = JSON.parse(data);
          console.log('obj.a :  ' + obj.a);
          console.log('obj.b : ' + obj.b);
          
           document.fitem.it_price.value = obj.a;
           document.fitem.tt_rough_price.value = obj.b;
         });
				}else if(val.match(/14K/i)){
					$.post(
         		"./itemnewval.php",
          	{ it_id: it_id, it_k : '14K'},
          	function(data) {
							obj = JSON.parse(data);
          		console.log('obj.a :  ' + obj.a);
          		console.log('obj.b : ' + obj.b);
          	 document.fitem.it_price.value = obj.a;
           	 document.fitem.tt_rough_price.value = obj.b;
         	});
				}
        
        
        
        
        
        
        
        
        
//console.log('val : ' + val);

        // 선택값이 없을 경우 하위 옵션은 disabled
        if(val == "") {
            $("select.it_option:gt("+idx+")").val("").attr("disabled", true);
            return;
        }

        // 하위선택옵션로드
        if(sel_count > 1 && (idx + 1) < sel_count) {
            var opt_id = "";

            // 상위 옵션의 값을 읽어 옵션id 만듬
            if(idx > 0) {
            //console.log('count : ' + $("select.it_option:lt("+idx+")").size());
            
                $("select.it_option:lt("+idx+")").each(function() {
                    if(!opt_id)
                        opt_id = $(this).val();
                    else
                        opt_id += chr(30)+$(this).val();
                });
						
                opt_id += chr(30)+val;
            } else if(idx == 0) {
                opt_id = val;
            }
console.log('opt_id : ' + opt_id);
            $.post(
                "./itemoption.php",
                { it_id: it_id, opt_id: opt_id, idx: idx, sel_count: sel_count },
                function(data) {
                    $("select.it_option").eq(idx+1).empty().html(data).attr("disabled", false);

                    // select의 옵션이 변경됐을 경우 하위 옵션 disabled
                    if(idx+1 < sel_count) {
                        var idx2 = idx + 1;
                        $("select.it_option:gt("+idx2+")").val("").attr("disabled", true);
                    }
                }
            );
        } else if((idx + 1) == sel_count) { // 선택옵션처리
            if(option_add && val == "")
                return;

            var info = val.split(",");
            // 재고체크
            if(parseInt(info[2]) < 1) {
                alert("선택하신 선택옵션상품은 재고가 부족하여 구매할 수 없습니다.");
                return false;
            }

            if(option_add)
                sel_option_process(true);
        }
    });

    // 추가옵션
    /* 가상커서 ctrl keyup 이베트 대응 */
    /*
    $(document).on("keyup", "select.it_supply", function(e) {
        var $el = $(this);
        var code = e.keyCode;
        var val = $(this).val();

        supply_add = false;
        if(code == 17) {
            if(val == "")
                return;

            sel_supply_process($el, true);
        }
    });
    */

    /* 키보드 접근 후 옵션 선택 Enter keydown 이벤트 대응 */
    $(document).on("keydown", "select.it_supply", function(e) {
        var $el = $(this);
        var code = e.keyCode;
        var val = $(this).val();

        supply_add = false;
        if(code == 13) {
            if(val == "")
                return;

            sel_supply_process($el, true , '추가');
        }
    });

    if(isAndroid) {
        $(document).on("touchend", "select.it_supply", function() {
            supply_add = true;
        });
    } else {
        $(document).on("mouseup", "select.it_supply", function() {
            supply_add = true;
        });
    }

    $(document).on("change", "select.it_supply", function() {
        var $el = $(this);
        var val = $(this).val();

        if(val == "")
            return;

        if(supply_add)
            sel_supply_process($el, true,'추가');
    });

    // 수량변경 및 삭제
    $(document).on("click", "#sit_sel_option p button, #sit_sel_option div button", function() {
        //var mode = $(this).text();
        var mode = $(this).val();
        var this_qty, max_qty = 9999, min_qty = 1;
        var $el_qty = $(this).closest("p").find("input[name^=ct_qty]");
        var stock = parseInt($(this).closest("p").find("input.io_stock").val());

        switch(mode) {
            case "증가":
                this_qty = parseInt($el_qty.val().replace(/[^0-9]/, "")) + 1;
                if(this_qty > stock) {
                    alert("재고수량 보다 많은 수량을 구매할 수 없습니다.");
                    this_qty = stock;
                }

                if(this_qty > max_qty) {
                    this_qty = max_qty;
                    alert("최대 구매수량은 "+number_format(String(max_qty))+" 입니다.");
                }

                $el_qty.val(this_qty);
                // 추가옵션 수량도 계산한다.
                var cnt = $(this).closest("li").siblings().size();
                var $_el = ''; // 다음 요소
                for(var i=0; i<cnt; i++){
                	$_el = $(this).closest("li").siblings().eq(i).find("input[name^=ct_qty]");
                	$_el.val(this_qty);
                }
                
                if(whoAreYou=='gn')
	                price_calculate();
	              else
	              	price_wholesale_calculate();
	              	
                break;

            case "감소":
                this_qty = parseInt($el_qty.val().replace(/[^0-9]/, "")) - 1;
                if(this_qty < min_qty) {
                    this_qty = min_qty;
                    alert("최소 구매수량은 "+number_format(String(min_qty))+" 입니다.");
                }
                $el_qty.val(this_qty);
                // 추가옵션 수량도 계산한다.
                var cnt = $(this).closest("li").siblings().size();
                var $_el = ''; // 다음 요소
                for(var i=0; i<cnt; i++){
                	$_el = $(this).closest("li").siblings().eq(i).find("input[name^=ct_qty]");
                	$_el.val(this_qty);
                }
                
                
								if(whoAreYou=='gn')
	                price_calculate();
	              else
	              	price_wholesale_calculate();
	              	
                break;

            case "삭제":
                if(confirm("선택하신 옵션항목을 삭제하시겠습니까?")) {
                    var $el = $(this).closest("li");
                    var del_exec = true;

                    if($("#sit_sel_option .sit_spl_list").size() > 0) {
                        // 선택옵션이 하나이상인지
                        if($el.hasClass("sit_opt_list")) {
                            if($(".sit_opt_list").size() <= 1)
                                del_exec = false;
                        }
                    }

                    if(del_exec) {
                        $el.closest("li").remove();
                        
                        if(whoAreYou=='gn')
					                price_calculate();
					              else
					              	price_wholesale_calculate();
                       
                    } else {
                        alert("선택옵션은 하나이상이어야 합니다.");
                        return false;
                    }
                }
                break;

            default:
                alert("올바른 방법으로 이용해 주십시오.");
                break;
        }
    });

    // 수량직접입력
    $(document).on("keyup", "input[name^=ct_qty]", function() {
        var val= $(this).val();

        if(val != "") {
            if(val.replace(/[0-9]/g, "").length > 0) {
                alert("수량은 숫자만 입력해 주십시오.");
                $(this).val(1);
            } else {
                var d_val = parseInt(val);
                if(d_val < 1 || d_val > 9999) {
                    alert("수량은 1에서 9999 사이의 값으로 입력해 주십시오.");
                    $(this).val(1);
                } else {
                    var stock = parseInt($(this).closest("li").find("input.io_stock").val());
                    if(d_val > stock) {
                        alert("재고수량 보다 많은 수량을 구매할 수 없습니다.");
                        $(this).val(stock);
                    }
                }
            }

            if(whoAreYou=='gn')
              price_calculate();
            else
            	price_wholesale_calculate();
        }
    });
});

// 선택옵션 추가처리
function sel_option_process(add_exec)
{
    var it_price = parseInt($("input#it_price").val());
    var id = "";
    var value, info, sel_opt, item, price, stock, run_error = false;
    var option = sep = "";
    info = $("select.it_option:last").val().split(",");

    $("select.it_option").each(function(index) {
        value = $(this).val();
        item = $(this).closest("tr").find("th label").text();
        if(item == ''){
        	item = $(this).closest("tr").prev().find("th label").text();
        }
//console.log('item : ' + item);
        if(!value) {
            run_error = true;
            return false;
        }

        // 옵션선택정보
        sel_opt = value.split(",")[0];

        if(id == "") {
            id = sel_opt;
        } else {
            id += chr(30)+sel_opt;
            sep = " / ";
        }

        option += sep + item + ":" + sel_opt;
    });

    if(run_error) {
        alert(item+"을(를) 선택해 주십시오.");
        return false;
    }

    price = info[1];
    stock = info[2];

    // 금액 음수 체크
    if(it_price + parseInt(price) < 0) {
        alert("구매금액이 음수인 상품은 구매할 수 없습니다.");
        return false;
    }

    if(add_exec) {
        if(same_option_check(option))
            return;

        add_sel_option(0, id, option, price, stock, '옵션');
    }
}

// 추가옵션 추가처리
function sel_supply_process($el, add_exec,flag)
{
    var val = $el.val();
    //console.log('abc : ' + $el.parent().parent().prev().find('th').text());
    var item = $el.parent().parent().prev().find('th').text();
    item = item.substring(1,item.length);
    
    //console.log('aa : ' + item);
    
    /*var itm0 = item.substring(0,1);
    console.log('itm0 : ' + itm0);
    var itm1 = item.substring(1,item.length);
    console.log('itm1 : ' + itm1);
    
    var item = '<span style="width:5px;height:5px;color:#d2c2dc;font-size:0.75em;">'+itm0+"</span>";
    item = item + itm1;
    console.log('item : ' + item);
    */
    //var item = $el.closest("dl").find("dd").text();
		
    if(!val) {
        alert(item+"을(를) 선택해 주십시오.");
        return;
    }

    var info = val.split(",");

    // 재고체크
    if(parseInt(info[2]) < 1) {
        alert(info[0]+"은(는) 재고가 부족하여 구매할 수 없습니다.");
        return false;
    }

    var id = item+chr(30)+info[0];
    var option = item+":"+info[0];
    var price = info[1];
    var stock = info[2];

    // 금액 음수 체크
    if(parseInt(price) < 0) {
        alert("구매금액이 음수인 상품은 구매할 수 없습니다.");
        return false;
    }

    if(add_exec) {
        if(same_option_check(option))
            return;

        add_sel_option(1, id, option, price, stock, flag);
    }
}

// 선택된 옵션 출력
function add_sel_option(type, id, option, price, stock, flag/*옵션/추가*/)
{
    var item_code = $("input[name='it_id[]']").val();
    var opt = "";
    var li_class = "sit_opt_list";
    if(type)
        li_class = "sit_spl_list";

    var opt_prc;
    if(parseInt(price) >= 0)
        opt_prc = "(+"+number_format(String(price))+"원)";
    else
        opt_prc = "("+number_format(String(price))+"원)";

		if(_file=='cart.php'){
			opt += "<li style='font-size: 0.75em;' class=\""+li_class+"\">";
	    opt += "<input type=\"hidden\" name=\"io_type["+item_code+"][]\" value=\""+type+"\">";
	    opt += "<input type=\"hidden\" name=\"io_id["+item_code+"][]\" value=\""+id+"\">";
	    opt += "<input type=\"hidden\" name=\"io_value["+item_code+"][]\" value=\""+option+"\">";
	    opt += "<input type=\"hidden\" class=\"io_price\" value=\""+price+"\">";
	    opt += "<input type=\"hidden\" class=\"io_stock\" value=\""+stock+"\">";
	    opt += "<span class=\"sit_opt_subj\">"+option+"</span>";
	    opt += "<span class=\"sit_opt_prc\">"+opt_prc+"</span></p>";
	    
	    if(flag=='옵션'){ // 선택옵션
		    opt += "<p style=\"text-align:right\">";
		    opt += "<input type=\"text\" name=\"ct_qty["+item_code+"][]\" value=\"1\" class=\"frm_input\" size='5'>";
		    opt += "<button type=\"button\" value=\"증가\" class=\"sit_qty_plus btn_frmline \">증가</button>";
		    opt += "<button type=\"button\" value=\"감소\" class=\"sit_qty_minus btn_frmline \">감소</button>";
		    opt += "<button type=\"button\" value=\"삭제\" class=\"btn_frmline \">삭제</button>";
		    opt += "</p></li>";
	    }else{ // 추가옵션
	    	opt += "<p style=\"text-align:right\">";
		    opt += "<input type=\"text\" name=\"ct_qty["+item_code+"][]\" value=\"1\" class=\"frm_input\" size='5'> 개";
		    opt += "<!--<button type=\"button\" value=\"증가\" class=\"sit_qty_plus btn_frmline \">증가</button>";
		    opt += "<button type=\"button\" value=\"감소\" class=\"sit_qty_minus btn_frmline \">감소</button>-->";
		    opt += "<button type=\"button\" value=\"삭제\" class=\"btn_frmline \">삭제</button>";
		    opt += "</p></li>";
	    }
		}else{
	    opt += "<li style=margin-bottom:15px; class=\""+li_class+"\">";
	    opt += "<input type=\"hidden\" name=\"io_type["+item_code+"][]\" value=\""+type+"\">";
	    opt += "<input type=\"hidden\" name=\"io_id["+item_code+"][]\" value=\""+id+"\">";
	    opt += "<input type=\"hidden\" name=\"io_value["+item_code+"][]\" value=\""+option+"\">";
	    opt += "<input type=\"hidden\" class=\"io_price\" value=\""+price+"\">";
	    opt += "<input type=\"hidden\" class=\"io_stock\" value=\""+stock+"\">";
	    opt += "<p style=margin-bottom:3px;clear:both;><span class=\"sit_opt_subj\">"+option+"</span>";
	    opt += "<span class=\"sit_opt_prc\">"+opt_prc+"</span></p>";
	    
	    if(flag=='옵션'){ // 선택옵션
	    
	    opt += "<p class=\"btn_group ea\" style=\"float:left;margin-bottom:5px;\"><button type=\"button\" value=\"감소\" class=\"sit_qty_minus btn_frmline button p_del qt_minus\"></button>";
	    opt += "<input type=\"text\" name=\"ct_qty["+item_code+"][]\" value=\"1\" class=\"frm_input\" style=\"display:inline-block;vertical-align:top;width:19px; height:15px; border:1px solid #ccc; text-align:center\">";
	    opt += "<button type=\"button\" value=\"증가\" class=\"sit_qty_plus btn_frmline button p_add qt_plus\"></button>";
	    opt += "<button type=\"button\" value=\"삭제\" class=\"sit_opt_del btn_frmline button delete\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>";
	    opt += "</p></li>";
	    
	    }else{ // 추가옵션
			opt += "<p class=\"btn_group ea\" style=\"float:left;margin-bottom:5px;\"><!--<button type=\"button\" value=\"감소\" class=\"sit_qty_minus btn_frmline button p_del qt_minus\"></button>-->";
	    opt += "<input type=\"text\" name=\"ct_qty["+item_code+"][]\" value=\"1\" class=\"frm_input\" style=\"display:inline-block;vertical-align:top;width:19px; height:15px; border:1px solid #ccc; text-align:center\">개";
	    opt += "<button type=\"button\" value=\"삭제\" class=\"sit_opt_del btn_frmline button delete\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>";
	    opt += "</p></li>";
			}	   
		
		}
//console.log('aa : ' + $("#sit_sel_option > ul").size());


    if($("#sit_sel_option > ul").size() < 1) {
        $("#sit_sel_option").html("<ul id=\"sit_opt_added\"></ul>");
        $("#sit_sel_option > ul").html(opt);
    } else{
        if(type) {
            if($("#sit_sel_option .sit_spl_list").size() > 0) {
                $("#sit_sel_option .sit_spl_list:last").after(opt);
            } else {
                if($("#sit_sel_option .sit_opt_list").size() > 0) {
                    $("#sit_sel_option .sit_opt_list:last").after(opt);
                } else {
                    $("#sit_sel_option > ul").html(opt);
                }
            }
        } else {
            if($("#sit_sel_option .sit_opt_list").size() > 0) {
                $("#sit_sel_option .sit_opt_list:last").after(opt);
            } else {
                if($("#sit_sel_option .sit_spl_list").size() > 0) {
                    $("#sit_sel_option .sit_spl_list:first").before(opt);
                } else {
                    $("#sit_sel_option > ul").html(opt);
                }
            }
        }
    }
		
		// 추가옵션이 추가될때 선택옵션이 있을경우
		// 그 개수를 생성된 추가옵션에 넣는다.
		try{
			$t1_el = $("#sit_sel_option > ul li:first p").find("input[name^=ct_qty]");
			console.log('t1_el : ' + $t1_el.val());
			$("#sit_sel_option > ul li:last p").find("input[name^=ct_qty]").val($t1_el.val());
		}catch(e){;}
		

    if(whoAreYou=='gn'){
      price_calculate();
    }
    else{
    	price_wholesale_calculate();
    }
}

// 동일선택옵션있는지
function same_option_check(val)
{
    var result = false;
    $("input[name^=io_value]").each(function() {
        if(val == $(this).val()) {
            result = true;
            return false;
        }
    });

    if(result)
        alert(val+" 은(는) 이미 추가하신 옵션상품입니다.");

    return result;
}

// 자바스크립트로 PHP의 number_format 흉내를 냄
// 숫자에 , 를 출력
function number_format(data)
{

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;

    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);

        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }

    if(sign != null)
        number = sign+number;

    return number;
}

// 가격계산
function price_calculate()
{
    var it_price = parseInt($("input#it_price").val());

    if(isNaN(it_price))
        return;

    var $el_prc = $("input.io_price");
    var $el_qty = $("input[name^=ct_qty]");
    var $el_type = $("input[name^=io_type]");
    var price, type, qty, total = 0;

    $el_prc.each(function(index) {
        price = parseInt($(this).val());
        qty = parseInt($el_qty.eq(index).val());
        type = $el_type.eq(index).val();

        if(type == "0") { // 선택옵션
            total += (it_price + price) * qty;
        } else { // 추가옵션
            total += price * qty;
        }
    });

    $(".total_price").empty().html("<span class=\"left_text\">총 금액 :</span><span id=\"sit_tot_price\" class=\"right_text\">"+number_format(String(total))+"원</span>");

}

// 가격계산
function price_wholesale_calculate()
{
		//var it_price = parseInt($("input#it_price").val());
		/*var it_wage = parseInt(no_comma(String($('#it_wage').text()).substr(0,String($('#it_wage').text()).length-1)));
		console.log('it_wage : ' + it_wage);
		*/
    var it_tt_rough_price = parseInt(no_comma(String($('input[name=tt_rough_price]').val()).substr(0,String($('input[name=tt_rough_price]').val()).length-1)));
		//console.log('it_tt_rough_price : ' + it_tt_rough_price);
		
		var it_price =  it_tt_rough_price;
		
		//console.log('it_price:' + it_price);
    
    /*if(typeof($('input[name=tt_rough_price]')) != 'undefined'){
			it_price += parseInt(no_comma(String($('input[name=tt_rough_price]').val()).substr(0,String($('input[name=tt_rough_price]').val()).length-1)));
		}
		*/
		
		/*
    if(isNaN(it_price)){
    	it_price = 0;// return;
		}
		*/
		
		
    var $el_prc = $("input.io_price");
    var $el_qty = $("input[name^=ct_qty]");
    var $el_type = $("input[name^=io_type]");
    var price, type, qty, total = 0;

console.log('io_price size() : ' + $el_qty.size());
    $el_prc.each(function(index) {
    		console.log('idx : ' + index);
    		
        price = parseInt($(this).val());
        qty = parseInt($el_qty.eq(index).val());
        type = $el_type.eq(index).val();
				
				if(isNaN(qty)) qty = 1;
				console.log('price : ' + price +'\nqty : ' + qty + '\ntype : ' + type);
				
        if(type == "0") { // 선택옵션
            total += (it_price + price) * qty;
        } else { // 추가옵션
            total += price * qty;
        }
        console.log('total 1 : ' + total);
    });
	/*
	console.log('aa : ' + $('input[name=tt_rough_price]'));
	return;
	
		if(typeof($('input[name=tt_rough_price]')) != 'undefined'){
			total += parseInt(no_comma(String($('input[name=tt_rough_price]').val()).substr(0,String($('input[name=tt_rough_price]').val()).length-1)));
		}
		*/

		if(total == 0 || isNaN(total)) total = it_price;
		total = Math.floor(total/10)*10;
    $(".total_price").empty().html("<span class=\"left_text\">총 예상금액 :</span><span id=\"sit_tot_price\" class=\"right_text\">"+number_format(String(total))+"원</span>");
		//console.log('aa : ' + typeof(document.fitem));
		if(typeof(document.fitem) != 'undefined'){
			document.fitem.total.value = total;
		}
}
// php chr() 대응
function chr(code)
{
    return String.fromCharCode(code);
}
// 지정자리 버림 (값, 자릿수) 
function Floor(n, pos){  
	var digits = Math.pow(10, pos); 
	var num = Math.floor(n * digits) / digits; 
	return num.toFixed(pos); 
}
