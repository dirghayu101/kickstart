 /*
            // IMPORTANT: The below was the version 1 of the update, but it didn't workout successfully because of a technical issue. 
            The technically issue was that the event listener got activated while the cursor hovered out.

            // This function will add the edit button if the mouse hovers on the row.
            var allRows = document.querySelectorAll('.user-row');
            allRows.forEach(row => row.addEventListener("mouseover", 
            function () {
                var editButton = row.querySelector('.edit-button')
                editButton.style.display = 'block';
            }))

            // This function will remove the edit button if the mouse hovers out of the row.
            allRows.forEach(row => row.addEventListener("mouseout", 
            function () {
                var editButton = row.querySelector('.edit-button')
                editButton.style.display = 'none';
            }))

            // This function will add the contentEditable property which will make the cell editable upon click on the edit button.
            var editButtons = document.querySelectorAll('.edit-button');
            editButtons.forEach(button => button.addEventListener('click', async function () {
                var getCells = button.parentElement.parentElement.querySelectorAll('td');
                var length = getCells.length;
                for(var i = 0; i <= 3; i++){
                    getCells[i].contentEditable="true";
                }
                
            }))
            
            //This function will remove the editable property of the row once the cursor hovers out of the table after clicking.
          */