// Nom : 
// Prénom : 
// Groupe :

(() => {
    const app = {
        numLoad: 100,
        num: 1,
        ol: document.getElementById('app'),
        animationTime: 300,
        listElements: document.querySelectorAll('ol li'),
        isPrime: (num) => {
            if (num <= 1){
                return false;
            } else {
                for (let i = 2; i < num; i++) {
                    if (num % i === 0) {
                        return false;
                    }
                }
                return true;
            }
        },
        createList: (times, baseNum) => {
            for (let i = 1; i <= times; i++) {
                let text = '';
                let sum = 0
                if (app.isPrime(baseNum)) {
                    sum = 0;
                    for (let j = 0; j <= baseNum; j++) {
                        sum += j;
                    }
                    text = `<li data-sum="${sum}" class="premier grid__item">${baseNum}<div class="ribbon-wrapper"><div data-text="somme" class="ribbon">premier</div></div></li>`;
                } else if (baseNum % 3 === 0) {
                    if (baseNum % 9 === 0) {
                        text = `<li class="multiple-3-9 grid__item">${baseNum}<div class="ribbon-wrapper"><div class="ribbon">3 et 9</div></div></li>`
                    }else {
                        text = `<li class="multiple-3 grid__item">${baseNum}<div class="ribbon-wrapper"><div class="ribbon">3</div></div></li>`;
                    }
                }else {
                    text = `<li class="grid__item">${baseNum}</li>`;
                }
                app.ol.insertAdjacentHTML('beforeend', text);
                baseNum +=2;
            }
            let primes = document.querySelectorAll('ol > li.premier');
            let primeDiv;
            app.listElements = document.querySelectorAll('ol li');
            for (const prime of primes) {
                prime.addEventListener('click', () => {
                    primeDiv = prime.querySelector('[data-text]');
                    prime.classList.add('animate');
                    [prime.dataset.sum, prime.childNodes[0].textContent] = [prime.childNodes[0].textContent, prime.dataset.sum];
                    [primeDiv.dataset.text, primeDiv.textContent] = [primeDiv.textContent, primeDiv.dataset.text];
                    for (const listElement of app.listElements) {
                        listElement.classList.add('grid__item--lighter')
                    }
                    setTimeout(() => {
                        prime.classList.remove('animate');
                        for (const listElement of app.listElements) {
                            listElement.classList.remove('grid__item--lighter')
                        }
                    }, app.animationTime);
                })
            }
        },
        init: () => {
            document.documentElement.classList.add('js-enabled');
            app.createList(app.numLoad, app.num);
            window.addEventListener('scroll', () => {
                if(document.documentElement.scrollHeight <= window.scrollY+window.innerHeight) {
                    this.listElements = document.querySelectorAll('ol li')
                    app.createList(app.numLoad, parseInt(app.listElements[app.listElements.length-1].childNodes[0].textContent));
                }
            })
        }
    }
app.init()  ;
})()





