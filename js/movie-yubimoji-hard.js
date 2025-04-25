// JavaScript Document


let max = 10; //問題数
let count; //現在の問題番号(0～max)
let point = 0; //正解数

//時間計測用
let startTime;
let endTime;

let question = new Array();
let ans = new Array();
let res = new Array();
for(let i=0; i < max; i++){
	let r = 0;
	let a = true;
	while(a){
		a = false;
		r = rand(0,data.length);
		for(let j=0;j<question.length; j++){
			if(r == question[j]) a = true;
		}
	}
	question.push(r);
	ans.push(rand(0,4));
	res.push(0);
}
	
/*************************************
rand
i以上　j未満
*************************************/
function rand(i,j){
    return Math.floor( Math.random() * (j-i) ) + i;
}
/*************************************
start
スタートボタン押下
*************************************/
function start(){
	$('#start').fadeOut(500,function(){	
		$('#question').fadeIn(500);
	});
	count = 0;
	questionSet();
	startTime = Date.now();
}
/*************************************
questionSet
問題セット
*************************************/
function questionSet(){
	document.getElementById('q-h2').textContent = "Q" + (count+1);
	let word = data[question[count]][ans[count]];
	
	let msg = "";
	msg = "<video src='./movie-yubimoji-hard/"+word+".mp4'  poster='読み込み中.jpg' playsinline autoplay muted loop></video>";
	document.getElementById('q-video').innerHTML = msg;
	
	msg = "";
	for(let i=0; i<data[question[count]].length; i++){
		msg = msg +  "<li><a href='javascript:Answer("+i+");' class='btn'>" + data[question[count]][i] + "</a></li>";
	}
	document.getElementById('a-list').innerHTML = msg;
}

function Answer(yourans){
	if(yourans == ans[count]){
	   	//alert("正解です！");
		point++;
		res[count] = 1;
	}else{
		//alert("残念、不正解です…");
	}
	count++;
	if(count < max){ // 問題がまだ続く
		$('#question').fadeOut(500,function(){
			questionSet();
			$('#question').fadeIn(500);
		});
	}else{ //問題終了。結果画面を出す。
		$('#question').fadeOut(500,function(){
			$('#result').fadeIn(500);
		});
		endTime = Date.now();
		
		let msg = "";
		msg = msg + "あなたは " + max +"問中<span>" + point + "</span>問正解しました。";
		msg = msg + "<br>かかった時間は" + (endTime - startTime)/1000+"秒でした";
		document.getElementById('r-msg').innerHTML = msg;
		
		msg = "<tr><th>番号</th><th>問題</th><th>正誤</th></tr>";
		for(let i = 0; i<count; i++){
			msg = msg + "<tr>";
			msg = msg + "<td>" + (i+1) + "</td>";
			msg = msg + "<td>" + data[question[i]][ans[i]] + "</td>";
			if(res[i] == 1 ) msg = msg + "<td>○</td>";
			else msg = msg + "<td>×</td>";
			msg = msg + "</tr>";
		}
		document.getElementById('r-table').innerHTML = msg;
		
	}
	
}














