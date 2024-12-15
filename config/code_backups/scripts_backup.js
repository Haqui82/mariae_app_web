// Asegurarse de que el DOM esté completamente cargado antes de añadir event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Lógica para habilitar/deshabilitar el botón "Comprar Ahora" basado en las casillas de verificación
    document.querySelectorAll('.productCheckbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const buyNowBtn = document.getElementById('buyNowBtn');
        if (document.querySelectorAll('.productCheckbox:checked').length > 0) {
          buyNowBtn.classList.remove('disabled');
          buyNowBtn.classList.add('enabled');
        } else {
          buyNowBtn.classList.remove('enabled');
          buyNowBtn.classList.add('disabled');
        }
      });
    });
  });
  
  // Lógica al hacer clic en el botón "Comprar Ahora"
  document.getElementById('buyNowBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción predeterminada del enlace
    if (!this.classList.contains('disabled')) {
      window.location.href = '#purchaseSection';
      document.getElementById('purchaseForm').style.display = 'block';
    }
  });
  
  // Resto del código original
  document.getElementById('contactUsButton').addEventListener('click', function() {
    window.location.href = '#contactSection';
    document.getElementById('socialMediaLinks').style.display = 'block';
    document.getElementById('contactForm').style.display = 'block';
  });
  
  document.getElementById('viewAllProductsButton').addEventListener('click', function() {
    window.location.href = '#productGallery';
  });
  
  document.getElementById('seeMoreButton').addEventListener('click', function() {
    window.location.href = '#moreOptions';
    document.getElementById('moreOptions').style.display = 'block';
  });
  
  document.getElementById('submitContactFormButton').addEventListener('click', function(event) {
    event.preventDefault();
    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      message: document.getElementById('contactMessage').value
    };
    fetch('http://localhost:10000/servicios/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Mensaje enviado exitosamente');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  document.getElementById('subscribeButton').addEventListener('click', function(event) {
    event.preventDefault();
    const subscriberData = {
      email: document.getElementById('subscribeEmail').value
    };
    fetch('http://localhost:10000/servicios/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Suscripción exitosa');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
    const loginData = {
      username: document.getElementById('loginUsername').value,
      password: document.getElementById('loginPassword').value
    };
    fetch('http://localhost:10000/servicios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'profile.html';
      } else {
        alert('Error en el inicio de sesión');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  