const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

function selectLesson(lessonNumber) {
    // Hide all about sections
    document.querySelectorAll('#aboutSection, #aboutSection1, #aboutSection2, #aboutSection3').forEach(el => {
        el.style.display = 'none';
    });

    // Hide the Java editor
    document.getElementById('java-editor-container').style.display = 'none';

    // Show lesson container (Make sure this doesn't hide the lesson buttons)
    const container = document.getElementById('container');
    if (container) {
        container.style.display = 'block';
    }
    
    // Hide all lessons
    // document.querySelectorAll('[id^="lesson"]').forEach(el => {
    //     el.style.display = 'none';
    // });

    // Show the selected lesson
    const lessonContent = document.getElementById(`lesson${lessonNumber}-content`);
    if (lessonContent) {
        lessonContent.style.display = 'block';
    }

    // Close any open dropdown menus (ensure this function doesn't hide the lesson buttons)
    if (typeof closeAllSubMenus === 'function') {
        closeAllSubMenus();
    }
}

const lesson1 = document.getElementById("lesson1-content");
const lesson2 = document.getElementById("lesson2-content");
const lesson3 = document.getElementById("lesson3-content");
const lesson4 = document.getElementById("lesson4-content");
const lesson5 = document.getElementById("lesson5-content");
 
const lesson1btn = document.getElementById("lesson1");
const lesson2btn = document.getElementById("lesson2");
const lesson3btn = document.getElementById("lesson3");
const lesson4btn = document.getElementById("lesson4");
const lesson5btn = document.getElementById("lesson5");

function showLesson1(){
    lesson1.style.display = "block";
    lesson2.style.display = "none";
    lesson3.style.display = "none";
    lesson4.style.display = "none";
    lesson5.style.display = "none";
    
}

function showLesson2(){
    lesson1.style.display = "none";
    lesson2.style.display = "block";
    lesson3.style.display = "none";
    lesson4.style.display = "none";
    lesson5.style.display = "none";
    
}

function showLesson3(){
    lesson1.style.display = "none";
    lesson2.style.display = "none";
    lesson3.style.display = "block";
    lesson4.style.display = "none";
    lesson5.style.display = "none";
    
}

function showLesson4(){
    lesson1.style.display = "none";
    lesson2.style.display = "none";
    lesson3.style.display = "none";
    lesson4.style.display = "block";
    lesson5.style.display = "none";
    
}

function showLesson5(){
    lesson1.style.display = "none";
    lesson2.style.display = "none";
    lesson3.style.display = "none";
    lesson4.style.display = "none";
    lesson5.style.display = "block";
    
}

lesson1btn.addEventListener("click", showLesson1)
lesson2btn.addEventListener("click", showLesson2)
lesson3btn.addEventListener("click", showLesson3)
lesson4btn.addEventListener("click", showLesson4)
lesson5btn.addEventListener("click", showLesson5)
  // Add this helper function to close submenus
  