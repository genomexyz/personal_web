history_move = []
sedang_proses = false
start_game = false
you_score = 0
com_score = 0

function pick_board(board_num) {
    if (sedang_proses == true) {
        return 'JANGAN DI GANGGU'
    }

    board_num = parseInt(board_num)
    if (isNaN(board_num)) {
        return 'invalid move'
    }
    console.log('check board', board_num, history_move)
    //sanitize input
    //no repeated input
    if (history_move.includes(board_num)) {
        sedang_proses = false
        return 'invalid move'
    }

    if (!start_game) {
        return 'invalid game'
    }

    history_move.push(board_num)

    sedang_proses = true
    var move_now = ''
    for (var i = 0; i < history_move.length; i++) {
        move_now += history_move[i].toString()
    }
    console.log(move_now)

    document.getElementById('box'+board_num.toString()).innerHTML = 'O'

    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var alldata = this.responseText

            if (this.responseText == 'invalid param') {
                console.log('terjadi kesalahan')
                history_move = []
                for (var ii = 1; ii < 10; ii++) {
                    document.getElementById('box'+ii).innerHTML = ''
                    document.getElementById('box'+ii).className = 'box'
                }
                sedang_proses = false;
                return 'invalid req';
              }

            var alldata_json = JSON.parse(alldata)
            var condition = alldata_json['condition']
            var all_move = alldata_json['next_move']

            console.log(condition, all_move)
            if (condition == 'ongame') {
                var com_move = all_move[all_move.length-1]
                document.getElementById('box'+com_move).innerHTML = 'X'
                history_move.push(parseInt(all_move[all_move.length-1]))
                move_now = all_move
            } else if (condition == 'player win') {
                //collect all player move and mark it
                console.log('eksekusi ini', history_move)
                for (var ii = 0; ii < history_move.length; ii++) {
                    if (!(ii % 2)) {
                        document.getElementById('box'+history_move[ii]).className = 'box win'
                    }
                }
                start_game = false

                document.getElementById('status_game').innerHTML = 'Start Game Again?'
                document.getElementById('status_game_up').innerHTML = 'You Win'
                you_score += 1
            } else if (condition == 'player lose') {
                //collect all com move and mark it
                if (all_move != '') {
                    var com_move = all_move[all_move.length-1]
                    document.getElementById('box'+com_move).innerHTML = 'X'
                    history_move.push(parseInt(all_move[all_move.length-1]))
                }
                console.log('check kekalahan', all_move.length, all_move)
                for (var ii = 0; ii < history_move.length; ii++) {
                    if ((ii % 2)) {
                        console.log('ini mark akhir','box'+com_move)
                        document.getElementById('box'+history_move[ii]).className = 'box win'
                    }
                }
                start_game = false
                document.getElementById('status_game').innerHTML = 'Start Game Again?'
                document.getElementById('status_game_up').innerHTML = 'You Lose'
                com_score += 1
            } else if (condition == 'draw') {
                document.getElementById('status_game').innerHTML = 'Start Game Again?'
                document.getElementById('status_game_up').innerHTML = 'Draw'
                start_game = false
            } else {
                console.log('terjadi kesalahan')
                history_move = []
                for (var ii = 1; ii < 10; ii++) {
                    document.getElementById('box'+ii).innerHTML = ''
                    document.getElementById('box'+ii).className = 'box'
                }
                document.getElementById('status_game_up').innerHTML = 'error'
            }
            sedang_proses = false
            document.getElementById("you_score").innerHTML = you_score
            document.getElementById("com_score").innerHTML = com_score
        }
    }

    //console.log('check sending', move_now)
    xhttp.open("GET", "/com/think1/"+move_now, true);
    xhttp.send();
}

function init_game() {
    history_move = []
    for (var ii = 1; ii < 10; ii++) {
        document.getElementById('box'+ii).innerHTML = ''
        document.getElementById('box'+ii).className = 'box'
    }
    document.getElementById('status_game').innerHTML = 'Repeat?'
    document.getElementById('status_game_up').innerHTML = 'ongame'
    start_game = true
}
