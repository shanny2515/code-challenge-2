const input =  document.getElementById('input')
const select = document.getElementById('select')
const error = document.getElementById('error')
const tableBody = document.getElementById('guestTable').querySelector('tbody')

form.addEventListener('submit',function(event) {
    event.preventDefault();
    const name = input.value.trim();
    const category = select.value;
    if (name === "" || category === "select"){
        return error.textContent = "please fill the whole form"
    }
      if(tableBody.querySelectorAll('tr').length > 10){
        return error.textContent = "The guest list is full"
    }
    
    error.textContent= "";

    const now = new Date();
    const time = now.toLocaleTimeString();


    const row = document.createElement('tr')
    row.innerHTML = `
    <td class = "changeName">${name}</td>
     <td class= "category ${category.toLowerCase()}">${category}</td>
      <td>${time}</td>
       <td>
       <button class="rsvp-btn">Attending</button>
       </td>
       <td>
        <button class="edit">Edit</button>
       </td>
        <td class= "remove-btn">🗑️</td>`

        
         
        tableBody.appendChild(row);
        form.reset();
          
        const rsvpButton = row.querySelector('.rsvp-btn')
        rsvpButton.addEventListener('click', function(){
            rsvpButton.classList.toggle('Attending')
            rsvpButton.textContent= rsvpButton.classList.contains('Attending') ? "Attending" : "Not Attending"

        });
    
        const removeButton = row.querySelector('.remove-btn')
        removeButton.addEventListener('click', function(){
            row.remove()
        })
        
        const edit = row.querySelector('.edit')
        const nameCell = row.querySelector('.changeName')
        edit.addEventListener('click', function(){
            const currentName =  nameCell.textContent
            const newName = prompt ("Edit guest name " , currentName )
            if (newName && newName.trim() !== "" ){
                nameCell.textContent = newName.trim()
            }
        } )

})
