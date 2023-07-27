'use strict'

// Milestone 1
// - Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// - Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
// nome e immagine di ogni contatto

// Milestone 2
// - Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
// messaggi relativi al contatto attivo all’interno del pannello della conversazione
// - Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// - Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
// “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// - Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// - Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina)

// Milestone 5 - opzionale
// - Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato

// Consigli utili:
// - Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella
// lista dei contatti
// - I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
// - Per gestire le date, può essere utile la libreria Luxon

Vue.createApp({
    data() {
        return {
            selectedContact: null,
            newMessageObj: {
                date: "28/03/2020 10:20:10",
                message: "",
                status: "sent",
            },
            contact: [
                {
                    name: "Sheldon",
                    avatar: 'img/sheldon.jpeg',
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Sei pronto per andare al negozio dei trenini?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Dai scendi, ti aspetto in macchina",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Si, solo un momento devo finire di disinfettare la camera",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Howard",
                    avatar: "img/Howard.webp",
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            message: "Ciao, tutto bene i bambini?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            message: "Bene grazie! Stasera ci vediamo a casa mia?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            message: "Mi piacerebbe ma devo portare sheldon al negozio dei trenini",
                            status: "sent",
                        },
                    ],
                },
                {
                    name: "Penny",
                    avatar: "img/penny.jpg",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicura di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa tesoro",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Rajesh",
                    avatar: "img/Rajesh.webp",
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Si, ma preferirei andare al cinema. C'e` un film con Sandra Bullock",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Stuart",
                    avatar: "img/Stuart.jpg",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "Sono arrivati i tuoi fumetti in fumetteria",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Grazie Stuart, passo piu tardi",
                            status: "sent",
                        },
                    ],
                },
                {
                    name: "Amy",
                    avatar: "img/amy.webp",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "Sheldon e` impazzito!",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Si lo so",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Bernadette",
                    avatar: "img/Bernadette.webp",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "Sai dov'e` Howard?",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Non ne ho idea, sara` con Raji",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Molto probabilmete hai ragione",
                            status: "received",
                        },
                    ],
                },
            ],
            search: "",
        }
    },
    beforeMount() {
        // Imposta il primo contatto come contatto selezionato di base
        this.selectedContact = this.contact[0];
    },
    // si usa "computed:" per creare funzioni che ritornano un calcolo
    computed: {
        filteredContacts() {
            // creazione di un nuovo array filtrato basato sull'array contact usando ".filter"
            // quando filtra prende un singolo elemento dell'array "this.contact" rinominato "contactElement"
            // e controlla se il suo ".nome" contiene la stringa inserita nella barra di ricerca ".includes(this.search)" 
            // (convertendo tutto in lettere minuscole)
            return this.contact.filter(contactElement => contactElement.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    },
    methods: {
        selectContact(oneContact) {
            // Memorizza il contatto selezionato
            this.selectedContact = oneContact;
            console.log(oneContact);
        },
        newMessage() {
            // creo una costante che ha tutto il contenuto di "newMessageObj"
            const inputMessage = { ...this.newMessageObj };
            // modifico la data del messaggio inviato usando
            // "new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()"
            // che fa comparire sia la data attuale che l'ora attuale
            inputMessage.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
            // push sull'array selectedContact.messages che e` 
            // l'array di messaggi della chat selezionata
            this.selectedContact.messages.push(inputMessage);
            // reset del campo di input dopo il push
            this.newMessageObj.message = "";
            // do un tempo per la risposta e richiamo replyMessage
            setTimeout(this.replyMessage, 1500);
            // si usa "this.$nextTick" per far si che lo scroll del container a cui ho dato
            // 'ref="msgsContainer"' si posiozioni in basso in base all'altezza del container
            this.$nextTick(() => {
                this.$refs.msgsContainer.scrollTop = this.$refs.msgsContainer.scrollHeight;
            });
            // uso setTimeout che fa la stessa cosa di "this.$nextTick"
            // cosi da rifarlo alla risposta del messaggio
            setTimeout(() => {
                this.$refs.msgsContainer.scrollTop = this.$refs.msgsContainer.scrollHeight;
            }, 1500);
        },
        replyMessage() {
            // creo nella funzione una costante che sarebbe 
            // l'oggetto del messaggio
            const replyObj = {
                // inserisco la data e l'ora attuale anche nel messaggio di risposta
                date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                message: "Bazinga!",
                status: "received",
            };
            // e lo pusho all'interno dell'array
            this.selectedContact.messages.push(replyObj);
        },
        searchContacts() {
            if (this.search === "") {
                // Se la barra di ricerca è vuota, restituisce tutti i contatti
                return this.contact;
            } else {
                // Restituisce i contatti filtrati in base all'input
                return this.filteredContacts;
            };
        },
        // metodo per prendere l'ultimo messagio nell'array "messages"
        getLastMessage(messages) {
            // se l'array message ha almento un elemento
            if (messages.length > 0) {
                // assegna a "lastMessage" l'ultimo elemento dell'array messages 
                const lastMessage = messages[messages.length - 1];
                // ritorna il "message" dell'ultimo elemento dell'array "messages"
                return lastMessage.message;
            }
            // altrimenti ritorna stringa vuota
            return " ";
        }
    }
}).mount("#app")
