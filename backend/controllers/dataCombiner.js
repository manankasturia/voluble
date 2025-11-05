function combineData(assemblyData, volumeData) {
  
  const full_transcript = assemblyData.text;

  const word_analysis = assemblyData.words.map(word => {
    return {
      text: word.text,
      start_ms: word.start,
      end_ms: word.end
    };
  });

  const sentiment = assemblyData.sentiment_analysis_results.map(s => {
    return {
      sentiment: s.sentiment,
      text: s.text
    };
  });
  const userAudioData = {
    full_transcript: full_transcript,
    word_analysis: word_analysis,
    pitchHz: volumeData.pitchHz, 
    volume: volumeData.volume,  
    amplitudes: volumeData.amplitudes, 
    pauses: volumeData.pauses,       
    metrics: volumeData.metrics, 
    sentiment: sentiment
  };

  return userAudioData;
}

export { combineData };