import nltk
import os

def download_nltk_data():
    """
    Downloads NLTK data to a standard location during the build process.
    This ensures the data is available in the final image/environment
    without relying on runtime downloads that can fail/corrupt.
    """
    # Set NLTK data path to a local directory that persists or is part of the package
    # In Render, standard paths might be read-only at runtime, but okay at build time.
    # We will trust the default path handling or set a specific one if needed.
    
    resources = ["punkt", "punkt_tab", "stopwords"]
    print(f"Downloading NLTK resources: {resources}...")
    
    for resource in resources:
        try:
            nltk.download(resource, quiet=False)
            print(f"Successfully downloaded {resource}")
        except Exception as e:
            print(f"Error downloading {resource}: {e}")
            raise e # Fail the build if we can't download

if __name__ == "__main__":
    download_nltk_data()
