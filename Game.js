var game_content = [0,0,0,0,0,0,0,0,0,0];
const LINES = 10;



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

function change_player_selection()
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
    //check winner
}

function get_computer_selection()
{
    //minimax algorithm here 
    //use temporary array for game_content
    return selection
}

function game_changer()
{
    //change button name
    var selected_line = get_player_selection();
    change_game_content(selected_line, 2);
    computer_selected_line = get_computer_selection(); 
    change_game_content(computer_selected_line, 1);
    change_game_display();
    clear_selection_content(); 
    change_player_selection(); 
}