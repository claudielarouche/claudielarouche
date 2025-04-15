document.getElementById('start-game').addEventListener('click', startGame);
        document.getElementById('validate-answer').addEventListener('click', validateAnswer);
        document.getElementById('next-question').addEventListener('click', nextQuestion);

        let data = [];
        let currentIndex = 0;
        let score = 0;

        function loadData() {
            console.log("end of game changes 3");
            Papa.parse('https://claudielarouche.com/assets/data/acronyms.csv', {
                download: true,
                header: true,
                complete: function(results) {
                    data = cleanData(results.data);
                    console.log('Data loaded', data.length, 'entries');
                    document.getElementById('question-count-select').options[3].text = `All Questions (${data.length})`;
                }
            });
        }

        function cleanData(dataArray) {
            let cleanedData = dataArray.map(row => {
                if (!row['Applied title'] || row['Applied title'].trim() === '') {
                    row['Applied title'] = row['Legal title'] ? row['Legal title'].trim() : '';
                }
                if (row['Applied title'] === "Registrar of the Supreme Court of Canada and that portion of the federal public administration appointed under subsection 12(2) of the Supreme Court Act") {
                    row['Applied title'] = "Registrar of the Supreme Court of Canada";
                }
                return row;
            });
            return cleanedData.filter(row => 
                row['Applied title'] && row['Applied title'].trim() !== '' &&
                row['Abbreviation'] && row['Abbreviation'].trim() !== '' &&
                row['Applied title'] !== "Treasury Board"
            );
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap
            }
        }

        function startGame() {
            currentIndex = 0;
            score = 0;
            document.getElementById('score').textContent = score;
            document.getElementById('game-area').style.display = 'block';

            const totalQuestions = document.getElementById('question-count-select').value;
            document.getElementById('total-questions').textContent = totalQuestions === 'all' ? data.length : totalQuestions;

            if (totalQuestions !== 'all') {
                shuffleArray(data); // Shuffle before slicing to randomize
                data = data.slice(0, parseInt(totalQuestions));
            }

            document.getElementById('progress-display').textContent = `Question: ${currentIndex+1}/${data.length}`;
            nextQuestion(); // Call to set first question
        }


        function nextQuestion() {
            if (currentIndex < data.length) {
                const entry = data[currentIndex];
                document.getElementById('question').textContent = document.getElementById('game-mode').value === 'guessAcronym' ?
                    `What is the acronym for "${entry['Applied title']}"?` :
                    `What department does the acronym "${entry['Abbreviation']}" stand for?`;
                document.getElementById('answer').value = '';
                document.getElementById('feedback').textContent = '';
                document.getElementById('answer').focus();
                document.getElementById('validate-answer').style.display = 'inline-block';
                document.getElementById('next-question').style.display = 'none';
                document.getElementById('progress-display').textContent = `Question: ${currentIndex+1}/${data.length}`;
            } else {
                document.getElementById('game-area').style.display = 'none';
                //document.getElementById('feedback').textContent = 'Game over! Click Play! to start again.';
                document.getElementById('start-game').textContent = 'Play Again';
                //document.getElementById('progress-display').textContent = `Game Completed: ${score}/${data.length}`;
            }
        }

        function validateAnswer() {
            const entry = data[currentIndex];
            let correctAnswer = document.getElementById('game-mode').value === 'guessAcronym' ? entry['Abbreviation'] : entry['Applied title'];
            if (document.getElementById('answer').value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
                score++;
                document.getElementById('feedback').textContent = 'Correct!';
            } else {
                document.getElementById('feedback').textContent = `Incorrect! The correct answer was "${correctAnswer}".`;
            }
            document.getElementById('score').textContent = score;
            currentIndex++;
            document.getElementById('validate-answer').style.display = 'none';
            if (currentIndex < data.length) {
                document.getElementById('next-question').style.display = 'inline-block';
            } else {
                document.getElementById('game-area').style.display = 'none';
                //document.getElementById('feedback').textContent = 'Game over! Click Play! to start again.';
                document.getElementById('start-game').textContent = 'Play Again';
                //document.getElementById('progress-display').textContent = `Game Completed: ${score}/${data.length}`;
                //document.getElementById('progress-display').textContent = `Question: ${currentIndex+1}/${data.length}`;
            }
        }

        function checkEnter(event) {
            if (event.key === "Enter") {
                if (document.getElementById('validate-answer').style.display !== 'none') {
                    validateAnswer();
                } else if (document.getElementById('next-question').style.display !== 'none') {
                    nextQuestion();
                }
            }
        }

window.addEventListener("DOMContentLoaded", function () {
  loadData();
});
