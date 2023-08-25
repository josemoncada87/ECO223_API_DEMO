(async ()=>{

    async function fetchItems() {
        try {
            const response = await fetch("http://127.0.0.1:3000/users");    
            console.log("Response llegó así:" , response)
            if (response.ok === false) {
                throw new Error(`HTTP error : Status: ${response.status}`);
                
            } 
            
            const items = await response.json();
            console.log("Items/Data llegó así:" , items)
            return items;
            
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }

    let response = await fetchItems();
    console.log("los usuarios, fuera de la petición: ", response)

    const tag = document.getElementById("contenedor-usuarios")
    console.log("etiqueta", tag)
    tag.innerText = response.users[0].name + " " + response.users[0].last + " (" + response.users[0].email + ") "



})();

