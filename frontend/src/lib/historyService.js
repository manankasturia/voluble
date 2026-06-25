import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Firestore layout:
 *   analyses/{autoId}
 *     uid:                string   (Firebase Auth uid — owner)
 *     fileName:            string
 *     createdAt:           server timestamp
 *     words_per_minute:    number
 *     confidence_score:    number
 *     filler_word_count:   number
 *     transcript:          string
 *     summary_review:      string
 *     full:                object   (the raw `analysis` object, for re-opening later)
 */

const COLLECTION = "analyses";

export async function saveAnalysis(uid, { fileName, analysis }) {
  if (!uid) return null; // logged-out users never persist — caller should already guard this
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      uid,
      fileName,
      createdAt: serverTimestamp(),
      words_per_minute: analysis.words_per_minute ?? null,
      confidence_score: analysis.confidence_score ?? null,
      filler_word_count: analysis.filler_word_count ?? null,
      transcript: analysis.transcript ?? "",
      summary_review: analysis.summary_review ?? "",
      full: analysis,
    });
    return docRef.id;
  } catch (err) {
    // Saving history should never block showing the user their results —
    // log and swallow rather than throwing back into the analysis pipeline.
    console.error("Failed to save analysis history:", err);
    return null;
  }
}

export async function fetchHistory(uid, max = 20) {
  if (!uid) return [];
  try {
    const q = query(
      collection(db, COLLECTION),
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        fileName: data.fileName,
        createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
        words_per_minute: data.words_per_minute,
        confidence_score: data.confidence_score,
        filler_word_count: data.filler_word_count,
        transcript: data.transcript,
        summary_review: data.summary_review,
        full: data.full,
      };
    });
  } catch (err) {
    console.error("Failed to fetch analysis history:", err);
    return [];
  }
}