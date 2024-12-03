let currentImages = [];
let currentIndex = 0;
let isZoomed = false; // Variable para rastrear si la imagen está en zoom

document.getElementById('modalImage').addEventListener('click', function (event) {
    const image = event.target;

    if (!isZoomed) {
        // Obtener las dimensiones y posición del clic dentro de la imagen
        const rect = image.getBoundingClientRect();
        const offsetX = event.clientX - rect.left; // Posición del clic en el eje X
        const offsetY = event.clientY - rect.top;  // Posición del clic en el eje Y
        const scale = 3; // Nivel de zoom

        // Ajustar la transformación para hacer zoom en el área clicada
        image.style.transformOrigin = `${(offsetX / rect.width) * 100}% ${(offsetY / rect.height) * 100}%`;
        image.style.transform = `scale(${scale})`;
        image.classList.add('zoomed');
        isZoomed = true;
    } else {
        // Restaurar el tamaño original de la imagen
        image.style.transform = 'scale(1)';
        image.classList.remove('zoomed');
        isZoomed = false;
    }
});

// Abre el modal
function openModal(imageElement) {
  const images = imageElement.getAttribute('data-images').split(',');

  currentImages = images;
  currentIndex = 0;

  // Mostrar la primera imagen
  updateModalImage();

  // Mostrar flechas solo si hay más de una imagen
  document.querySelector('.prev').style.display = images.length > 1 ? 'block' : 'none';
  document.querySelector('.next').style.display = images.length > 1 ? 'block' : 'none';

  // Mostrar el modal
  document.getElementById('imageModal').style.display = 'flex';
}

function updateModalImage() {
  const modalImage = document.getElementById('modalImage');

  // Restablecer el zoom antes de actualizar la imagen
  resetZoom(modalImage);

  // Cambiar la fuente de la imagen
  modalImage.src = currentImages[currentIndex];
}

function resetZoom(image) {
  image.style.transform = 'scale(1)';
  image.classList.remove('zoomed');
  isZoomed = false;
}

// Cierra el modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Navegar a la imagen anterior
function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    updateModalImage();
  }
}

// Navegar a la siguiente imagen
function nextImage() {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    updateModalImage();
  }
}


