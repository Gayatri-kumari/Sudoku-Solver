function isSafe(num,matrix,row,col){
    var j,k;

    for(j=0;j<9;j++){
        if(matrix[row][j]==num)
            return false;
    }

    for(j=0;j<9;j++){
        if(matrix[j][col]==num)
            return false;
    }

    var startR=row-row%3;
    var startC=col-col%3;
    var endR=startR+2;
    var endC=startC+2;

    for(k=startR;k<endR+1;k++){
        for(j=startC;j<endC+1;j++){
            if(matrix[k][j]==num)
            	return false;
    	}
    }
    return true;
}


function solve(matrix,empty,level,changes){

	if(level==empty.length){
		return 0;
	}

	var pos=empty[level];
    var row=pos[0];
    var col=pos[1];
    var i;

    for(i=1;i<10;i++){

        if(isSafe(i,matrix,row,col)){
            matrix[row][col]=i;
            changes.push(['c'+row+col,i])
            var ret=solve(matrix,empty,level+1,changes);

            if(ret==0){
                return 0;
            }
        }
    }

    matrix[row][col]=0;
    changes.push(['c'+row+col,0])
    return -1;
}

function isValid(matrix){
    var i,j,k,row,col,zero,setr,setc,setb;

    for(row=0;row<9;row++){
        zero=0;
        setr=new Set();

        for(col=0;col<9;col++){
            if(matrix[row][col]==0)
                zero+=1;
            else
                setr.add(matrix[row][col]);
        }
        if((setr.size+zero)!=9)
            return false;
    }      

    for(col=0;col<9;col++){
        zero=0;
        setc=new Set();

        for(row=0;row<9;row++){
            if(matrix[row][col]==0)
                zero+=1;
            else
                setc.add(matrix[row][col]);
        }
        if((setc.size+zero)!=9)
            return false;
    }     

    check=[[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]]

    for(i=0;i<9;i++){
        row=check[i][0]
        col=check[i][1]
        zero=0
        setb=new Set();

        for(j=row;j<row+3;j++){
            for(k=col;k<col+3;k++){
                if(matrix[j][k]==0)
                    zero+=1;
                else
                    setb.add(matrix[j][k]);
            }
        }
        if((setb.size+zero)!=9){
            return false;        
        }
    }
    return true;
}

function show(changes){
    if(changes.length==0)
        return;
    document.getElementById(changes[0][0]).innerHTML=changes[0][1];
    changes.shift();    
    setTimeout(function()
    {
        show(changes);
    },10);
}

function display(){

    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(document.getElementById('c'+i+j).innerHTML!=""){
                matrix[i][j]=parseInt(document.getElementById('c'+i+j).innerHTML);
            }
            else{
                matrix[i][j]=0;
            }
        }
    }
    empty=[];
    changes=[];
    if(isValid(matrix)){
        for(i=0;i<9;i++){
            for(j=0;j<9;j++){
                if(matrix[i][j]==0){
                    empty.push([i,j]);
                }
            }
        }
        solve(matrix,empty,0,changes);
        show(changes);
    }
    else{
        alert("invalid configuration");
    }
}


function cl(clicked) {  
    clickedId=clicked;
} 


function pick(num){
    if(clickedId!=null){
        if(num==0)
            document.getElementById(clickedId).innerHTML="";
        else
            document.getElementById(clickedId).innerHTML=num;
    }
}


var clickedId;
var changes=[];
var empty=[];
var matrix = [];
for(var i=0; i<9; i++) {
    matrix[i] = [];
    for(var j=0; j<9; j++) {
        matrix[i][j] =0;
    }
}
