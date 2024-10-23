document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const outputFormat = document.getElementById('outputFormat').value;
    const output = document.getElementById('output');

    if (fileInput.files.length === 0) {
        output.innerHTML = "Por favor, selecione um arquivo para converter.";
    } else {
        const fileName = fileInput.files[0].name;
        output.innerHTML = `Conversão de "${fileName}" para ${outputFormat.toUpperCase()} em progresso... (função ainda não implementada)`;
        // Aqui você poderá implementar a lógica de conversão mais tarde.
    }
});
