import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { envConfig } from '../../dotenv/config';

const firebaseConfig = {
  'type': envConfig.TYPE,
  'project_id': envConfig.PROJECT_ID,
  'private_key_id': envConfig.PRIVATE_KEY_ID,
  'private_key': envConfig.PRIVATE_KEY,
  'client_email': envConfig.CLIENT_EMAIL,
  'client_id': envConfig.CLIENT_ID,
  'auth_uri': envConfig.AUTH_URI,
  'token_uri': envConfig.TOKEN_URI,

  'auth_provider_x509_cert_url': envConfig.AUTH_PROVIDER_X509_CERT_URL,
  'client_x509_cert_url': envConfig.CLIENT_X509_CERT_URL,
  'universe_domain': envConfig.UNIVERSE_DOMAIN,
  'storageBucket': envConfig.STORAGEBUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };