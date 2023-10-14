```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: Käyttäjä kirjoittaa tekstikenttään ja painaa tallenna-nappia

    Note right of browser: Päivitetään näkymä ilman sivun uudelleenlatausta muokkaamalla DOM:ia JavaScriptillä. <br>Uusi sisältö otetaan formista.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
    activate browser
    activate server

    Note right of browser: Pyyntö sisältää JSON-muodossa olevan uuden muistiinpanon

    server-->>browser: HTTP statuskoodi 201 (created)
    deactivate server
    
    
