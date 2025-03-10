"""
Wir beginen zuerst mit einem GET-Request von der API-Schnittstelle von Swisstopo für das erhaltenn der Daten.
https://data.opendatasoft.com/explore/dataset/georef-switzerland-kanton
"""
import requests

def get_map_data():
    url = "/api/explore/v2.1/catalog/datasets/georef-switzerland-kanton@public/records?refine=kan_name%3A%22Bern%22"

    try:
        # GET-Request an den API Endpoint
        response = requests.get(url)

        # Checken ob der Request erfolgreich war
        if response.status.code == 200:
            map_data = response.json()
            return map_data
        else:
            print("Error: " + response.status.code)
            return None
        
# Wir fügen eine Expectetion hinzu damit wir fehler die mit dem Netzwerk zu tuen haben ausfiltern können
    except requests.exceptions.RequestException as e:
        print("Error: " + e)
        return None
    

def main():
    map_data = get_map_data()
    


