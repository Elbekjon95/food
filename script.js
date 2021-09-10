  const product = {
    plainBurger:{
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    },
    freshBurger:{
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    },
    freshCombo:{
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    }
    
  }
  
  
  const extraProduct ={
    doubleMayonnaise:{
      name: 'Двойной майонез',
      price: 500,
      kcall: 50 
    },
    
    lettuce:{
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    
    cheese:{
        name: 'Сыр',
        price: 1000,
        kcall: 60
    }
  }
  
  const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
  const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
  const addCart = document.querySelector('.addCart');
  const reciptOut = document.querySelector('.receipt__window-out');
  const reciptWindow = document.querySelector('.receipt__window');
  const reciptBtn = document.querySelector('.receipt__window-btn');
  const receipt = document.querySelector('.receipt');
  
  
  //// + -- - 
  
  for(let i = 0; i < btnPlusOrMinus.length; i++){
    btnPlusOrMinus[i].addEventListener('click', function() {
        plusOrMinus(this)
    })
  }
  
  function plusOrMinus(element) {
     // console.log(element);
     
     let parentId = element.closest('.main__product').getAttribute('id');
     //console.log(parentId);
     let out = element.closest('.main__product').querySelector('.main__product-num');
     let price = element.closest('.main__product').querySelector('.main__product-price span');
     let kcall = element.closest('.main__product').querySelector('.main__product-call span');
     
     
     if(element.getAttribute('data-symbol') == '+' && product[parentId].amount < 5){
        product[parentId].amount++;
     }
     
    else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0){
        product[parentId].amount--;
     }
     
     out.innerHTML = product[parentId].amount;
     price.innerHTML = product[parentId].summ;
     kcall.innerHTML = product[parentId].Kcall;
  }
  
  /* ////////////////////////////////////////////////////////////////// */
  
  for(let i = 0; i < checkExtraProduct.length; i++){
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    });
  }
  
  
  function addExtraProduct(el) {
      const parent = el.closest('.main__product');
      const parentId = parent.getAttribute('id');
      
     product[parentId][el.getAttribute('data-extra')] = el.checked;
     
     const kcall = parent.querySelector('.main__product-call span'),
            price = parent.querySelector('.main__product-price span'),
            elDataInfo = el.getAttribute('data-extra');
     
     
     if(product[parentId][elDataInfo] == true){
         product[parentId].kcall += extraProduct[elDataInfo].kcall;
         product[parentId].price += extraProduct[elDataInfo].price;
     }
     else{
        product[parentId].kcall -= extraProduct[elDataInfo].kcall;
        product[parentId].price -= extraProduct[elDataInfo].price;
     }
     
     kcall.innerHTML = product[parentId].Kcall;
     price.innerHTML = product[parentId].summ;
     
     
  }
  
  let arrProduct = [];
  let totalName = '';
  let totalPrice = 0;
  let totalKcall = 0;
  
  
  
  addCart.addEventListener('click', function() {
      
    for(const key in product){
        const productObj = product[key];
        
        if(productObj.amount > 0){
            arrProduct.push(productObj);
            
            for(const newKey in productObj){
                if(productObj[newKey] === true){
                    productObj.name += ' \n ' +  '  \n  ' + extraProduct[newKey].name;
                }
            }
        }
        productObj.price = productObj.summ;
        productObj.kcall = productObj.Kcall;
        
    }
    
    for(let i = 0; i < arrProduct.length; i++){
        const el = arrProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += el.name;
    }
    
    reciptOut.innerHTML = `Вы купили \n  \n  ${totalName}  \n  \n  Калларийность ${totalKcall}  \n  \n Сума ${totalPrice} сумм`;
    
    
    receipt.style.display = 'flex';
    receipt.style.opacity = '1';
    reciptWindow.style.top = '0';
    
  })