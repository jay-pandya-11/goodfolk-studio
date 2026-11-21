/**
 * test-inprocess.js — In-Process API Route Verification (Zero Network/Sockets)
 *
 * Simulates HTTP requests directly against Express's router pipeline.
 * Works 100% inside sandboxed environments without opening any network ports.
 */
const app = require('./src/app');
const http = require('http');
const { Readable } = require('stream');

function testRequest(app, method, url, body = null, headers = {}) {
  return new Promise((resolve) => {
    const payload = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const stream = payload ? Readable.from([Buffer.from(payload)]) : Readable.from([]);

    const req = Object.assign(stream, {
      method,
      url,
      headers: {
        'content-type': 'application/json',
        host: 'localhost',
        ...(payload ? { 'content-length': Buffer.byteLength(payload) } : {}),
        ...headers,
      },
      connection: { remoteAddress: '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    });

    let responseData = '';
    let statusCode = 200;
    const responseHeaders = {};

    const res = new http.ServerResponse(req);
    res.writeHead = (code, hdrs) => {
      statusCode = code;
      if (hdrs) Object.assign(responseHeaders, hdrs);
      return res;
    };
    res.status = (code) => {
      statusCode = code;
      return res;
    };
    res.setHeader = (k, v) => {
      responseHeaders[k.toLowerCase()] = v;
      return res;
    };
    res.getHeader = (k) => responseHeaders[k.toLowerCase()];
    res.write = (chunk) => {
      responseData += chunk;
      return true;
    };
    res.end = (chunk) => {
      if (chunk) responseData += chunk;
      let parsed = null;
      try {
        parsed = JSON.parse(responseData);
      } catch {
        parsed = responseData;
      }
      resolve({ status: statusCode, data: parsed, raw: responseData });
    };

    app(req, res);
  });
}

async function run() {
  console.log(`\n======================================================`);
  console.log(`🧪 In-Process API Suite (Testing All 10 Route Handlers)`);
  console.log(`======================================================\n`);

  const tests = [
    {
      name: 'GET /api/health',
      desc: 'Health check reports unavailable database',
      method: 'GET',
      url: '/api/health',
      expectedStatus: 503,
      validate: (r) => r.data && r.data.success === false && r.data.database === 'disconnected',
    },
    {
      name: 'POST /api/auth/login',
      desc: 'Validation catches empty login payload',
      method: 'POST',
      url: '/api/auth/login',
      body: {},
      expectedStatus: 400,
      validate: (r) => r.data && r.data.success === false && Array.isArray(r.data.errors),
    },
    {
      name: 'GET /api/auth/profile',
      desc: 'Auth middleware blocks unauthenticated request',
      method: 'GET',
      url: '/api/auth/profile',
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'PUT /api/auth/change-password',
      desc: 'Auth middleware blocks password change without token',
      method: 'PUT',
      url: '/api/auth/change-password',
      body: { currentPassword: '123', newPassword: '456' },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/contacts',
      desc: 'Validation catches empty contact submission',
      method: 'POST',
      url: '/api/contacts',
      body: {},
      expectedStatus: 400,
      validate: (r) => r.data && r.data.success === false && Array.isArray(r.data.errors),
    },
    {
      name: 'GET /api/contacts',
      desc: 'Admin middleware protects contact inquiries',
      method: 'GET',
      url: '/api/contacts',
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/services',
      desc: 'Admin middleware protects service creation',
      method: 'POST',
      url: '/api/services',
      body: { title: 'New Service' },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/projects',
      desc: 'Admin middleware protects project creation',
      method: 'POST',
      url: '/api/projects',
      body: { title: 'New Project' },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/blog',
      desc: 'Admin middleware protects blog post creation',
      method: 'POST',
      url: '/api/blog',
      body: { title: 'New Post' },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/testimonials',
      desc: 'Admin middleware protects testimonial creation',
      method: 'POST',
      url: '/api/testimonials',
      body: { clientName: 'Test' },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'GET /api/newsletter/subscribers',
      desc: 'Admin middleware protects newsletter subscriber list',
      method: 'GET',
      url: '/api/newsletter/subscribers',
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'PUT /api/site-settings',
      desc: 'Admin middleware protects site settings update',
      method: 'PUT',
      url: '/api/site-settings',
      body: { settings: [] },
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'POST /api/upload/image',
      desc: 'Admin middleware protects image upload',
      method: 'POST',
      url: '/api/upload/image',
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
    {
      name: 'GET /api/admin/dashboard',
      desc: 'Admin middleware protects dashboard statistics',
      method: 'GET',
      url: '/api/admin/dashboard',
      expectedStatus: 401,
      validate: (r) => r.data && r.data.success === false,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const res = await testRequest(app, t.method, t.url, t.body);
      const isStatusOk = res.status === t.expectedStatus;
      const isDataOk = t.validate ? t.validate(res) : true;

      if (isStatusOk && isDataOk) {
        console.log(`✅ PASS: ${t.method} ${t.url} [HTTP ${res.status}] - ${t.desc}`);
        passed++;
      } else {
        console.error(`❌ FAIL: ${t.method} ${t.url} - Expected HTTP ${t.expectedStatus}, got ${res.status}`);
        console.error('Response:', res.data);
        failed++;
      }
    } catch (err) {
      console.error(`❌ ERROR: ${t.method} ${t.url} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 Summary: ${passed} Passed, ${failed} Failed out of ${tests.length} tests`);
  console.log(`======================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

run();
