dispatchEvent(new CustomEvent("single-file-user-script-init"));

addEventListener("single-file-on-before-capture-request", () => {
  if (!globalThis.window.wrappedJSObject.jwplayer) {
    return;
  }

  if (!globalThis.document) {
    return;
  }

  const jwplayer = globalThis.window.wrappedJSObject.jwplayer;
  const document = globalThis.document;

  document.querySelectorAll(".jwplayer").forEach((element) => {
    const jwplayerInstance = jwplayer(element);
    const playlistItme = jwplayerInstance.getPlaylistItem();
    if (!playlistItme) {
      return;
    }
    const file = playlistItme.file;
    if (!file) {
      return;
    }
    const audioElement = document.createElement("audio");
    audioElement.setAttribute("controls", true);
    audioElement.setAttribute("src", file);
    element.replaceWith(audioElement);
  });
});
