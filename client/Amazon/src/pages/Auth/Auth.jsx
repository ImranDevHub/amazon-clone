import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../utils/action.type';
import { auth } from '../../utils/firebase';
import './auth.css';

function Auth() {
  const { state, dispatch } = useContext(MyContext);
  //   console.log(state);
  const { user } = state;
  console.log(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState({ signIn: false, signUp: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      setIsLoading(loading => ({ ...loading, signIn: true }));
      setError('');
      if (!email.trim() || !password.trim())
        throw new Error('Opps! You miss Your email or Password （︶^︶）');

      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userInfo);
      const user = userInfo.user;
      dispatch({ type: Type.SET_USER, user });
      setIsLoading(loading => ({ ...loading, signIn: false }));
      navigate('/');
    } catch (err) {
      setIsLoading(loading => ({ ...loading, signIn: true }));

      // console.error(err);
      setError(
        err.message
          .replace('Firebase:', '')
          .replace('(', '')
          .replace(').', '')
          .replace('Error', '')
          .trim()
      );
      setIsLoading(loading => ({ ...loading, signIn: false }));
    }
  };

  const handleSignUp = async function () {
    try {
      setIsLoading(loading => ({ ...loading, signUp: true }));

      setError('');
      if (!email.trim() || !password.trim())
        throw new Error('Opps! You miss Your email or Password （︶^︶）');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      // console.log(userCredential);
      dispatch({ type: Type.SET_USER, user });
      setEmail('');
      setPassword('');
      setIsLoading(loading => ({ ...loading, signUp: false }));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      setIsLoading(loading => ({ ...loading, signUp: true }));

      // console.error(err);
      setError(
        err.message
          .replace('Firebase:', '')
          .replace('(', '')
          .replace(').', '')
          .replace('Error', '')
          .trim()
      );
      setIsLoading(loading => ({ ...loading, signUp: false }));
    }
  };
  //   console.log(isLoading);

  return (
    <>
      <section className="d-flex justify-content-center bg-white">
        <div className="auth d-flex align-items-center flex-column">
          <Link to="/">
            <span className="icon-other amazon-logo-bk my-4"></span>
          </Link>
          {error && (
            <div className="border border-2 border-danger rounded rounded-4 shadow auth__error mb-5 unselected">
              <div className="d-flex px-5 py-3">
                <span className="icon-other caution me-4 col-1"></span>
                <div className="col-11">
                  <span className="text-danger fs-3 ">There was a problem</span>
                  <div>{error}</div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`border border-2 auth__signin px-5 py-4 rounded rounded-4 shadow${
              error ? ' border-danger' : ''
            }`}
          >
            <div className=" fs-1">Sign in</div>
            <form className="" onSubmit={handleSubmit}>
              <label htmlFor="email" className="form-label mt-3 fw-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control p-2 fs-4"
                value={email}
                onChange={e => setEmail(() => e.target.value)}
              />
              <label htmlFor="password" className="form-label fw-bold mt-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control p-2 fs-4"
                value={password}
                onChange={e => setPassword(() => e.target.value)}
              />

              <button className="btn w-100 fs-4 btn-warning mt-3 rounded-4 size">
                {isLoading.signIn ? (
                  <OrbitProgress
                    variant="track-disc"
                    speedPlus="-2"
                    easing="ease-in-out"
                    size="small"
                    style={{ fontSize: '5px' }}
                    color="#fff"
                    dense
                  />
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="fs-5 mt-3 border-bottom pb-4">
              <span>
                By continuing, you agree to Amazon&apos;s
                <a href="#" className="link">
                  Conditions of Use
                </a>{' '}
                and{' '}
                <a className="link" href="#">
                  Privacy Notice
                </a>
                .
              </span>
              <span className="mt-3">
                ▶
                <a href="#" className="link">
                  {' '}
                  Need help?
                </a>
              </span>
            </div>
            <div className="mt-3 fs-5">
              <span className="fw-bold">Buying for work?</span>
              <div>
                <a href="#" className="link">
                  shop on Amazon Business
                </a>
              </div>
            </div>
          </div>
          <div className="auth__new">
            <span className="fs-5 auth__create">New to Amazon?</span>
            <button
              className="w-100 btn btn-light mt-4 p-2 border fs-5 rounded rounded-4 shadow-sm size"
              onClick={handleSignUp}
            >
              {isLoading.signUp ? (
                <OrbitProgress
                  variant="track-disc"
                  speedPlus="-2"
                  easing="ease-in-out"
                  size="small"
                  style={{ fontSize: '5px' }}
                  color="#000"
                  dense
                />
              ) : (
                ' Create your Amazon account'
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Auth;
