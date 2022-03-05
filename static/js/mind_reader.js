mulai = false
ronde = 0
pilihan = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"]
box1 = []
box2 = []
box3 = []

function shuffleArray(array) {
    kembalian = array.slice();
    for (var i = kembalian.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = kembalian[i];
        kembalian[i] = kembalian[j];
        kembalian[j] = temp;
    }
    return kembalian
}

function start_mind_reading() {
    if (mulai) {
        return "sudah mulai"
    }
    mulai = true

    document.getElementById('show_board').className = 'show'
    ronde = 1
    document.getElementById('keterangan_reader').innerHTML = 'ronde '+ronde
    acak_pilihan = shuffleArray(pilihan)

    box1 = []
    for (var i = 0; i < 7; i++) {
        box1.push(acak_pilihan[i])
    }

    box2 = []
    for (var i = 7; i < 14; i++) {
        box2.push(acak_pilihan[i])
    }

    box3 = []
    for (var i = 14; i < 21; i++) {
        box3.push(acak_pilihan[i])
    }

    var show_box1 = shuffleArray(box1)
    var show_box2 = shuffleArray(box2)
    var show_box3 = shuffleArray(box3)

    var option_box_1 = show_box1.join("<br>")
    var option_box_2 = show_box2.join("<br>")
    var option_box_3 = show_box3.join("<br>")

    document.getElementById('reader_box1').innerHTML = option_box_1
    document.getElementById('reader_box2').innerHTML = option_box_2
    document.getElementById('reader_box3').innerHTML = option_box_3

}

function choose_region(opsi) {

    if (ronde == 3) {
        tebak(opsi)
        return "hasil"
    }

    var container = []
    if (opsi == 1) {
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
    } else if (opsi == 2) {
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
    } else if (opsi == 3) {
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
    }

    box1 = []
    box2 = []
    box3 = []
    for (var i = 0; i < container.length; i++) {
        var urutan = i+1
        var mod = urutan%3

        if (mod == 0) {
            box3.push(container[i])
        } else if (mod == 1) {
            box1.push(container[i])
        } else if (mod == 2) {
            box2.push(container[i])
        }
    }
    box1 = box1.reverse()
    box2 = box2.reverse()
    box3 = box3.reverse()

    var show_box1 = shuffleArray(box1)
    var show_box2 = shuffleArray(box2)
    var show_box3 = shuffleArray(box3)

    var option_box_1 = show_box1.join("<br>")
    var option_box_2 = show_box2.join("<br>")
    var option_box_3 = show_box3.join("<br>")

    document.getElementById('reader_box1').innerHTML = option_box_1
    document.getElementById('reader_box2').innerHTML = option_box_2
    document.getElementById('reader_box3').innerHTML = option_box_3

    ronde += 1
    document.getElementById('keterangan_reader').innerHTML = 'ronde '+ronde
}

function tebak(opsi) {
    var container = []
    if (opsi == 1) {
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
    } else if (opsi == 2) {
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
    } else if (opsi == 3) {
        for (var i = 0; i < box1.length; i++) {
            container.push(box1[i])
        }
        for (var i = 0; i < box3.length; i++) {
            container.push(box3[i])
        }
        for (var i = 0; i < box2.length; i++) {
            container.push(box2[i])
        }
    }

    //finishing
    box1 = []
    box2 = []
    box3 = []
    document.getElementById('reader_box1').innerHTML = ''
    document.getElementById('reader_box2').innerHTML = ''
    document.getElementById('reader_box3').innerHTML = ''
    document.getElementById('pilihan_reader').innerHTML = container[10]
    document.getElementById('res_mind_reader').style.display= 'block'
    ronde = 0
    document.getElementById('show_board').className = 'hide'
    mulai = false
}
