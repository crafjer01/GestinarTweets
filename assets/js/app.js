
(function(){
	
	//propiedades privadas
	const tweets 		= document.querySelector('#lista-tweets');
	const formulario 	= document.querySelector('#formulario');
	
	
	//Metodos privadas
	const crearElement = function(element, value, attributes = new Map()){
		let el = document.createElement(element);
		el.textContent = value;
		for(attribute of attributes){
			el.setAttribute(attribute[0], attribute[1]);
		}
		return el;
	};
	
	const fadeIn = function(elemento){
		elemento.style.opacity = '0';
	
		setTimeout(function(){elemento.remove();}, 500);
		
	}
	
	const obtenerTweetsLocalStorage = function(tweet){
		let tweets = [];
		let tweetsLocalStorage = localStorage.getItem('tweets');
		
		if(localStorage.getItem('tweets') !== null){
			tweets = JSON.parse(localStorage.getItem('tweets') );
		}
		
		return tweets;
	}
	
	const borrarTweetLocalStorage = function(tweet){
		let tweets = obtenerTweetsLocalStorage();
		
		//remover la X
		let tweetBorrar;
		tweetBorrar = tweet.substr(0, tweet.length - 1);
		console.log(tweetBorrar);
		
		tweets.forEach(function(tweet, index){
			if(tweet === tweetBorrar){
				tweets.splice(index, 1);
			}
		});
		
		localStorage.setItem('tweets', JSON.stringify(tweets));
		
	}
	
	const agregarTweetLocalStorage = function(tweet){
		let tweets = obtenerTweetsLocalStorage();
		tweets.push(tweet);
		localStorage.setItem('tweets', JSON.stringify(tweets));
	}
	
	const crearLista = function(tweet){
		if(tweet) {
			//crear elemento li
			let listAttr = new Map();
			listAttr.set('class', 'list');
			let li = crearElement('li', tweet, listAttr);

			//crear elemento a
			let btnAttr = new Map();
			btnAttr.set('class', 'borrar-tweet');
			let btnBorrar = crearElement('a', 'X', btnAttr);

			li.appendChild(btnBorrar);
			tweets.appendChild(li);
		}
	}

	const agregarTweet =  function(e){
		e.preventDefault();

		//leer el tweet desde el textarea
		let tweet = document.querySelector('#tweet').value;

		crearLista(tweet);
		
		//agregar tweets to LocalStorage
		agregarTweetLocalStorage(tweet);

		
	};
	
	const borrarTweet = function(e){
		e.preventDefault();
		
		let elemento = e.target;
		
		if(elemento.classList.contains('borrar-tweet')){
			fadeIn(elemento.parentElement);
			borrarTweetLocalStorage(elemento.parentElement.textContent);
		}
		
	}
	
	const cargarLista = function(){
		let tweets = obtenerTweetsLocalStorage();
		tweets.forEach(function(tweet){
			crearLista(tweet);
		});
	}
	
	const enviarFormulario =  function (){
		
		//agregar tweet
		formulario.addEventListener('submit', agregarTweet);
		
		//borrando tweet
		tweets.addEventListener('click', borrarTweet);
		
		//contenido cargado
		document.addEventListener('DOMContentLoaded', cargarLista);
		
	}; 
	
	//init
	enviarFormulario();

	
})();

