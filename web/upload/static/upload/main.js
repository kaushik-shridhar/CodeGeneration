$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#textarea').hide();
    $('#btn-copy').hide();
    $('#btn-export').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('hello');
        $('#result').hide();
        readURL(this);
    });

    // Copy HTML code to clipboard
    $('#btn-copy').click(function () {
        // alert("this works");
        var text_to_copy = document.getElementById("textarea").value;

        if (!navigator.clipboard) {
            // use old commandExec() way
            console.log("");
        } else {
            navigator.clipboard.writeText(text_to_copy).then(
                function () {
                    alert("Code Copied to Clipboard!"); // success 
                })
                .catch(
                    function () {
                        alert("err"); // error
                    });
        }
    })

    $('#btn-export').click(function () {
        var text_to_export = document.getElementById("textarea").value;

        // Convert the text to BLOB.
        const textToBLOB = new Blob([text_to_export], { type: 'text/plain' });
        const sFileName = 'generated_code.html';	   // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
    })

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                // $('#result').fadeIn(600);
                // $('#result').text(' Result:  ' + data);
                $('#textarea').fadeIn(600);
                $('#btn-copy').fadeIn(600);
                $('#btn-export').fadeIn(600);
                document.getElementById("textarea").value = data;
                console.log('Success!');
            },
        });
    });

});
