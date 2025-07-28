document.addEventListener("DOMContentLoaded", () => {
      const wordDisplayEl = document.getElementById("word-display");
      const lettersContainer = document.getElementById("letters-container");
      const attemptsLeftEl = document.getElementById("attempts-left");
      const statusMessageEl = document.getElementById("status-message");
      const restartBtn = document.getElementById("restart-btn");
      const stickmanEl = document.getElementById("stickman");

      const hangmanParts = [
        "right-leg",
        "left-leg",
        "right-arm",
        "left-arm",
        "head",
        "body",
        "rope",
        "gallows"
      ];

      const wordList = ["apple", "orange", "hangman", 'banana', "grape", "kiwi", "mango", "peach", "pear", "plum", "berry"];
      let secretWord = "";
      let correctLetters = [];
      let wrongGuesses = 0;
      const maxAttempts = hangmanParts.length;

      restartBtn.addEventListener("click", startGame);

      function startGame() {
        secretWord = wordList[Math.floor(Math.random() * wordList.length)];
        correctLetters = Array(secretWord.length).fill("_");
        wrongGuesses = 0;
        statusMessageEl.textContent = "";

        stickmanEl.innerHTML = "";
        hangmanParts.forEach(id => {
          const part = document.createElement("div");
          part.id = id;
          part.classList.add("hangman-part");
          stickmanEl.appendChild(part);
        });

        updateUI();
        generateLetterButtons();
      }

      function updateUI() {
        wordDisplayEl.textContent = correctLetters.join(" ");
        attemptsLeftEl.textContent = maxAttempts - wrongGuesses;
      }

      function generateLetterButtons() {
        lettersContainer.innerHTML = "";
        for (let i = 65; i <= 90; i++) {
          const letter = String.fromCharCode(i);
          const btn = document.createElement("button");
          btn.textContent = letter;
          btn.addEventListener("click", () => handleGuess(letter.toLowerCase(), btn));
          lettersContainer.appendChild(btn);
        }
      }

      function handleGuess(letter, btn) {
        btn.disabled = true;

        if (secretWord.includes(letter)) {
          for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
              correctLetters[i] = letter;
            }
          }
        } else {
          wrongGuesses++;
          showNextStickmanPart();
        }

        updateUI();
        checkGameStatus();
      }

      function showNextStickmanPart() {
        const partId = hangmanParts[wrongGuesses - 1];
        const part = document.getElementById(partId);
        if (part) part.style.display = "block";
      }

      function checkGameStatus() {
        if (!correctLetters.includes("_")) {
          statusMessageEl.textContent = "🎉 You won!";
          disableAllButtons();
        } else if (wrongGuesses >= maxAttempts) {
            msg='💀 You lost! Word was: ' + secretWord;
          statusMessageEl.textContent=msg;
          disableAllButtons();
        }
      }

      function disableAllButtons() {
        const buttons = lettersContainer.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = true);
      }

      startGame();
    });
