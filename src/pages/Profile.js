import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from './auth';

export default function Profile() {
    return (
        <div>
      <div id="login">
        <div className="header">
          <h1>Profile</h1>
        </div>
        <form>
          <div className="group">
            <input id="txtEmail" type="email" />
            <label>Email</label>
          </div>
          <div className="group">
            <input id="txtPassword" type="password" />
            <label>Password</label>
          </div>
          <button id="btnLogin" type="button" className="button buttonBlue">
            Log in
          </button>
          <button id="btnSignup" type="button" className="button buttonBlue">
            Sign up
          </button>
        </form>
      </div>

      <div id="app">
        <div className="header">
          <h1>Sign up / Sign in</h1>
        </div>
        <form>
          <div className="group">
            <div id="lblAuthState" className="authlabel"></div>
          </div>
          <button id="btnLogout" type="button" className="button buttonBlue">
            Log out
          </button>
        </form>
      </div>
    </div>
    );
}