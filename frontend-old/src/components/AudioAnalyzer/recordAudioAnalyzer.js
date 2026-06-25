export function getSupportedMimeType() {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4;codecs=mp4a.40.2",
    "audio/ogg;codecs=opus",
  ];
  for (const c of candidates) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported(c)) return c;
  }
  return ""; // let browser decide or fail
}

export function createRecorder({ mimeType, timeslice = 250, onStop } = {}) {
  let mediaRecorder = null;
  let stream = null;
  let chunks = [];

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Microphone access not supported in this browser.");
    }
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const chosenMime =
      (mimeType &&
        (MediaRecorder.isTypeSupported?.(mimeType) ? mimeType : null)) ||
      getSupportedMimeType();

    mediaRecorder = chosenMime
      ? new MediaRecorder(stream, { mimeType: chosenMime })
      : new MediaRecorder(stream);

    chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const type = mediaRecorder.mimeType || "audio/webm";
      const blob = new Blob(chunks, { type });
      // Stop tracks
      try {
        stream?.getTracks?.().forEach((t) => t.stop());
      } catch {}
      stream = null;
      if (typeof onStop === "function") {
        onStop(blob);
      }
    };

    mediaRecorder.start(timeslice);
  }

  function stop() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  }

  return { start, stop };
}
