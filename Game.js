var game_content = [0,0,0,0,0,0,0,0,0,0];
var rooms = [    { 1:0, 4:0, 5:0, 8:0 }, 
    { 2:0, 5:0, 6:0, 9:0 },
    { 3:0, 6:0, 7:0, 10:0 } ];
var room_winner = {0:0, 1:0, 2:0 };

const LINES = 10;
const DEPTH = 2; 
const COMPUTER_TURN = 1;
const PLAYER_TURN = 2; 

var computer_selection = -1; 
var start = false; 
var lines_selected = 0;
var new_winner = 0; 

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

    //change rooms
    rooms.forEach(room => {
        for (var line in room)
        {
            if(line==selected_line && room[line]==0)
                {
                    room[line] = turn; 
                }
        }
    });
}

function check_room_winners(turn)
{
    for(var room in room_winner)
    {
        if(room_winner[room]==0)
        {
            var lines_complete = 0; 
            var temp_room = rooms[room];
            for(var key in temp_room)
            {
                if(temp_room[key]!=0)
                {
                    lines_complete++;
                }
                else 
                {
                    break;
                }
            }
            if(lines_complete==4)
            {
                room_winner[room]=turn; 
                if(turn==PLAYER_TURN)
                    alert("You have conquered room " + (Number(room)+1));
                else 
                    alert("I have conquered room " + (Number(room)+1));
            }
        }
    } 
}

function get_computer_selection()
{
    
    computer_selection = -1; 
    //copied successfully 
    var temporary_game_content = [...game_content]; 

    //yes
    var temporary_rooms = [{}, {}, {}];
    var i = -1; 
    rooms.forEach(room => {
        i++; 
        for(var line in room)
        {
            temporary_rooms[i][line] = room[line];
        }
    });

    //copied successfully
    var temporary_room_winner = {};
    for(var key in room_winner)
    {
        temporary_room_winner[key] = room_winner[key];
    }

    let selection = minimax(temporary_game_content, temporary_rooms, temporary_room_winner, DEPTH, COMPUTER_TURN);
    if(game_content[computer_selection]!=0)
    {
        alert("Error.");    
    }
    return computer_selection;

}

function minimax(test_game_content, test_rooms, test_room_winner, depth, turn) 
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
        evaluation = evaluate(test_room_winner); 
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
                    //
                    var new_game_content = [...test_game_content]; 
                    new_game_content[i] = turn; 
                    //???
                    var j = -1; 
                    var new_rooms = [{}, {}, {}];
                    test_rooms.forEach(room => {
                        j++; 
                        for(var line in room)
                        {
                            new_rooms[j][line] = room[line];
                        }
                    });
                    //copied successfully
                    var new_room_winner = {};
                    for(var key in test_room_winner)
                    {
                        new_room_winner[key] = test_room_winner[key];
                    }

                    new_rooms.forEach(room => {
                        for (var line in room)
                        {
                            if(line==(i+1) && room[line]==0)
                                {
                                    room[line] = turn; 
                                }
                        }
                    });

                    for(var room in new_room_winner)
                    {
                        if(new_room_winner[room]==0)
                        {
                            var lines_complete = 0; 
                            var temp_room = new_rooms[room];
                            for(var key in temp_room)
                            {
                                if(temp_room[key]!=0)
                                {
                                    lines_complete++;
                                }
                                else 
                                {
                                    break;
                                }
                            }
                            if(lines_complete==4)
                            {
                                new_room_winner[room]=turn; 
                            }
                        }
                    }
                    
                    let current_evaluation = minimax(new_game_content, new_rooms, new_room_winner, depth-1, PLAYER_TURN); 
                   
                    if(max_evaluation<current_evaluation)
                    {
                        max_evaluation = current_evaluation;
                        if(depth==DEPTH)
                        {
                            computer_selection = i;
                        }
                    }            
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
                    //
                    var new_game_content = [...test_game_content]; 
                    new_game_content[i] = turn; 
                    //???
                    var j = -1; 
                    var new_rooms = [{}, {}, {}];
                    test_rooms.forEach(room => {
                        j++; 
                        for(var line in room)
                        {
                            new_rooms[j][line] = room[line];
                        }
                    });
                    //copied successfully
                    var new_room_winner = {};
                    for(var key in test_room_winner)
                    {
                        new_room_winner[key] = test_room_winner[key];
                    }

                    new_rooms.forEach(room => {
                        for (var line in room)
                        {
                            if(line==(i+1) && room[line]==0)
                                {
                                    room[line] = turn; 
                                }
                        }
                    });

                    for(var room in new_room_winner)
                    {
                        if(new_room_winner[room]==0)
                        {
                            var lines_complete = 0; 
                            var temp_room = new_rooms[room];
                            for(var key in temp_room)
                            {
                                if(temp_room[key]!=0)
                                {
                                    lines_complete++;
                                }
                                else 
                                {
                                    break;
                                }
                            }
                            if(lines_complete==4)
                            {
                                new_room_winner[room]=turn; 
                            }
                        }
                    }
                     
                    let current_evaluation = minimax(new_game_content, new_rooms, new_room_winner, depth-1, PLAYER_TURN); 

                    if(min_evaluation>current_evaluation)
                    {
                        min_evaluation = current_evaluation;  
                    }
            
                }
            }
            return min_evaluation; 
        }
    }
}

function evaluate(test_room_winner)
{
    var computer_rooms = 0, player_rooms = 0; 
    for(var room in test_room_winner)
    {
        if(test_room_winner[room] == PLAYER_TURN)
            player_rooms++;
        else
            computer_rooms++; 
    }
    evaluation = computer_rooms - player_rooms; 
    return evaluation;
}

function get_random_evaluation(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function check_winner()
{
    var computer_rooms = 0, player_rooms = 0; 
    for(var room in room_winner)
    {
        if(room_winner[room] == PLAYER_TURN)
            player_rooms++;
        else
            computer_rooms++; 
    }

    if(player_rooms>computer_rooms)
    {
        alert("You are the conqueror!");
    }
    else
    {
        alert("I am the conqueror!");
    }
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
        lines_selected++;
        var selected_line = get_player_selection();
        change_game_content(selected_line, PLAYER_TURN);
        change_game_display(); 
        check_room_winners(PLAYER_TURN); 
        computer_selected_line = get_computer_selection();
        lines_selected++;
        change_game_content(computer_selected_line+1, COMPUTER_TURN);
        change_game_display();
        check_room_winners(COMPUTER_TURN);  
        clear_selection_content(); 
        reset_player_selection(); 
        if(lines_selected==LINES)
        {
            check_winner();
        }    
    }
}