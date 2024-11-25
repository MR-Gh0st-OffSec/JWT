window.onerror = function (message, source, lineno, colno, error) {
  console.error(`Error: ${message} at ${source}:${lineno}:${colno}`, error);
  const debugBar = document.createElement('div');
  debugBar.style.position = 'fixed';
  debugBar.style.bottom = '0';
  debugBar.style.left = '0';
  debugBar.style.width = '100%';
  debugBar.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
  debugBar.style.color = '#fff';
  debugBar.style.padding = '10px';
  debugBar.innerText = `Error: ${message}`;
  document.body.appendChild(debugBar);
};
