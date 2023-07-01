//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//eventos
cargarEventListeners();
function cargarEventListeners(){
  //cuando agregas un curso dando click en agregar-carrito
    listaCursos.addEventListener('click', agregarCurso);

  //elimina curso del carrito 
  carrito.addEventListener('click', eliminarCurso); 
  
  //vacia el carrito

  vaciarCarritoBtn.addEventListener('click', ()=>{
     articulosCarrito = [];
     limpiarHtml();
  })

   
};





//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
    
};

//elimina curso carrito
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
  // console.log(articulosCarrito);
  carritoHtml();
  }
  
}

//lee el contenido html al que le demos click  y extrae el contenido 

function leerDatosCurso(curso){
    // console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){
      const curso = articulosCarrito.map(curso =>{
        if(curso.id === infoCurso.id){
          curso.cantidad ++;
          return curso;
        }else{
          return curso;
        }
      });
      articulosCarrito = [...curso];
    }else{
      articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(infoCurso);

   

    carritoHtml();


}

//muestra el html


 function carritoHtml(){

   limpiarHtml();

     articulosCarrito.forEach( curso => {
      const {imagen, titulo, precio, id, cantidad} = curso;

       const row = document.createElement('tr');
       
       
       row.innerHTML = `
         <td>
           <img src="${imagen}" width="100px">
         </td>
         <td>${titulo}</td>
         <td>${precio}</td>
         <td>${cantidad}</td>
         <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
         </td>

       
       `;

     //agrega el html del carrito en el tbody
       contenedorCarrito.appendChild(row);

     });
    
 }

 //limpia el html del carrito

 function limpiarHtml(){
    //forma lenta
    // contenedorCarrito.innerHTML = "";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
 }
