document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');

    if (fileInput.files.length === 0) {
        output.innerHTML = "Por favor, selecione um arquivo para converter.";
    } else {
        output.innerHTML = "Conversão em progresso... (função ainda não implementada)";
        // Aqui você poderá implementar a lógica de conversão mais tarde.
    }
});
