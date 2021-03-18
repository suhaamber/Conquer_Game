var game_content = [0,0,0,0,0,0,0,0,0,0];
const LINES = 10;
const DEPTH = 2; 
const ALPHA = -Infinity; 
const BETA = Infinity; 
var start = false; 
const COMPUTER_TURN = 1;
const PLAYER_TURN = 2; 
const EMPTY = 0;
var computer_selection = -1; 

function change_game_display()
{
    for(let line_number=1; line_number<=LINES; line_number++)
    {
        let locate_image;
        switch(game_content[line_number-1])
        {
            case 1:
                if(line_number>=4 && line_number<=7)
                {
                    locate_image = "images\\computer_vertical.png";
                } 
                else
                {
                    locate_image = "images\\computer_horizontal.png";
                }
                document.getElementById(`line${line_number}`).src = locate_image; 
               break;
            case 2: 
                if(line_number>=4 && line_number<=7)
                {
                    locate_image = "images\\player_vertical.png";
                } 
                else
                {
                    locate_image = "images\\player_horizontal.png";
                }
                document.getElementById(`line${line_number}`).src = locate_image; 
                break;
        }

    }
    
}

function reset_player_selection()
{
    var selection = document.getElementById("selection");
    for(line_number=1; line_number<=LINES; line_number++)
    {
        if(game_content[line_number-1]==0)
        {
            var option = document.createElement("option");
            option.text = `${line_number}`;
            selection.add(option);
        }
    }
    
}

function get_player_selection()
{
    var selection = document.getElementById("selection");   
    var selected_line = Number(selection.options[selection.selectedIndex].text);
    return selected_line;
}

function clear_selection_content()
{
    var selection = document.getElementById("selection");
    while (selection.options.length > 0) {
        selection.remove(0);
    }
}

function change_game_content(selected_line, turn)
{
    game_content[selected_line-1]=turn;
    player_rooms = 0;
    for(i=0; i<3; i++)
    {
        if(game_content[i]==turn && game_content[i+3]==turn && game_content[i+4]==turn && game_content[i+7]==turn)
        {
            player_rooms++;
        }
    }
    if(player_rooms>=2)
    {
        if(turn==1)
        {
            alert("Computer wins.");
        }
        else
        {
            alert("Player wins.");
        }

    }    
}

function get_computer_selection()
{
    computer_selection = -1; 
    var test_game_content = [0,0,0,0,0,0,0,0,0,0];
    game_content.forEach(function(item, index, array){
        test_game_content[index] = item;
    }) 
    
    let selection = minimax(test_game_content, DEPTH, COMPUTER_TURN);
    if(game_content[computer_selection]!=0)
    {
        alert("Error.");    
    }
    return computer_selection;

}

function minimax(test_game_content, depth, turn)
{
    game_over = true;
  
    for(i=0; i<10; i++)
    {
        if(test_game_content[i]==0)
        {
            game_over = false; 
            break; 
        }
    }

    if(depth==0||game_over)
    {
        evaluation = evaluate(test_game_content);
        return evaluation;
    }

    else
    {
        if(turn==COMPUTER_TURN)
        {
            let i;
            var max_evaluation = -Infinity;
            for(i=0; i<LINES; i++)
            {
        
                if(test_game_content[i]==0)
                {
                    test_game_content[i] = turn; 
               
                    let current_evaluation = minimax(test_game_content, depth-1, PLAYER_TURN); 
                   
                    if(max_evaluation<current_evaluation)
                    {
                        max_evaluation = current_evaluation;
                        if(depth==DEPTH)
                        {
                            computer_selection = i;
                        }
                    }
                    
                    test_game_content[i]=0;
                }
            }
            return max_evaluation; 
        }

        if(turn==PLAYER_TURN)
        {
            let i;
            var min_evaluation = Infinity;
            for(i=0; i<LINES; i++)
            {
             
                if(test_game_content[i]==0)
                {
                    test_game_content[i] = turn; 
                  
                    current_evaluation = minimax(test_game_content, depth-1, COMPUTER_TURN); 
  
                    if(min_evaluation>current_evaluation)
                    {
                        min_evaluation = current_evaluation;  
                    }
              
                    test_game_content[i]=0;
                }
            }
            return min_evaluation; 
        }
    }
}

function evaluate(test_game_content)
{
    //???? how to evaluate 
    //using random for now
    random_evaluation = get_random_evaluation(-3, 3); 
    return random_evaluation;
}

function get_random_evaluation(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function game_changer()
{
    if(!start)
    {
        var this_button = document.getElementById("myButton");
        this_button.value = "Next move"; 
        this_button.innerHTML = "Next move";
        clear_selection_content(); 
        reset_player_selection();
        start = true; 
    }
    else 
    {
        var selected_line = get_player_selection();
        change_game_content(selected_line, 2);
        computer_selected_line = get_computer_selection(); 
        change_game_content(computer_selected_line+1, 1);
        change_game_display();
        clear_selection_content(); 
        reset_player_selection(); 
    }
}