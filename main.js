// Guardando Variables en Nodos
const inputTexto = document.querySelector("#add-task-text");
const inputBoton = document.querySelector("#add-task-button");
const listaTareas = document.querySelector(".task-list");

let saveDataList = JSON.parse(localStorage.getItem("savedList")) || [];

// Creando Nueva Tarea
inputBoton.addEventListener("click", () => {

    if (inputTexto.value.length > 0){

        setTask({ texto: inputTexto.value, done: false });
        saveLocalStorage();

        // Limpia el Input
        inputTexto.value = "";
    };
});


inputTexto.addEventListener("keypress", (keyPress) => {
    if (keyPress.key === "Enter" && inputTexto.value.length > 0){

        setTask({ texto: inputTexto.value, done: false });
        saveLocalStorage();

        // Limpia el Input
        inputTexto.value = "";
    }
});



// botones de "Tarea Lista" y "Eliminar Tarea"
listaTareas.addEventListener("click", (event) => {

    if(event.target.classList.contains("check")){
        const element = event.target.parentElement;
        const elementText = element.querySelector("span").textContent;
        const index =  saveDataList.findIndex((textToFind) => {
            return textToFind.texto === elementText;
        });

        console.log(index);

        saveDataList[index].done = event.target.checked;
        element.classList.toggle("done");
        saveLocalStorage();
    };

    if(event.target.classList.contains("erase")){
        const element = event.target.parentElement;
        const elementText = element.querySelector("span").textContent;
        const elementIndex = saveDataList.findIndex((textToFind) => {
            return textToFind.texto === elementText;
        });
        
        saveDataList.splice(elementIndex, 1);
        element.remove();
        saveLocalStorage();
    };
    
});


const setTask = (nodeText, skipSave = false) => {
    // Aqui se Crea el elemento li
    const listItems = document.createElement("li");
    listItems.classList.add("task");

    // Aqui se crea el boton check
    const checkButton = document.createElement("input");
    checkButton.classList.add("check");
    checkButton.setAttribute("type", "checkbox");
    checkButton.checked = nodeText.done;

    if(nodeText.done){
        listItems.classList.add("done");
    };
    // Aqui se crea el boton erase
    const eraseButton = document.createElement("input");
    eraseButton.classList.add("erase");
    eraseButton.setAttribute("type", "button");
    eraseButton.setAttribute("value", "X");

    // Aqui se guarda el texto escrito en el input
    const textContainer = document.createElement("span");
    textContainer.textContent = nodeText.texto;

    // Aqui se arma el "li"
    listItems.append(checkButton);
    listItems.append(textContainer);
    listItems.append(eraseButton);

    // Aqui se Agrega a la lista de tareas  
    listaTareas.appendChild(listItems);
    if (!skipSave) saveDataList.push(nodeText);
};

// Funciones de Guardar
const saveLocalStorage = () => {
    localStorage.setItem("savedList", JSON.stringify(saveDataList));
};

const loadLocalStorage = () => {
    saveDataList.forEach((element) => {
        setTask(element, true);
    });
};

loadLocalStorage();