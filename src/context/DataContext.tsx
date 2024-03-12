//https://api.dictionaryapi.dev/api/v2/entries/en/

import { createContext, useContext, useState } from "react";

type Meaning = {
    definitions: {
        definition: string;
        example?: string;
    }[];
    synonyms: string[];
    antonyms: string[];
};



type DictionaryEntry = {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    meanings: Meaning[];
    phonetics: {
        text: string;
        audio: string;
        sourceUrl: string;
        license: {
            name: string;
            url: string;
        };
    }[];
    sourceUrls: string[];
    license: {
        name: string;
        url: string;
    };
}


type DictionaryContextProps = {
    handleSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    query: string;
    searchResult: DictionaryEntry[] | null;
    isLoading: boolean;
    // children: React.ReactNode;
}

const DataContext = createContext<DictionaryContextProps | undefined>(undefined);

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const DataProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState<DictionaryEntry[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsLoading(true); 
      try {
        const res = await fetch(`${API_URL}/${query}`); 
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setSearchResult(data);
        console.log(searchResult)
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); 
        setQuery('');
      }
};
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <DataContext.Provider value={{
            handleSearch,
            handleChange,
            query,
            searchResult,
            isLoading
        }}>
            {children} 
        </DataContext.Provider>
    );
};

function useData() {
    const context = useContext(DataContext);

    if (context === undefined)
        throw new Error('DataContext was used outside of DataProvider');

    return context;
}

export { DataProvider, useData };
