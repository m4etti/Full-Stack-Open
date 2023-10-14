```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: Käyttäjä kirjoittaa tekstikenttään ja painaa tallenna-nappia
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (lomakkeen lähetys)
    activate server
    server-->>browser: HTTP statuskoodi 302 (redirect)
    deactivate server
    
    Note right of browser: Selain saa redirect-vastauksen ja tekee uuden GET-pyynnön osoitteeseen /notes
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML documenti (muistiinpanosivu)
    deactivate server
    
    Note right of browser: Muistiinpanosivu ladataan uudelleen, jolloin tarvittavat tiedostot ladataan
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser:  css tiedosto 
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser:  JavaScript tiedosto 
    deactivate server

    Note right of browser: Selain suorittaa javaScript koodin joka hakee JSON:n palvelimelta
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ] (muistiinpanojen raakadata)
    deactivate server
    
    Note right of browser: Selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanosivun joka on nyt päivitetty uudella muistiinpanolla
