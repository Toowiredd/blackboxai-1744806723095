import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { extractEntitiesWithAI } from '../api/openRouterApi';

// Helper function to get current ISO date-time string
const getCurrentDateTime = () => new Date().toISOString();

const IncidentForm = ({ addIncident }) => {
  const { register, handleSubmit, reset } = useForm();
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiError, setAiError] = useState('');
  const recognitionRef = useRef(null);

  // For triple tap detection
  const tapTimesRef = useRef([]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice-to-text is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-AU';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptPiece + ' ');
        } else {
          interimTranscript += transcriptPiece;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  // Triple tap handler to start voice recording
  useEffect(() => {
    const handleTap = () => {
      const now = Date.now();
      tapTimesRef.current = tapTimesRef.current.filter(t => now - t < 1000);
      tapTimesRef.current.push(now);
      if (tapTimesRef.current.length >= 3) {
        if (!isRecording) {
          startRecording();
        }
        tapTimesRef.current = [];
      }
    };

    window.addEventListener('click', handleTap);

    return () => {
      window.removeEventListener('click', handleTap);
    };
  }, [isRecording]);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      alert('Voice recording started (triggered by triple tap)');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    setAiError('');
    try {
      const aiEntities = await extractEntitiesWithAI(data.details + ' ' + transcript);
      const incident = {
        id: Date.now(),
        date: getCurrentDateTime(),
        description: data.details + ' ' + transcript,
        individuals: aiEntities.individuals || [],
        location: aiEntities.locations ? (Array.isArray(aiEntities.locations) ? aiEntities.locations.join(', ') : aiEntities.locations) : '',
        incidentDate: aiEntities.dates ? (Array.isArray(aiEntities.dates) ? aiEntities.dates.join(', ') : aiEntities.dates) : '',
        actions: aiEntities.actions || [],
        assets: aiEntities.assets || [],
      };
      addIncident(incident);
      reset();
      setTranscript('');
    } catch (error) {
      console.error('AI extraction error:', error);
      setAiError('Failed to process incident with AI. Please try again or enter details manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="bg-white p-4 rounded shadow mb-6" tabIndex={0}>
      <h2 className="text-xl font-semibold mb-2">Log New Incident</h2>
      {aiError && <p className="text-red-600 mb-2">{aiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="details" className="block font-medium mb-1">
            Incident Details
          </label>
          <textarea
            id="details"
            {...register('details', { required: true })}
            rows={5}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Describe the incident here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        <div className="flex items-center space-x-4">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={isProcessing}
            >
              Start Voice-to-Text
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              disabled={isProcessing}
            >
              Stop Voice-to-Text
            </button>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Save Incident'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default IncidentForm;
