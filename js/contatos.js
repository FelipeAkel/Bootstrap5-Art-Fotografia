// Validação do Formulário do Bootstrap
(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


// Recuperando dados de endereço via CEP
const retornoCepNaoEncontrado = document.getElementById('retornoCepNaoEncontrado');

$("#nr_cep").blur(function () {
    var nr_cep = $(this).val().replace(/\D/g, '');
    if (nr_cep != "") {
        var validaCep = /^[0-9]{8}$/;
        if (validaCep.test(nr_cep)) {
            $("#ds_logradouro").val(" Carregando... ");
            $("#ds_bairro").val(" Carregando... ");
            $("#ds_localidade").val(" Carregando... ");
            $("#ds_uf").val(" Carregando... ");
            $.getJSON("https://viacep.com.br/ws/" + nr_cep + "/json/?callback=?", function (dados) {
                if (!("erro" in dados)) {
                    $("#ds_logradouro").val(dados.logradouro);
                    $("#ds_bairro").val(dados.bairro);
                    $("#ds_localidade").val(dados.localidade);
                    $("#ds_uf").val(dados.uf.toUpperCase());
                    retornoCepNaoEncontrado.style.display = 'none';
                }
                else {
                    $("#ds_logradouro").val("");
                    $("#ds_bairro").val("");
                    $("#ds_localidade").val("");
                    $("#ds_uf").val("");
                    retornoCepNaoEncontrado.innerText = `CEP ${nr_cep} não encontrado de forma automatizada digite manualmente ou tente novamente.`;
                    retornoCepNaoEncontrado.style.display = 'block';
                    // alert("CEP não encontrado de forma automatizado digite manualmente ou tente novamente.");
                }
            });
        }
    }
});