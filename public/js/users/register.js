$(document).ready(function(){
	$("#name").on('blur', function(){
		var name = $(this).val().trim();
		if(name == ''){
			$("#show_register_issue").html("昵称还没填写");
			$("#show_register_issue").show();
			return false;
		}else{
			if(name.length < 2){
				$("#show_register_issue").html("昵称过短，请保证在2-16位");
				$("#show_register_issue").show();
				return false;
			}else if(name.length > 16){
				$("#show_register_issue").html("昵称过长,请保证在2-16位");
				$("#show_register_issue").show();
				return false;
			}else if(!checkNick(name)){
				$("#show_register_issue").html("昵称应由下划线_、数字和中英文组成,不能包含特殊符号。");
				$("#show_register_issue").show();
				return false;
			}else{
				$("#show_register_issue").html("");
				$("#show_register_issue").hide();
				return false;
			}
		}
	});
	$("#email").on('blur', function(){
		var email = $(this).val().trim();
		if(email == ''){
			$("#show_register_issue").html("邮箱还没填写");
			$("#show_register_issue").show();
			return false;
		}else if(!checkEmail(email)){
			$("#show_register_issue").html("请输入正确的邮箱");
			$("#show_register_issue").show();
			return false;
		}else{
			$("#show_register_issue").hide();
		}
	});
	$("#register_btn").on('click', function(){
		var name                  = $("#name").val().trim();
		var email                 = $("#email").val().trim();
		var password              = $("#password").val().trim();
		var password_confirmation = $("#password_confirmation").val().trim();
		if(name == ''){
			$("#name").focus();
			$("#show_register_issue").html("昵称还没填写");
			$("#show_register_issue").show();
			return false;
		}else{
			if(name.length < 2){
				$("#name").focus();
				$("#show_register_issue").html("昵称过短，请保证在2-16位");
				$("#show_register_issue").show();
				return false;
			}else if(name.length > 16){
				$("#name").focus();
				$("#show_register_issue").html("昵称过长,请保证在2-16位");
				$("#show_register_issue").show();
				return false;
			}
			if(!checkNick(name)){
				$("#name").focus();
				$("#show_register_issue").html("昵称应由下划线_、数字和中英文组成,不能包含特殊符号。");
				$("#show_register_issue").show();
				return false;
			}
		}
		if(email == ''){
			$("#email").focus();
			$("#show_register_issue").html("邮箱还没填写");
			$("#show_register_issue").show();
			return false;
		}else{
			if(!checkEmail(email)){
				$("#email").focus();
				$("#show_register_issue").html("请输入正确的邮箱");
				$("#show_register_issue").show();
				return false;
			}
		}
		if(password == ''){
			$("#password").focus();
			$("#show_register_issue").html("密码还没填写");
			$("#show_register_issue").show();
			return false;
		} else {
			if(password.length < 6){
				$("#password").focus();
				$("#show_register_issue").html("密码过短,请保证在6-20位");
				$("#show_register_issue").show();
				return false;
			}else if(password.length > 20){
				$("#password").focus();
				$("#show_register_issue").html("密码过长,请保证在6-20位");
				$("#show_register_issue").show();
				return false;
			}else if(!checkPassword(password)){
				$("#password").focus();
				$("#show_register_issue").html("请输入有效的密码");
				$("#show_register_issue").show();
				return false;
			}else{
				$("#show_register_issue").hide();
			}
			if(password_confirmation == ''){
				$("#password_confirmation").focus();
				$("#show_register_issue").html("确认密码还没填写");
				$("#show_register_issue").show();
				return false;
			}
			if(password != password_confirmation){
				$("#password_confirmation").focus();
				$("#show_register_issue").html("两次密码填写不一致~");
				$("#show_register_issue").show();
				return false;
			}
		}
		$("#register_btn").html("正在注册...");
		$("#register_btn").attr("disabled", "disabled");
		$.ajax({
			url:APP+"/user/checkemail",
			type :'post',
			dataType:'json',
			async:false,
			data :{'email':email, '_token':$('meta[name="_token"]').attr('content')},
			success:function(data){
				if(data.status == 'success'){
					if(data.data > 0){
						$("#email").focus();
						$("#show_register_issue").html("该邮箱已经注册过了,请您更换其他邮箱");
						$("#show_register_issue").show();
						$("#register_btn").html("点击注册");
						$("#register_btn").attr("disabled", false);
						return false;
					}
					$("#registerForm").submit();
				}else if(data.status == 'error'){
					$("#show_register_issue").html(data.message);
					$("#show_register_issue").show();
					return false;
				}
			}
		});	
	});
});
function checkNick(nickname){
	if(nickname == ''){
		return false;
	}
	var nick_pattern = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,16}$/;
	if(!nick_pattern.test(nickname)){
		return false;
	}
	return true;
}

function checkEmail(email){
	if(email == ''){
		return false;
	}
	var email_pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!email_pattern.test(email)){
		return false;
	}
	return true;
}

function checkPassword(password){
	if(password == ''){
		return false;
	}
	var password_pattern = /[\w\d]+/;
	if(!password_pattern.test(password)){
		return false;
	}
	return true;
}
