const vlajka1 = document.getElementById('vlajka1');
const vlajka2 = document.getElementById('vlajka2');
const vlajka3 = document.getElementById('vlajka3');
const vlajka4 = document.getElementById('vlajka4');
const vlajka5 = document.getElementById('vlajka5');



vlajka1.addEventListener('click', () => { //ostatni
    
    // let jazykOrig = vlajka2.dataset.jazyk;
    // let jazykNovy = vlajka3.dataset.jazyk;
    // let vlajkaOrig = vlajka2.src;
    // let vlajkaNova = vlajka3.src;
  
    // vlajka3.dataset.jazyk = jazykOrig
    // vlajka3.src = vlajkaOrig
  
    // vlajka2.dataset.jazyk = jazykNovy
    // vlajka2.src = vlajkaNova
  
    //jazyk = jazykNovy;
  
    //IndexText(jazykNovy);
  })

  vlajka2.addEventListener('click', () => { //ostatni
    
    let jazykOrig = vlajka1.dataset.jazyk;
    let jazykNovy = vlajka2.dataset.jazyk;
    let vlajkaOrig = vlajka1.src;
    let vlajkaNova = vlajka2.src;
  
    vlajka2.dataset.jazyk = jazykOrig
    vlajka2.src = vlajkaOrig
  
    vlajka1.dataset.jazyk = jazykNovy
    vlajka1.src = vlajkaNova
  
    // jazyk = jazykNovy;
  
    // IndexText(jazykNovy);
  })

  vlajka3.addEventListener('click', () => { //ostatni
    
    let jazykOrig = vlajka1.dataset.jazyk;
    let jazykNovy = vlajka3.dataset.jazyk;
    let vlajkaOrig = vlajka1.src;
    let vlajkaNova = vlajka3.src;
  
    vlajka3.dataset.jazyk = jazykOrig
    vlajka3.src = vlajkaOrig
  
    vlajka1.dataset.jazyk = jazykNovy
    vlajka1.src = vlajkaNova
  
    // jazyk = jazykNovy;
  
    // IndexText(jazykNovy);
  })

  vlajka4.addEventListener('click', () => { //ostatni
    
    let jazykOrig = vlajka1.dataset.jazyk;
    let jazykNovy = vlajka4.dataset.jazyk;
    let vlajkaOrig = vlajka1.src;
    let vlajkaNova = vlajka4.src;
  
    vlajka4.dataset.jazyk = jazykOrig
    vlajka4.src = vlajkaOrig
  
    vlajka1.dataset.jazyk = jazykNovy
    vlajka1.src = vlajkaNova
  
    // jazyk = jazykNovy;
  
    // IndexText(jazykNovy);
  })

  vlajka5.addEventListener('click', () => { //ostatni
    
    let jazykOrig = vlajka1.dataset.jazyk;
    let jazykNovy = vlajka5.dataset.jazyk;
    let vlajkaOrig = vlajka1.src;
    let vlajkaNova = vlajka5.src;
  
    vlajka5.dataset.jazyk = jazykOrig
    vlajka5.src = vlajkaOrig
  
    vlajka1.dataset.jazyk = jazykNovy
    vlajka1.src = vlajkaNova
  
    // jazyk = jazykNovy;
  
    // IndexText(jazykNovy);
  })