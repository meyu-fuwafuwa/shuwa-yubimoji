// JavaScript Document
let data = new Array();
data.push(["がんばる","きらい","すき","がんばる","わかります"]);
data.push(["たのしい","たのしい","がんばる","できない","できる"]);
data.push(["わかります","わかりません","わかります","できる","できない"]);
data.push(["わかりません","たのしい","わかりません","かなしい","できない"]);
data.push(["すき","きらい","がんばる","わかります","すき"]);
data.push(["きらい","すき","きらい","がんばる","わかりません"]);
data.push(["できる","わかります","できない","できる","わかりません"]);
data.push(["できない","すき","きらい","できる","できない"]);

let max = data.length; //問題数
let count; //現在の問題番号(0～max)
let point = 0; //正解数

//dataを並び変える
for(let i=0; i<100; i++){
	let a = rand(0,max);
	let b = rand(0,max);
	let tmp = new Array(5);
	tmp = data[a];
	data[a] = data[b];
	data[b] = tmp;
}

//時間計測用
let startTime;
let endTime;

let question = new Array(); //出題する問題の順番
let ans = new Array();// 答え
let res = new Array();//回答結果
for(let i=0; i < max; i++){
	question.push(i);
	for(let j=1; j<5; j++){
		if (data[i][0] == data[i][j]){
			ans.push(j);
		}
	}
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
	let word = data[count][0];
	
	let msg = "";
	msg = "<video src='./movie-shuwa2/"+word+".mp4'  poster='読み込み中.jpg' playsinline autoplay muted loop></video>";
	document.getElementById('q-video').innerHTML = msg;
	
	msg = "";
	for(let i=1; i<5; i++){
		msg = msg +  "<li><a href='javascript:Answer("+i+");' class='btn'>" + data[count][i] + "</a></li>";
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

















