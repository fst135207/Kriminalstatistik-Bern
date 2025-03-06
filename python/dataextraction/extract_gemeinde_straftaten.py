import pdfplumber
import pandas as pd

with pdfplumber.open("kbe_pks_2023.pdf") as pdf:

    page = pdf.pages[12]

    table = page.extract_table()
    
    if table:
        # Erstellen eines Dataframe
        df = pd.DataFrame(table[1:], columns=table[0])
        print("Extrahierte Tabelle:")
        print(df.head())
    else:
        # Falls keine Tabelle gefunden wird einfach text extrahieren
        text = page.extract_text()
        # Erstelle ein DataFrame, das den Text in einer Spalte anzeigt
        df = pd.DataFrame([line for line in text.split('\n') if line], columns=["Text"])
        print("Extrahierter Text:")
        print(df.head())