document.addEventListener("DOMContentLoaded", function() {
    // Global variables
    let timePerQuestion = 120; // default for easy; updated on difficulty selection
    let currentQuestion = 0;
    let score = 0;
    let totalBonusTime = 0;
    let currentTimer;
    let remainingTime = timePerQuestion;
    let questions = [];
  
    // Code-based questions for each difficulty
  
    // EASY: Simple code completion questions
    const easyQuestions = [
      { question: "Complete the code: ______.out.println(\"Hello, World!\");", answer: "System" },
      { question: "Fill in the blank:\npublic class ______ {\n  public static void main(String[] args) { }\n}", answer: "Main" },
      { question: "Complete the loop:\nfor(int i = 0; i < 5; i++) { ______ }", answer: "System.out.println(i);" },
      { question: "Complete the statement:\nint[] numbers = new int[____];", answer: "10" },
      { question: "Fill in the blank to print a variable:\nint x = 5;\n______ .out.println(x);", answer: "System" },
      { question: "Complete the code:\nif(____) { System.out.println(\"True\"); }", answer: "true" },
      { question: "Fill in the blank:\nString greeting = \"Hello\";\n______ .out.println(greeting);", answer: "System" },
      { question: "Complete the method call:\nMath.____(9);", answer: "sqrt" },
      { question: "Fill in:\nSystem.out.println(____); // Should print \"Java\"", answer: "\"Java\"" },
      { question: "Complete:\nfor(int i=0; i<3; i++){\n  ______\n} // Print index", answer: "System.out.println(i);" }
    ];
  
    // MEDIUM: Intermediate code completion and basic logic
    const mediumQuestions = [
      { question: "Complete the main method:\npublic static void main(String[] args) {\n  ______\n}", answer: "System.out.println(\"Hello World\");" },
      { question: "Fill in the blank to sum numbers:\nint sum = 0;\nfor(int i=1;i<=5;i++){\n  sum += i;\n}\nSystem.out.println(____);", answer: "sum" },
      { question: "Complete the code to access an array element:\nint[] arr = {1,2,3,4,5};\nSystem.out.println(arr[____]);", answer: "0" },
      { question: "Fill in the missing operator:\nint result = 10 __ 2; // Divide 10 by 2", answer: "/" },
      { question: "Complete the condition:\nint x = 4;\nif(____ == 0) { System.out.println(\"Even\"); }", answer: "x % 2" },
      { question: "Fill in the loop control:\nfor(int i=0;i<10;i++){\n  if(i==____){ break; }\n}", answer: "5" },
      { question: "Complete the code to convert to uppercase:\nString s = \"Hello\";\nSystem.out.println(s.____());", answer: "toUpperCase" },
      { question: "Fill in the blank:\ndouble d = Math.____(16); // Compute square root", answer: "sqrt" },
      { question: "Complete the enhanced for loop:\nint[] nums = {1,2,3};\nfor(int n : nums){\n  ______\n}", answer: "System.out.println(n);" },
      { question: "Fill in the operator:\npublic static int add(int a, int b) { return a ____ b; }", answer: "+" }
    ];
  
    // HARD: More advanced code challenges and method completions
    const hardQuestions = [
      { question: "Complete the recursive method:\npublic static int factorial(int n) {\n  if(n <= 1) return 1;\n  return n * ______;\n}", answer: "factorial(n - 1)" },
      { question: "Fill in the lambda expression:\nList<Integer> nums = Arrays.asList(1,2,3,4);\nnums.stream().filter(n -> n % 2 == 0).forEach(______);", answer: "System.out::println" },
      { question: "Complete the code to sort an array:\nint[] arr = {5,3,8,1};\nArrays.sort(arr);\nSystem.out.println(Arrays.toString(____));", answer: "arr" },
      { question: "Fill in the blank:\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"a\", 1);\nSystem.out.println(map.____(\"a\"));", answer: "get" },
      { question: "Complete the try-catch block:\ntry {\n  int num = Integer.parseInt(\"abc\");\n} catch(____ e) {\n  System.out.println(\"Error\");\n}", answer: "NumberFormatException" },
      { question: "Fill in the modulus operator:\npublic static boolean isEven(int n) { return n % ____ == 0; }", answer: "2" },
      { question: "Complete the generic method:\npublic static <T> void printArray(T[] array) {\n  for(T element : array) {\n    System.out.println(____);\n  }\n}", answer: "element" },
      { question: "Fill in the property to get array length:\nString[] parts = \"one,two,three\".split(\",\");\nSystem.out.println(parts.____);", answer: "length" },
      { question: "Complete the code to reverse a list:\nList<String> list = new ArrayList<>();\nlist.add(\"a\"); list.add(\"b\");\nCollections.____(list);", answer: "reverse" },
      { question: "Fill in the method override:\npublic interface MyInterface { void doSomething(); }\nclass MyClass implements MyInterface {\n  public void ______() { System.out.println(\"Done\"); }\n}", answer: "doSomething" }
    ];
  
    // Get DOM elements
    const questionTextEl = document.getElementById("questionText");
    const answerInputEl = document.getElementById("answerInput");
    const submitButtonEl = document.getElementById("submitButton");
    const feedbackEl = document.getElementById("feedback");
    const timerEl = document.getElementById("timeLeft");
    const quizEl = document.getElementById("quiz");
    const resultEl = document.getElementById("result");
    const scoreEl = document.getElementById("score");
    const bonusTimeEl = document.getElementById("bonusTime");
    const difficultyContainer = document.getElementById("difficultyContainer");
  
    // Function to start the timer for the current question
    function startTimer() {
      remainingTime = timePerQuestion;
      timerEl.textContent = remainingTime;
      currentTimer = setInterval(function() {
        remainingTime--;
        timerEl.textContent = remainingTime;
        if (remainingTime <= 0) {
          clearInterval(currentTimer);
          feedbackEl.textContent = "Time's up! The correct answer was: " + questions[currentQuestion].answer;
          totalBonusTime += remainingTime; // bonus is zero here
          setTimeout(() => {
            nextQuestion();
          }, 1500);
        }
      }, 1000);
    }
  
    // Display the current question
    function showQuestion() {
      if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
      }
      answerInputEl.value = "";
      feedbackEl.textContent = "";
      questionTextEl.textContent = "Question " + (currentQuestion + 1) + ":\n" + questions[currentQuestion].question;
      clearInterval(currentTimer);
      startTimer();
    }
  
    // Check the user's answer when submitted
    function checkAnswer() {
      clearInterval(currentTimer);
      const userAnswer = answerInputEl.value.trim();
      const correctAnswer = questions[currentQuestion].answer.trim();
      // Record bonus time (remaining seconds if answered early)
      totalBonusTime += remainingTime;
      if (userAnswer === correctAnswer) {
        score++;
        feedbackEl.textContent = "Correct!";
      } else {
        feedbackEl.textContent = "Incorrect! The correct answer was: " + correctAnswer;
      }
      setTimeout(() => {
        nextQuestion();
      }, 1500);
    }
  
    // Move to the next question or finish the quiz
    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        finishQuiz();
      }
    }
  
    // Display final results
    function finishQuiz() {
      quizEl.classList.add("hidden");
      resultEl.classList.remove("hidden");
      scoreEl.textContent = "You got " + score + " out of " + questions.length + " correct.";
      bonusTimeEl.textContent = "Total bonus time remaining: " + totalBonusTime + " seconds.";
      if (totalBonusTime >= 60) {
        bonusTimeEl.textContent += " Great work! You finished the quiz with extra time!";
      }
    }
  
    // Called when a difficulty button is clicked.
    // Sets the timer per question, loads the appropriate question set, and begins the quiz.
    window.selectDifficulty = function(difficulty) {
      if (difficulty === "easy") {
        timePerQuestion = 120;
        questions = easyQuestions;
      } else if (difficulty === "medium") {
        timePerQuestion = 60;
        questions = mediumQuestions;
      } else if (difficulty === "hard") {
        timePerQuestion = 45;
        questions = hardQuestions;
      }
      // Hide difficulty selection and show quiz section
      difficultyContainer.classList.add("hidden");
      quizEl.classList.remove("hidden");
      showQuestion();
    };
  
    // Event listeners for answer submission
    submitButtonEl.addEventListener("click", checkAnswer);
    answerInputEl.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        checkAnswer();
      }
    });
  });
  