var translationDictionary = {
	"es" : {
		"Go through images with prev/next buttons below or left/right arrow button":"Desplázate por las imágenes pulsando el botón \"anterior/siguiente\" de debajo o los botones con flechas \"izquierda/derecha\"",
		" Skip screenshots for sites with open bugs":"Sáltate imágenes para sitios con errores abiertos",
		"If you notice an issue that's not reported, please test to check that it's a real issue. You can pre-fill some values in Bugzilla from this form:" : "Si encuentras un fallo que no ha sido reportado, porfavor comprueba que es un fallo real. Puedes pre-rellenar algunos valores en Bugzilla basándote en este formulario:",
		"URL:": "URL:",
		"Type problem:": "Tipo de problema:",
		"sends desktop site to":"envía la página de escritorio a",
		"sends simplified site to":"envía la páginas simplificada a",
		"sends wap content to":"envía contenido wap a",
		"has broken layout in":"tiene el diseño roto en",
		"does not play video in":"no muestra un video en",
		"Summary: ":"Resumen: ",
		"Whiteboard: ": "Pizarra: ",
		"Further comments:": "Comentarios adicionales:",
		"HTTP header check: ": "Comprobar cabecera HTTP: ",
		"Check now": "Comprobar ahora",
		"Send to bugzilla":"Enviar a Bugzilla",
		"Note: click \"Submit bug\" on the next screen to finish reporting the issue.": "Nota: haz click en \"Submit bug\" (\"Enviar fallo\") en la siguiente pantalla para terminar de reportar el problema.",
		"What's this about?": "Así que, ¿de qué va todo esto?",
		"In short: ": "Es sencillo: ",
		"find":"encuentra",
		" sites that give Firefox OS a worse user experience than other smartphones, ":" páginas que ofrezcan en Firefox OS una peor experiencia de usuari que en otro tipo de sistemas operativos y ",
		"report bugs": "reporta los fallos",
		" so that we can follow up. Perhaps you'd like to watch a ": " para que podamos enterarnos. ¿Quizás te gustaría mirar una ",
	    "screencast explaining screenshot reviews": "screencast mostrando distintas imágenes de revisiones",
	    "?": "?",
	    "Cool, how?": "Mola, ¿entonces cómo funciona?",
	    "Scroll through screenshots until you find one where the left and right screenshots look different, the left seems like a worse user experience, and the \"Current bugs\" list is empty.\n\t": "Desplázate a través de distintas imágenes hasta que encuentres una donde las imágenes izquierda y derecha parecen diferentes, la izquierda mostrará una peor experiencia para el usuario, y la lista de \"Errores actuales\" estará vacía.\n\t",
	    "Optionally use the \"HTTP header check\" feature and if the response is interesting, click OK to insert into the form\n\t": "Opcionalmente, usa la opción \"comproación de cabeceras HTTP\" y si la respuesta es interesanteg, haz click en OK para insertarlo en el formulario.\n\t",
	    "Click \"Send to bugzilla\"-button, and on the next page scroll down and click \"Submit bug\". (You will need an account at bugzilla.mozilla.org for this step)\n\t": "Haz click en el botón \"Enviar a Bugzilla\", y en la siguiente página desplázate hacia abajo y haz clock en \"Enviar fallo\". (Necesitarás tener unacuenta creada en bugzilla.mozilla.org para este paso)\n\t",
	    "Go back (two steps) to this page and keep scrolling through screenshots as long as you wish.\n": "Vuelve atrás (dos pasos) a esta página y  desplázate a través de más imágenes para revisar todo lo que quieras.\n",
	    "Gotchas?": "¿Lo entiendes?",
	    "It can be helpful to test on a real Firefox OS phone or an emulator if in doubt..\n\t": "Puede ser de ayuda hacer pruebas en un teléfono con Firefox OS o en un emulador en caso de dudas..\n\t",
	    "If one of the screenshots looks like it didn't load fully, it probably needs manual testing to see if it's an issue. You can ignore those screenshots if you don't have a device\n\t": "Si una de las imágenes parece como si no cargase completamente, probablemente necesite comprobación manual para comprobar si es un problema. Puedes ignorar esas imágenes si no tienes un teléfono.\n\t",
	    "The ": "La lista de ",
	    "current bugs": "Errores actuales",
	    " list is updated every two hours, so you will not see your bug reports appear immediately. (Also if somebody else is reviewing at the same time, you might report duplicate bugs.)\n\t\n": " se actualiza cada dos horas, por lo que no verás tus reportes inmediatamente. (También si dos personas revisan algo a la vez, puedes reportar bugs duplicados.)\n\t\n"
	}

}

/*

There is a helper method getStrings() that will output an array of all strings in the DOM. 
This can be useful to generate translation dictionaries if the text in the markup has been translated.

JSON.stringify(getStrings())

- copy output from both documents, then assign variables like 'en' and 'es' and do:

var dict = {};

for(var i=0; i<en.length; i++)dict[en[i]] = es[i];

JSON.stringify(dict, null, 4)

*/