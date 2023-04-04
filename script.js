// const submitBtn = document.getElementById("submit-btn");
// const studentsArray = [];
const studentsArray = [];
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector("#submit-btn");
    console.log(submitBtn);
  
  submitBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents the page from refreshing on form submission

      //const id = studentsArray.length + 1; // Generate a new ID for the student
      const name = document.getElementById("name-input").value;
      const age = document.getElementById("age-input").value;
      const grade = document.getElementById("grade-input").value;
      const degree = document.getElementById("degree-input").value;
    const email = document.getElementById("email-input").value;
    
    //name validity check
    if (name == "") {
      alert("Please enter a valid name");
      return;
    }

    //email validity check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      } 
    
    //grade validity check
      const gradeRegex = /^\d+(\.\d)?$/;
      if (!gradeRegex.test(grade)) {
        alert("Please enter a valid grade.");
        return;
      }
    
    //age validity check

    const ageRegex = /^\d*$/;
    if (!ageRegex.test(age)) {
      alert("Please enter a valid age");
    }

    //degree validity check
    if (degree == "") {
      alert("Please enter a valid name");
      return;
    }
    
      // Create a new student object with the input values
      const newStudent = {
        //ID: id,
        name: name,
        email: email,
        age: age,
        grade: grade,
        degree: degree
      };
    
      // Add the new student object to the studentsArray
    const submitBtnText = submitBtn.textContent.trim();
    if (submitBtnText === "Add Student") {
      const id = studentsArray.length + 1;
      newStudent.ID = id;
      studentsArray.push(newStudent);
    } else if(submitBtnText==="Edit Student"){

      newStudent.ID = submitBtn.id;
      studentsArray[newStudent.ID - 1] = newStudent;
    // Reset the button text content to "Add Student"
    submitBtn.textContent = "Add Student";
    submitBtn.removeAttribute("data-row-id");
    }
      
    
      // Reset the form inputs
      document.getElementById('name-input').value = '';
      document.getElementById('age-input').value = '';
      document.getElementById('grade-input').value = '';
      document.getElementById('degree-input').value = '';
        document.getElementById('email-input').value = '';
    
        console.log(studentsArray);
        
        displayStudents(studentsArray);
  });
  
  const tableBody = document.getElementById("student-table-body");
    //event listener for edit and delete icons
  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the click target is an edit or delete icon
    if (target.classList.contains("edit-icon")) {
      // Find the corresponding row element
      const row = event.target.closest("tr");
      // Get the ID of the corresponding student
      const studentID = row.id;

      //fill form using the student
       for (const student of studentsArray) {
         if (student.ID == student.ID) {
          document.getElementById('name-input').value = student.name;
          document.getElementById('age-input').value = student.age;
          document.getElementById('grade-input').value = student.grade;
          document.getElementById('degree-input').value = student.degree;
          document.getElementById('email-input').value = student.email;

          const addButton = document.getElementById("submit-btn"); // Get a reference to the button element
          addButton.id = row.id;
          addButton.textContent = "Edit Student"; // Set the text content of the button element to "Edit Student"
          return;
         }
       }
    } else if (target.classList.contains("delete-icon")) {
      // Find the corresponding row element
      const row = event.target.closest("tr");
      // Get the ID of the corresponding student
      const studentID = row.id;
      const index = studentsArray.indexOf(studentID);
      studentsArray.splice(index, 1);
      displayStudents(studentsArray);
    }
  });

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", (event) => {
    const searchTerm = document.getElementById("search-input").value;
    let results = [];
  for (let i = 0; i < studentsArray.length; i++) {
    if (studentsArray[i].name.indexOf(searchTerm) !== -1 ||
        studentsArray[i].email.indexOf(searchTerm) !== -1 ||
        studentsArray[i].degree.indexOf(searchTerm) !== -1) {
      results.push(studentsArray[i]);
    }
  }
    displayStudents(results);
  });
  
  
    
  });
  
function displayStudents(studentsArray) {
    // Get the table body element
    const tableBody = document.getElementById("student-table-body");
  
    // Clear any existing rows from the table
    tableBody.innerHTML = "";
  
    // Loop through each student object in the array and add a new row to the table
    for (const student of studentsArray) {
      const row = document.createElement("tr");
      row.id = student.ID;
  
      const idCell = document.createElement("td");
      idCell.textContent = student.ID;
      row.appendChild(idCell);
  
      const nameCell = document.createElement("td");
      nameCell.textContent = student.name;
      row.appendChild(nameCell);
  
      const emailCell = document.createElement("td");
      emailCell.textContent = student.email;
      row.appendChild(emailCell);
  
      const ageCell = document.createElement("td");
      ageCell.textContent = student.age;
      row.appendChild(ageCell);
  
      const gradeCell = document.createElement("td");
      gradeCell.textContent = student.grade;
      row.appendChild(gradeCell);
  
      const degreeCell = document.createElement("td");
      degreeCell.textContent = student.degree;
      //delete icon
      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon", "fas", "fa-trash");
      deleteIcon.style.float = "right";
      deleteIcon.style.marginTop = "5px";
      degreeCell.appendChild(deleteIcon);
      
      //edit icon
      const editIcon = document.createElement("span");
      editIcon.classList.add("edit-icon", "fas", "fa-edit");
      editIcon.style.float = "right";
      editIcon.style.marginRight = "5px"; 
      editIcon.style.marginTop = "5px"; 
      degreeCell.appendChild(editIcon);
      

      row.appendChild(degreeCell);
  
      tableBody.appendChild(row);
    }
}
  


  

  
