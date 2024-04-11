document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateTax();
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function calculateTax() {
        const incomeInput = document.getElementById('income');
        const deductionsInput = document.getElementById('deductions');
        const extraIncomeInput = document.getElementById('extraIncome');
        const ageInput = document.getElementById('age');

        const income = parseFloat(incomeInput.value);
        const deductions = parseFloat(deductionsInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const age = ageInput.value;

        // Reset error styles
        resetErrorStyles([incomeInput, deductionsInput, extraIncomeInput, ageInput]);

        // Validate inputs
        if (isNaN(income) || income < 0) {
            showError(incomeInput, 'Please enter a valid positive number.');
            return;
        }

        if (isNaN(deductions) || deductions < 0) {
            showError(deductionsInput, 'Please enter a valid positive number.');
            return;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            showError(extraIncomeInput, 'Please enter a valid positive number.');
            return;
        }

        if (!age) {
            showError(ageInput, 'Please select an age range.');
            return;
        }

        let tax = 0;
        const totalIncome = income + extraIncome - deductions;
        if (totalIncome <= 800000) {
            // No tax
            tax = 0;
        } else {
            const taxableIncome = Math.max(0, totalIncome - 800000);
            if (age === '<40') {
                tax = 0.3 * taxableIncome;
            } else if (age === '≥40 & <60') {
                tax = 0.4 * taxableIncome;
            } else if (age === '≥60') {
                tax = 0.1 * taxableIncome;
            }
        }

        displayResult(tax);
    }

    function displayResult(tax) {
        const taxResult = document.getElementById('taxResult');
        taxResult.textContent = `Your tax amount is ₹${tax.toFixed(2)}`;
        modal.style.display = 'block';
    }

    function showError(input, message) {
        const errorIcon = input.nextElementSibling;
        errorIcon.classList.add('error-icon');
        errorIcon.title = message;
    }

    function resetErrorStyles(inputs) {
        inputs.forEach(input => {
            const errorIcon = input.nextElementSibling;
            errorIcon.classList.remove('error-icon');
            errorIcon.title = '';
        });
    }
});
