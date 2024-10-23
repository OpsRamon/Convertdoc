const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmVmNDhhZGM5M2NlNWI0ZjQ0NjVmNTljOTU4ZTVlZjBhNGQyYTUwMjhlNWE5YjEwMzE2ZDM5MmYwNDQ4NTcxOTk5OTljYTMzM2EwYTgzMzQiLCJpYXQiOjE3Mjk2OTc2MTYuMzg2ODM3LCJuYmYiOjE3Mjk2OTc2MTYuMzg2ODM5LCJleHAiOjQ4ODUzNzEyMTYuMzgxOTExLCJzdWIiOiI2OTk3Mzg4MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.VwuDE0k8oIIDVXxZWDbzwlcWN9U757CHLyXhSwK490-65yJwCXx1nrlzs5h6IuBbvkWU6YhP7-TwtGocYsyABkLUFwbmuAU_h9LKO_K-TmnGEKY3ZdshMaHLtHfDOd3hHy79LYi9QQOUb2Vl_3W4UBpWY1iEE0Wiscs8VnDqoNimWm2hOKZaYyZX1skS8p4OyD4fuCAOnegdkd-bRSWa2QEIctaBdJYbZtx1BJUXMggWBUo8hzU9liuPZhDCXGSHRoQJnNzWbxqlkyJnRdp-9B13Wm6QDrs5jCV7Xta6MKh30VhIymQJGimTEo97bd3ll1b3piDXnC6_xbUzjuzpsIDPTD52GqL9HAbEnX-Sdq5U_-eSoK-yzSij031FsSDlvCd_Kc69UqZ1hERazjvPOUQ-YnGCsYE8TmTRMDxW1-hmtv5gxQ79bsjmcST9meijVR3rHGbb760ABoQJD50uMSIX1pa72QzQ44CZ8GcwkpoOWKBOl23rTj-YlmdwMHQzLcYS7Zb1kWZSPEs2NO2HldGvBMcY9GLPGtF_wiC97DwKWSJiVwhu9AnAAmYRcYxF0Yn2KJEEEWlOswrDntJFisJE7RrJsNihw2tSIthbJrRkbWnaVWR6sxIWk0VsAlnLHGEv7ENNonjDqaqU8KtFhfXs6TEkcVESYJ59rNDvU9A';

document.getElementById('convertButton').addEventListener('click', async function() {
    const fileInput = document.getElementById('fileInput');
    const outputFormat = document.getElementById('outputFormat').value;
    const output = document.getElementById('output');

    output.innerHTML = 'Conversão em progresso...'; // Mostra que a conversão começou

    if (fileInput.files.length === 0) {
        output.innerHTML = "Por favor, selecione um arquivo para converter.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        // 1. Fazer o upload do arquivo
        const uploadResponse = await fetch('https://api.cloudconvert.com/v2/import/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            body: formData
        });

        // Log da resposta do upload
        const uploadData = await uploadResponse.json();
        console.log('Upload Response:', uploadResponse);
        console.log('Upload Data:', uploadData);

        if (!uploadData.data) {
            throw new Error("Erro no upload do arquivo: " + uploadData.message);
        }

        const fileId = uploadData.data.id;

        // 2. Iniciar a conversão
        const convertResponse = await fetch('https://api.cloudconvert.com/v2/convert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "inputformat": file.name.split('.').pop(),
                "outputformat": outputFormat,
                "file": fileId
            })
        });

        const convertData = await convertResponse.json();

        // 3. Exibir o link para download
        output.innerHTML = `Arquivo convertido com sucesso! Baixe aqui: <a href="${convertData.data.url}" target="_blank">Download</a>`;
    } catch (error) {
        output.innerHTML = "Erro ao converter o arquivo: " + error.message;
    }
});
