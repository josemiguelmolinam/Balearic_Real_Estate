import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google User:', user);

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
      console.error(error);
    }
  }

  return (
    <div className='mt-6'>
      <button
        type='button'
        onClick={onGoogleClick}
        className='w-full block bg-white hover:bg-gray-300 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 mb-4'
      >
        <div className='flex items-center justify-center'>
          <FcGoogle className='w-6 h-6' />
          <span className='ml-4'>Sign in with Google</span>
        </div>
      </button>
    </div>
  );
};

export default OAuth;
