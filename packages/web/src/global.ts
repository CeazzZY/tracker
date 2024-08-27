class Global {
  listenRouteChange(callback: any) {
    window.addEventListener('hashchange', callback);
  }

  send() {}

  listenError() {}
}

export default Global;
