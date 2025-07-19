# libreria
Libreria è il posto in cui consultare e scaricare liberamente tutti i documenti (tecnici-amministrativi) relativi al mondo arbitrale della pallacanestro!

# Utilizzo e configurazione

Accessibile su: [https://udc-tv.github.io/libreria/](https://udc-tv.github.io/libreria/)

## Sito

Root di pubblicazione: `\docs`. Tutto quello che è presente nel repository, esterno a questa cartella, non è direttamente pubblicabile nel sito.

## Struttura

- `\docs\publish`: cartella con i documenti PDF da pubblicare. Un documentoo all'interno potrebbe essere raggiunto anche in assenza del relativo _link_ sulla pagina HTML ("_path-traversal_").
- `\docs\posts`: contiene i post pubblicati. Il formato dei file dovrebbe essere preferibilmente `.html` o `.md`.
- `\docs\index.html`: landing page del sito web. Deve contenere la lista ordinata dei documenti PDF pubblicati.
