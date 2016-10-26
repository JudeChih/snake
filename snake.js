var foods;


function table(input) {
    var self = this;
    var $input = $(input);
    
    // 組貪食蛇的地圖
    var divstr = "";
    
   
    var snakePosition = thisSnake.returnPosition();
    
    
    for (var i = 0; i < 30; i++){
        var divstr2 = "";
        
        for (var j = 0; j < 30; j++){
            var snakestr = "";
            var foodPosition = ""
            divstr2 = divstr2 + "<div class='level2 " + snakestr + foodPosition + "'></div>";
        }
        divstr = divstr + "<div class='level1 clearfix'>" + divstr2 + "</div>";
    }
    $input.append(divstr); 
    
    // 產生蛇的位置
    self.changeSnakePosition = function(s){
        $(".snake").removeClass("snake");
        $(s).each(function(i,e){
            $(".level1").eq(e[1]).find(".level2").eq(e[0]).addClass("snake");
        });
        
    }
    this.changeSnakePosition(snakePosition);
    
    self.changefood = function(){
        foods = food(); // 食物的座標
        $(".food").removeClass("food");
        if ($(".level1").eq(foods[1]).find(".level2").eq(foods[0]).hasClass("snake")){
            foods = food();
        } else {
            $(".level1").eq(foods[1]).find(".level2").eq(foods[0]).addClass("food");
        }
    }
    
    this.changefood();
    
    self.getFoodPosition = function(){
        return foods;
    }

    
};
function food(){
    var self = this;
    var x = Math.floor(Math.random()*30);
    var y = Math.floor(Math.random()*30); 
    var snake = thisSnake.returnPosition();
    var n;
    $.each(snake, function(i,e){
       if (snake[i][0] == x && snake[i][1] == y){
           food();
       }
       else{
           n = [x, y]
       }
    });
    
    return n;
};

function snake(){
    var self = this;
    var position = [[1,1],[2,1],[3,1]];
    var direction = 39;
    var aaa = true;
    var bbb = true;
    self.changePosition = function(){
        snakeLength = position.length;
        var lastPosition = position[snakeLength - 1];
        var newPosition
        
        if (direction ==  39){
            newPosition = [lastPosition[0]+1, lastPosition[1]];
            if (newPosition[0] == 30){
                newPosition = [0,newPosition[1]];
            }
            $.each(position, function(i,e){
               if (position[i][0] == newPosition[0] && position[i][1] == newPosition[1]){
                   alert("吃到自己嚕");
                   location.reload();
               }
            });
            position.push(newPosition);
        } 
        else if (direction == 37){
            newPosition = [lastPosition[0]-1, lastPosition[1]];
            if (newPosition[0] == -1){
                newPosition = [29,newPosition[1]];
            }
            $.each(position, function(i,e){
               if (position[i][0] == newPosition[0] && position[i][1] == newPosition[1]){
                   alert("吃到自己嚕");
                   location.reload();
               }
            });
            position.push(newPosition);
        } 
        else if (direction == 38){
            newPosition = [lastPosition[0], lastPosition[1]-1];
            if (newPosition[1] == -1){
                newPosition = [newPosition[0],29];
            }
            $.each(position, function(i,e){
               if (position[i][0] == newPosition[0] && position[i][1] == newPosition[1]){
                   alert("吃到自己嚕");
                   location.reload();
               }
            });
            position.push(newPosition);
        } 
        else if (direction == 40){
            newPosition = [lastPosition[0], lastPosition[1]+1];
            if (newPosition[1] == 30){
                newPosition = [newPosition[0],0];
            }
            $.each(position, function(i,e){
               if (position[i][0] == newPosition[0] && position[i][1] == newPosition[1]){
                   alert("吃到自己嚕");
                   location.reload();
               }
            });
            position.push(newPosition);
        }
        
        if (position.length == 10 && aaa == true){
            self.changeSpeed(window.test,60);
            aaa = false;
        }
        
        if (position.length == 30 && bbb == true){
            self.changeSpeed(window.test, 60);
            bbb = false;
        }
            
        
        
        a.changeSnakePosition(position);

        if (newPosition[0] == a.getFoodPosition()[0] && newPosition[1] == a.getFoodPosition()[1]){
            a.changefood();
        } else {
            position.splice(0, 1);
        }
        
    }
    
    self.changeDirection = function(dire){
        switch (dire) {
            case 38:
                direction = 38;  // top
                break;
            case 40:
                direction = 40;  // down
                break;
            case 37:
                direction = 37;  // left
                break;
            case 39:
                direction = 39;  // right
                break;
        }
    }
    
    self.returnPosition = function(){
        return position;
    }
    
    self.getDirection = function(){
        return direction;
    }
    
 
    self.changeSpeed = function(e ,s){
        clearInterval(e);
        e =  window.setInterval(thisSnake.changePosition,s);
    }
};

$(function(){
    var pressed = false; 
    
    thisSnake = new snake();
    a = new table(document.getElementById("wrapper"));
    
    
    
    $(window).keydown(function(e){
        var flg = false;
        var direc = thisSnake.getDirection();
        
        if( pressed === true ) { //Already pressed don't allow another press
            return false;
        }
        
        pressed = true;
        setTimeout(function() { pressed = false }, 0);
        
        if (direc == 37 || direc == 39) {
            if (e.keyCode == 37 || e.keyCode == 39){
                flg = true;
            }
        }
        if (direc == 38 || direc == 40) {
            if (e.keyCode == 38 || e.keyCode == 40){
                flg = true;                                                                                                         
            }                                                                                                                                                                    
        }  
        if (!flg){
            thisSnake.changeDirection(e.keyCode);
        }
    });
    window.test =  window.setInterval(thisSnake.changePosition,60);
});


                                                                                                                                                                                                                                                                                                                                       