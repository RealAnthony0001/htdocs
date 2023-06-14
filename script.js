// Represents a GradeTracker application
class GradeTracker {
    constructor() {
        // Initialize event listeners
        document.getElementById('addBtn').addEventListener('click', this.addAssessment.bind(this));
        document.getElementById('calculateBtn').addEventListener('click', this.calculateGrades.bind(this));
        document.getElementById('saveBtn').addEventListener('click', this.saveGrades.bind(this));
        document.getElementById('loadBtn').addEventListener('click', this.loadGrades.bind(this));
    }

    // Save grades to local storage
    saveGrades() {
        // Get all rows
        var rows = Array.from(document.getElementsByClassName('row'));

        // Create an array to hold all data
        var gradeData = [];

        // Iterate through each row
        rows.forEach(row => {
            var subjectButton = row.querySelector('.subject-button');
            var subject = subjectButton.textContent.split(' ')[0];

            var grades = Array.from(row.querySelector('.row-grades').querySelectorAll('.grade-button'));

            var gradeValues = grades.map(gradeButton => {
                var gradeInfo = gradeButton.textContent.split(' ');
                var grade = parseFloat(gradeInfo[0]);
                var weight = parseFloat(gradeInfo[1].replace('(', '').replace(')', ''));
                return { grade, weight };
            });

            // Add the subject and its grades to the data array
            gradeData.push({ subject, grades: gradeValues });
        });

        // Save the data to local storage
        localStorage.setItem('gradeData', JSON.stringify(gradeData));
        alert("Saved");
    }

    // Load grades from local storage
    loadGrades() {
        // Get the data from local storage
        var gradeDataStr = localStorage.getItem('gradeData');
        if (gradeDataStr) {
            var gradeData = JSON.parse(gradeDataStr);

            // Clear the table
            document.getElementById('gradeTable').innerHTML = '';

            // Add each subject and its grades back to the table
            gradeData.forEach(data => {
                data.grades.forEach(grade => {
                    document.getElementById('subject').value = data.subject;
                    document.getElementById('grade').value = grade.grade;
                    document.getElementById('weight').value = grade.weight;
                    this.addAssessment();
                });
            });
        }
        alert("Loaded");
    }

    // Add an assessment to the table
    addAssessment() {
        var subject = document.getElementById('subject').value;
        var grade = parseFloat(document.getElementById('grade').value);
        var weight = parseFloat(document.getElementById('weight').value);

        // Check if any textbox is empty
        if (subject.trim() === '' || isNaN(grade) || isNaN(weight)) {
            alert('Please fill in all fields');
            return;
        }

        var gradeTable = document.getElementById('gradeTable');
        var existingRow = gradeTable.querySelector('tr[data-subject="' + subject + '"]');

        if (existingRow) {
            var gradesCell = existingRow.querySelector('.row-grades');
            var gradeButton = document.createElement('button');
            gradeButton.classList.add('grade-button');
            gradeButton.textContent = grade + ' (' + weight + ')';
            gradesCell.appendChild(gradeButton);
        } else {
            var newRow = document.createElement('tr');
            newRow.classList.add('row');
            newRow.setAttribute('data-subject', subject);

            var subjectButton = document.createElement('button');
            subjectButton.classList.add('subject-button');
            subjectButton.textContent = subject;

            var gradesCell = document.createElement('td');
            gradesCell.classList.add('row-grades');
            var gradeButton = document.createElement('button');
            gradeButton.classList.add('grade-button');
            gradeButton.textContent = grade + ' (' + weight + ')';
            gradesCell.appendChild(gradeButton);

            var subjectCell = document.createElement('td');
            subjectCell.appendChild(subjectButton);

            newRow.appendChild(subjectCell);
            newRow.appendChild(gradesCell);
            gradeTable.appendChild(newRow);

            subjectButton.addEventListener('click', function () {
                this.showGrades(this);
            }.bind(this));
        }

        this.calculateSubjectGrades(subject);
    }


    // Calculate grades for all subjects
    calculateGrades() {
        var rows = Array.from(document.getElementsByClassName('row'));
        rows.forEach(row => {
            var subjectButton = row.querySelector('.subject-button');
            var subject = subjectButton.textContent.split(' ')[0];
            this.calculateSubjectGrades(subject);
        });
    }

    // Calculate grades for a specific subject
    calculateSubjectGrades(subject) {
        var rows = Array.from(document.getElementsByClassName('row'));
        rows.forEach(row => {
            var subjectButton = row.querySelector('.subject-button');
            var rowGrades = row.querySelector('.row-grades');

            if (subjectButton.textContent.split(' ')[0] === subject) {
                var grades = Array.from(rowGrades.querySelectorAll('.grade-button'));
                var totalGrade = 0;
                var totalWeight = 0;

                grades.forEach(gradeButton => {
                    var gradeInfo = gradeButton.textContent.split(' ');
                    var grade = parseFloat(gradeInfo[0]);
                    var weight = parseFloat(gradeInfo[1].replace('(', '').replace(')', ''));
                    totalGrade += grade * weight;
                    totalWeight += weight;
                });

                if (totalWeight === 0) {
                    subjectButton.textContent = subject;
                } else {
                    var averageGrade = totalGrade / totalWeight;
                    var finalGrade = Math.round(averageGrade); // rounding the average grade
                    subjectButton.setAttribute('data-average', averageGrade.toFixed(2));
                    subjectButton.setAttribute('data-final', finalGrade.toFixed(2));
                }
            }
        });
    }

    // Show grades for a subject
    showGrades(button) {
        var averageGrade = button.getAttribute('data-average');
        var finalGrade = button.getAttribute('data-final');
        alert('Average: ' + averageGrade + '  Final: ' + finalGrade);
    }
}

// Represents the Nameday API
class NamedayAPI {
    constructor() {
        // nameday API call
        const url = new URL("https://nameday.abalin.net/api/V1/today");

        // add country parameter to the URL
        url.searchParams.append('country', 'cz');

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        fetch(url, {
            method: "POST",
            headers,
        }).then(response => response.json())
            .then(data => {
                const namedayDiv = document.getElementById('namedayDiv');
                const date = new Date();
                namedayDiv.innerHTML = `Today is ${date.toDateString()} and it's ${data.nameday.cz}'s nameday!`;
            });
    }
}

// Create instances of the classes
const gradeTracker = new GradeTracker();
const namedayAPI = new NamedayAPI();
