document.getElementById('addBtn').addEventListener('click', addAssessment);
document.getElementById('calculateBtn').addEventListener('click', calculateGrades);

function addAssessment() {
    var subject = document.getElementById('subject').value;
    var grade = parseFloat(document.getElementById('grade').value);
    var weight = parseFloat(document.getElementById('weight').value);

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
            showGrades(this);
        });
    }

    calculateSubjectGrades(subject);
}

function calculateGrades() {
    var rows = Array.from(document.getElementsByClassName('row'));
    rows.forEach(row => {
        var subjectButton = row.querySelector('.subject-button');
        var subject = subjectButton.textContent.split(' ')[0];
        calculateSubjectGrades(subject);
    });
}

function calculateSubjectGrades(subject) {
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


function showGrades(button) {
    var averageGrade = button.getAttribute('data-average');
    var finalGrade = button.getAttribute('data-final');
    alert('Average: ' + averageGrade + '  Final: ' + finalGrade);
}
