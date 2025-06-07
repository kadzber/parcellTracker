

      function sendData() {
            var value = document.getElementById('input').value;
            $.ajax({
                url: '/process',
                type: 'POST',
                data: { 'data': value },
                success: function(response) {
                    document.getElementById('output').innerHTML = response;
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }