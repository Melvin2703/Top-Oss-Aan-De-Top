document.addEventListener('DOMContentLoaded', function() {
    fetch('data/Standing.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            // Create the table
            let tableHTML = '';
            
            jsonData.forEach((row, index) => {
                if (index === 0) {
                    // Header row
                    tableHTML += '<thead><tr>';
                    row.forEach(cell => {
                        tableHTML += `<th>${cell}</th>`;
                    });
                    tableHTML += '</tr></thead><tbody>';
                } else {
                    // Data rows
                    tableHTML += '<tr>';
                    row.forEach((cell, cellIndex) => {
                        if (cellIndex === 9) { // Assuming the form column is the 6th column (index 5)
                            const formBlocks = String(cell).split(' ').map(char => {
                                let className = '';
                                if (char === 'W') className = 'w';
                                if (char === 'G') className = 'g';
                                if (char === 'V') className = 'v';
                                return `<span class="form-block ${className}">${char}</span>`;
                            }).join('');
                            tableHTML += `<td>${formBlocks}</td>`;
                        } else {
                            tableHTML += `<td>${cell}</td>`;
                        }
                    });
                    tableHTML += '</tr>';
                }
            });
            
            tableHTML += '</tbody>';
            document.getElementById('excel-table').innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading Excel file:', error));
});