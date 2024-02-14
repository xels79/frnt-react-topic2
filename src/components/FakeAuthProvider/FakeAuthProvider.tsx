/**
 * This represents some generic auth provider API, like Firebase.
 */

class FakeAuthProvider{
    static isAuthenticated = false;
    static signin(callback: VoidFunction) {
        FakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    }
    static signout(callback: VoidFunction) {
        FakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
}

export { FakeAuthProvider };