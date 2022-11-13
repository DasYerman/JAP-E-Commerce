(() => {    
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
            localStorage.setItem("user", username.value);
            localStorage.setItem("pass", password.value);
            event.preventDefault();
            window.location.href = 'index.html'
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


