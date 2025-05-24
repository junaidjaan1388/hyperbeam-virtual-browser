const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect({
    proto: 'tcp',  // TCP protocol for RDP-like access
    addr: 3389,    // Standard RDP port (or your preferred port)
    authtoken: process.env.NGROK_AUTH_TOKEN,
    region: 'us'   // Choose closest region
  });
  
  console.log('RDP Access URL:', url.replace('tcp://', ''));
})();
