function startClassification() //função para poder usar o audio do microfone
{
  navigator.mediaDevices.getUserMedia({ audio: true});
   //armazenando o modelo de audio criado do teachable machine
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/FhD4R5iz0/model.json', modelReady);
}

function modelReady(){
  //irá comparar o audio do microfone com o modelo criado
  classifier.classify( gotResults); //gotResults conterá o resultado da comparação
}

function gotResults(error, results) { //resultado da comparação
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    random_number_r = Math.floor(Math.random() * 255) + 1;
    //Math.floor aredonda os valores
    //Math.random gera um número aleatório entre 0 e 1
    // multiplicamos por 255 para ter o seguinte resultado:
    // 0.2 * 255 = 51 etc.
    // adicionamos + 1 cqso o valor gerado seja 0 para que ele comece do 1.
    random_number_g = Math.floor(Math.random() * 255) + 1;
    random_number_b = Math.floor(Math.random() * 255) + 1;

    //pegamos o resultado 0 pois é o mais preciso.
    document.getElementById("result_label").innerHTML = 'Posso ouvir - '+ results[0].label;

    //o confidence está dentro do indice zero do resultado, multiplicamos por 100 para o resultado vir em porcentagem
    //para limitar  os numeros decimais aplicamos o toFixed e passamos a quantidade de numeros decimais que desejamos após a virgula
    document.getElementById("result_confidence").innerHTML = 'Precisão - '+ (results[0].confidence*100).toFixed(2)+" %";

    //atribuindo o RGB aleatório para o label do resultado
    document.getElementById("result_label").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";

    //atribuindo o RGB aleatório para a porcentagem do resultado
    document.getElementById("result_confidence").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";

    //armazenando todos os aliens em variáveis para utiliza-las mais tarde
    img = document.getElementById('alien1') 
    img1 = document.getElementById('alien2')
    img2 = document.getElementById('alien3')


    //se resultado é igual a "caixa" entoa 1 dos aliens vira gif e os outros imagem fixa
    if (results[0].label == "Palmas") {
      img.src = 'aliens-01.gif';
      img1.src = 'aliens-02.png';
      img2.src = 'aliens-03.png';
    } else if (results[0].label == "Vidro") {
      img.src = 'aliens-01.png';
      img1.src = 'aliens-02.gif';
      img2.src = 'aliens-03.png';
    } else if (results[0].label == "Escova") {
      img.src = 'aliens-01.png';
      img1.src = 'aliens-02.png';
      img2.src = 'aliens-03.gif';
    } else{
      img.src = 'aliens-01.png';
      img1.src = 'aliens-02.png';
      img2.src = 'aliens-03.png';
    }
  }
}

//https://teachablemachine.withgoogle.com/models/LI4JRgIRk/
