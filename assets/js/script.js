let chessboard = document.querySelector('#chessboard');
let chess_board = "";

let chess_letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let chess_number = [1, 2, 3, 4, 5, 6, 7, 8];

let chess_pieces_name = [
    ['tower', 'horse', 'alfil', 'queen', 'king', 'alfil', 'horse', 'tower'],
    ['peon', 'peon', 'peon', 'peon', 'peon', 'peon', 'peon', 'peon']
];

let chess_pieces_id = [
    ['tower1', 'horse1', 'alfil1', 'queen', 'king', 'alfil2', 'horse2', 'tower2'],
    ['peon1', 'peon2', 'peon3', 'peon4', 'peon5', 'peon6', 'peon7', 'peon8']
];

// Create board

for (let i = 7; i >= 0; i--) {

    chess_board += `<div class="cb-row">`;
    
    if(i%2==0){
        for (let j = 0; j < 8; j++) {

            let id = chess_letter[j]+chess_number[i];
        
            chess_board += `
            <div class="cb-cell first-color" id="${id}">
                <div class="letter">${id}</div>
            </div>`;
            
        }
    }else {
        for (let j = 0; j < 8; j++) {
        
            let id = chess_letter[j]+chess_number[i];
        
            chess_board += `
            <div class="cb-cell second-color" id="${id}">
                <div class="letter">${id}</div>
            </div>`;
            
        }
    }

    chess_board += `</div>`;
    
}

chessboard.innerHTML = chess_board;

// put pieces

let piece = {
    img: './../img/pieces/king'
}

const create_piece = (i,j,type, chess_pieces_name) => {

    let piece = `
    <div class="piece" id="${type}-${chess_pieces_id[i][j]}">
        <img class="piece_img" src="./assets/img/pieces/${type}-${chess_pieces_name[i][j]}.png">
    </div>
    `;

    return piece;
}

let rows = document.querySelectorAll('.cb-row');

for (let i = 0; i < 2 ; i++) { 
    for (let j = 0; j < 8; j++) { 
        let piece = create_piece(i,j, 'black', chess_pieces_name);
        rows[i].querySelectorAll('.cb-cell')[j].innerHTML = piece;   
    }
}

for (let i = 1; i >= 0; i--) { 
    for (let j = 0; j < 8; j++) { 
        let piece = create_piece(i,j, 'white', chess_pieces_name);  
        rows[7-i].querySelectorAll('.cb-cell')[j].innerHTML = piece;
    }
}


let pieces = document.querySelectorAll('.piece');
let cells = document.querySelectorAll('.cb-cell');

let selected_piece = "";

pieces.forEach(piece => {

    piece.addEventListener('click', ()=>{

        pieces.forEach(piece => {
            piece.classList.remove('selected');
        })

        piece.classList.add('selected');

        let audio = new Audio('./assets/audio/take-piece.mp3');
        audio.play();
        
        // console.log("id: " + piece.id);
        // console.log("piece: " + piece.parentElement.id);

        setTimeout(() => {
            selected_piece = piece;
            // console.log(`pieza ${piece.id} seleccionada `);
            console.log(selected_piece);
        }, 100);

    });

});


cells.forEach(cell => {

    cell.addEventListener('click', ()=>{

        // console.log("id cell: " + cell.id);

        if(selected_piece!=""){
            // console.log("pieza movida");
            cell.append(selected_piece);
            selected_piece=""
            let audio = new Audio('./assets/audio/take-piece.mp3');
            audio.play();
        }

        // console.log("child count: " + cell.childElementCount);

    });

});

