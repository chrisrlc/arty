export default function ({ store, redirect }) {
  console.log('in guest middleware')
  console.log(store.state.auth)
  console.log(store.state.auth.user)
  console.log(store.state.auth.loggedIn)
  // TODO: Why isn't store.state.auth set?
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
