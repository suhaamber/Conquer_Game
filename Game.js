var game_content = [0,0,0,0,0,0,0,0,0,0];
const LINES = 10;



function change_game_content(game_content)
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
    game_content[0]=1;
}

function change_player_selection(game_content)
{
    var x = document.getElementById("selection");
    for(line_number=1; line_number<=LINES; line_number++)
    {
        if(game_content[line_number-1]==0)
        {
            var option = document.createElement("option");
            option.text = `${line_number}`;
            x.add(option);
        }
    }
    
}

function get_player_selection()
{
    
}

function game_changer()
{
    get_player_selection();
    change_game_content(game_content);
    alert(game_content);
    change_player_selection(game_content); 
}