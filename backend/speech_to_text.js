import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const assemblyApiKey = process.env.assembly_apikey;
const assemblyApiUrl = "https://api.assemblyai.com/v2";
const apiHeaders = {
    'authorization': assemblyApiKey,
    'content-type': 'application/json',
};
const getTranscription = async (audioUrl) => {
    console.log("Submitting audio file for transcription...");
    const body = {
        "audio_url": audioUrl,
        "disfluencies": true,
        "sentiment_analysis": true,
        "punctuate": true,
        "format_text": true,
        "speech_model": "universal"
    };

    try {

        const response = await axios.post(
            `${assemblyApiUrl}/transcript`,
            body,                         
            { headers: apiHeaders }         
        );
        
        const transcriptId = response.data.id;
        console.log(`Successfully submitted! Transcript ID: ${transcriptId}`);
        return transcriptId;

    } catch (error) {
        console.error('Error submitting transcription:', error.response ? error.response.data : error.message);
        throw error;
    }
};
const getdata = async (transcriptId) => {
    const pollingEndpoint = `${assemblyApiUrl}/transcript/${transcriptId}`;

    console.log("Polling for results...");
    
    while (true) {
        try {
            const pollingResponse = await axios.get(pollingEndpoint, { headers: apiHeaders });
            const transcriptionResult = pollingResponse.data;

            if (transcriptionResult.status === "completed") {
                console.log("Transcription complete!");
                return transcriptionResult;
            } else if (transcriptionResult.status === "error") {
                throw new Error(`Transcription failed: ${transcriptionResult.error}`);
            } else {
                console.log(`Job status: ${transcriptionResult.status}. Waiting 3 seconds...`);
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error('Error polling for transcription:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};
export { getTranscription, getdata };