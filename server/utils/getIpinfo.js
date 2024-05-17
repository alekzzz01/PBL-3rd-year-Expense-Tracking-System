// utils/getClientIp.js
export function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
    
    // Normalize IPv6 loopback address to IPv4
    if (ip && ip.includes('::ffff:')) {
      return ip.split('::ffff:')[1];
    }
  
    return ip;
  }
  