import { HiSpeakerWave } from "react-icons/hi2";
import { useData } from "../context/DataContext";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

function SearchDisplay() {
    const { searchResult, isLoading } = useData();
    const [audioUrl, setAudioUrl] = useState('');

    
    useEffect(() => {
      if (!isLoading && searchResult && searchResult.length > 0) {
          const firstEntry = searchResult[0];
          const phonetics = firstEntry.phonetics;
          if (phonetics && phonetics.length > 0) {
              setAudioUrl(phonetics[0].audio);
          }
      }
  }, [searchResult, isLoading]);

    if (isLoading) return <Spinner />;
    
    if (!searchResult || searchResult === undefined || searchResult.length === 0) {
        return <div className="text-center my-3">No results found yet.</div>;
    }

    const firstEntry = searchResult[0]; 

    const handlePlayAudio = () => {
      if (audioUrl) {
          const audioElement = new Audio(audioUrl);
          audioElement.play();
      }
  };


    return (
        <div>
            <div className="flex justify-between mt-6">
                <h2 className="text-2xl font-semibold">{firstEntry.word}</h2>
                {audioUrl && (
                    <HiSpeakerWave className="text-2xl cursor-pointer" onClick={handlePlayAudio} />
                )}
            </div>
            <div className="my-3">
                <p>{firstEntry.phonetic}</p>
                <p className="italic">{firstEntry.partOfSpeech}</p>
            </div>
            <p className="my-3">{firstEntry.meanings[0].definitions[0].definition}</p>
            <div className="bg-white rounded-md py-3 px-2 my-2">
                <span>Antonyms: {firstEntry.meanings[0]?.antonyms.join(', ')}</span>
            </div>
            {/* {firstEntry.meanings.map((meaning, index) => ( */}
                <div className="bg-white rounded-md py-3 px-2 my-2">
                    <span>Synonyms: {firstEntry.meanings[0].synonyms.join(', ')}</span>
                </div>
            {/* ))} */}
            <div className="bg-white rounded-md py-3 px-2 my-2">
                <span>Example(s): {firstEntry.meanings[0]?.definitions[0]?.example}</span>
            </div>
        </div>
    );
}

export default SearchDisplay;
