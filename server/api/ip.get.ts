import * as os from 'os';

 function getLocalIP(): string {
  const networkInterfaces = os.networkInterfaces();
  let localIP = '';

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];

    for (const interfaceInfo of networkInterface ?? []) {
      // Skip over non-IPv4 and internal (i.e., 127.0.0.1) addresses
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        localIP = interfaceInfo.address;
        break;
      }
    }

    if (localIP) {
      break;
    }
  }

  return localIP;
}

//function get user agent

export default defineEventHandler(async (event) => {
    // get ip

    return {
      status: 200,
      ip: getLocalIP(),
      user_agent: event.req.headers['user-agent'],
    }
  });