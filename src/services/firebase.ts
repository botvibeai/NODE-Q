import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  setDoc, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: Required for Firestore Enterprise */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot per Skill requirement
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore is offline or still initializing.');
    }
    return false;
  }
}

// Save or sync user profile
export async function syncUserProfileToFirestore(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  try {
    await setDoc(userRef, {
      userId: user.uid,
      email: user.email || 'unknown@botvibe.ai',
      displayName: user.displayName || 'Executive User',
      photoURL: user.photoURL || '',
      role: 'Corporate Executive (Node Q)',
      lastLoginAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

// Save Chatbot Message to user subcollection
export async function saveChatMessageToFirestore(
  userId: string, 
  message: {
    id: string;
    role: 'user' | 'hermes' | 'system';
    content: string;
    isGroundingUsed?: boolean;
    searchSources?: string;
    hermesKnowledgeLevel?: number;
  }
): Promise<void> {
  const msgRef = doc(db, 'users', userId, 'chatMessages', message.id);
  try {
    await setDoc(msgRef, {
      id: message.id,
      userId,
      role: message.role,
      content: message.content,
      isGroundingUsed: !!message.isGroundingUsed,
      searchSources: message.searchSources || '',
      hermesKnowledgeLevel: message.hermesKnowledgeLevel || 42,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/chatMessages/${message.id}`);
  }
}

// Save Executive Directive to Firestore
export async function saveDirectiveToFirestore(
  userId: string,
  directive: {
    id: string;
    command: string;
    classification: string;
    modelSelected: string;
    outcome: string;
  }
): Promise<void> {
  const directiveRef = doc(db, 'users', userId, 'directives', directive.id);
  try {
    await setDoc(directiveRef, {
      id: directive.id,
      userId,
      command: directive.command,
      classification: directive.classification,
      modelSelected: directive.modelSelected,
      outcome: directive.outcome,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/directives/${directive.id}`);
  }
}
