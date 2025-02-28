document.addEventListener('DOMContentLoaded', function() {
    const excelTable = document.getElementById('excel-table');

    // Vervang 'data.xlsx' met de naam van je Excel bestand
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
                    row.forEach(cell => {
                        tableHTML += `<td>${cell}</td>`;
                    });
                    tableHTML += '</tr>';
                }
            });
            
            tableHTML += '</tbody>';
            excelTable.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error loading Excel file:', error));
});