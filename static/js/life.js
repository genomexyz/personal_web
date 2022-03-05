chance_life = 0.1
iter_life = 0
//all_alive_cell = []
position_alive = {}
var id_evalute_life

function start_life() {
    console.log('start a life')
    init_life()
    document.body.classList.add("loading");
    document.getElementById("life_btn").innerHTML = "Stop the Life"
    document.getElementById("life_btn").onclick = function() { stop_life() };
    id_evalute_life = setInterval(evaluate_life, 100);
}

function stop_life() {
    console.log('stop a life')
    document.body.classList.remove("loading");
    for (var life_i = 0; life_i < 3200; life_i++) {
        var idx = life_i
        //check position
        var idx_row = parseInt(idx / 80)
        var idx_column = idx % 80
        var key_alive = idx_row.toString()+','+idx_column.toString()
        position_alive[key_alive] = false

        document.getElementById("box_life"+(idx+1)).classList.remove("alive")
    }
    document.getElementById("life_btn").innerHTML = "Start the Life"
    document.getElementById("life_btn").onclick = function() { start_life() };

    clearInterval(id_evalute_life)
    iter_life = 0
    document.getElementById("the_life_iter").innerHTML = iter_life
}

function init_life() {
    for (var life_i = 0; life_i < 3200; life_i++) {
        var idx = life_i
        var life_rng = Math.random()
        //check position
        var idx_row = parseInt(idx / 80)
        var idx_column = idx % 80
        var key_alive = idx_row.toString()+','+idx_column.toString()
        if (life_rng < chance_life) {
            //all_alive_cell.push(idx)
            document.getElementById("box_life"+(idx+1)).classList.add("alive")
            position_alive[key_alive] = true
        } else {
            position_alive[key_alive] = false
        }
    }
}

function evaluate_life() {
    for (var life_i = 0; life_i < 3200; life_i++) {
        var idx = life_i
        var idx_row = parseInt(idx / 80)
        var idx_column = idx % 80
        var key_check = idx_row.toString()+','+idx_column.toString()

        var total_n = check_total_alive_n(idx_row, idx_column)

        if (position_alive[key_check] && total_n < 2) {
            document.getElementById("box_life"+(idx+1)).classList.remove("alive")
            position_alive[key_check] = false
        } else if ((position_alive[key_check] && total_n >= 2) && total_n <= 3) {

        } else if (position_alive[key_check] && total_n > 3) {
            document.getElementById("box_life"+(idx+1)).classList.remove("alive")
            position_alive[key_check] = false
        } else if (!position_alive[key_check] && total_n==3) {
            document.getElementById("box_life"+(idx+1)).classList.add("alive")
            position_alive[key_check] = true
        }

        
    }
    iter_life++
    document.getElementById("the_life_iter").innerHTML = iter_life
}

function check_total_alive_n(row_idx, column_idx) {
    var total_alive_neighboor = 0
    
    //top left neighboor
    var n_idx_row = row_idx-1
    var n_idx_column = column_idx-1
    var key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //top neighboor
    n_idx_row = row_idx-1
    n_idx_column = column_idx
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //top right neighboor
    n_idx_row = row_idx-1
    n_idx_column = column_idx+1
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //left neighboor
    n_idx_row = row_idx
    n_idx_column = column_idx-1
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //right neighboor
    n_idx_row = row_idx
    n_idx_column = column_idx+1
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //bottom left neighboor
    n_idx_row = row_idx+1
    n_idx_column = column_idx-1
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //bottom neighboor
    n_idx_row = row_idx+1
    n_idx_column = column_idx
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    //bottom right neighboor
    n_idx_row = row_idx+1
    n_idx_column = column_idx+1
    key_check_n = n_idx_row.toString()+','+n_idx_column.toString()
    if (typeof position_alive[key_check_n] !== "undefined") {
        if (position_alive[key_check_n]) {
            total_alive_neighboor++
        }
    }

    return total_alive_neighboor

}