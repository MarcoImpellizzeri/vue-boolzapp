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
                            message: "Ah scusa!",
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
                            message: "Si, ma preferirei andare al cinema",
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
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Amy",
                    avatar: "img/amy.webp",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
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
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                
            ],selectedContact: null
        }
    },
    mounted() {
        // Controlla se ci sono contatti nell'array
        if (this.contact.length > 0) {
            // Imposta il primo contatto come contatto selezionato di base
            this.selectedContact = this.contact[0];
        }
    },
    methods: {
        selectContact(contact) {
            // Memorizza il contatto selezionato
            this.selectedContact = contact; 
            console.log(contact);
        },
        // newMessage(selectContact) {
        //     const messageNew = { ...this.selectContact.messages}
        //     this.selectContact.messages.push(messageNew)
        //     console.log(messageNew)
        // },
    },
}).mount("#app")
