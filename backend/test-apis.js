/**
 * test-apis.js — Automated API Route Verification Script
 *
 * Starts the Express app on a dynamic port and tests all route modules,
 * verifying that public, validation, and protected routes respond correctly.
 */
const http = require('http');
const app = require('./src/app');

async function runTests() {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`\n======================================================`);
  console.log(`🧪 Starting Goodfolk Studio Backend API Tests on port ${port}`);
  console.log(`======================================================\n`);

  const tests = [
    // 1. Health Check (Public)
    {
      name: 'GET /api/health (Health check)',
      url: `${baseUrl}/api/health`,
      method: 'GET',
      expectedStatus: 503,
      verify: (data) => data.success === false && data.database === 'disconnected',
    },

    // 2. Auth: Login Validation (Public, expects 400 on empty body)
    {
      name: 'POST /api/auth/login (Validation: empty payload should return 400)',
      url: `${baseUrl}/api/auth/login`,
      method: 'POST',
      body: {},
      expectedStatus: 400,
      verify: (data) => data.success === false && Array.isArray(data.errors),
    },

    // 3. Auth: Protected Route without Token (Expects 401)
    {
      name: 'GET /api/auth/profile (Security: missing token should return 401)',
      url: `${baseUrl}/api/auth/profile`,
      method: 'GET',
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 4. Contact: Submit Validation (Public, expects 400 on empty body)
    {
      name: 'POST /api/contacts (Validation: empty payload should return 400)',
      url: `${baseUrl}/api/contacts`,
      method: 'POST',
      body: {},
      expectedStatus: 400,
      verify: (data) => data.success === false && Array.isArray(data.errors),
    },

    // 5. Contact: Admin listing without token (Expects 401)
    {
      name: 'GET /api/contacts (Security: unauthorized access should return 401)',
      url: `${baseUrl}/api/contacts`,
      method: 'GET',
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 6. Services: Admin create without token (Expects 401)
    {
      name: 'POST /api/services (Security: unauthorized create should return 401)',
      url: `${baseUrl}/api/services`,
      method: 'POST',
      body: { title: 'Test Service' },
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 7. Projects: Admin create without token (Expects 401)
    {
      name: 'POST /api/projects (Security: unauthorized create should return 401)',
      url: `${baseUrl}/api/projects`,
      method: 'POST',
      body: { title: 'Test Project' },
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 8. Blog: Admin create without token (Expects 401)
    {
      name: 'POST /api/blog (Security: unauthorized create should return 401)',
      url: `${baseUrl}/api/blog`,
      method: 'POST',
      body: { title: 'Test Post' },
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 9. Testimonials: Admin create without token (Expects 401)
    {
      name: 'POST /api/testimonials (Security: unauthorized create should return 401)',
      url: `${baseUrl}/api/testimonials`,
      method: 'POST',
      body: { clientName: 'Test Client' },
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 10. Newsletter: Admin subscribers list without token (Expects 401)
    {
      name: 'GET /api/newsletter/subscribers (Security: unauthorized list should return 401)',
      url: `${baseUrl}/api/newsletter/subscribers`,
      method: 'GET',
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 11. Site Settings: Admin update without token (Expects 401)
    {
      name: 'PUT /api/site-settings (Security: unauthorized update should return 401)',
      url: `${baseUrl}/api/site-settings`,
      method: 'PUT',
      body: { settings: [] },
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 12. Upload: Admin upload without token (Expects 401)
    {
      name: 'POST /api/upload/image (Security: unauthorized upload should return 401)',
      url: `${baseUrl}/api/upload/image`,
      method: 'POST',
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 13. Dashboard: Admin stats without token (Expects 401)
    {
      name: 'GET /api/admin/dashboard (Security: unauthorized dashboard should return 401)',
      url: `${baseUrl}/api/admin/dashboard`,
      method: 'GET',
      expectedStatus: 401,
      verify: (data) => data.success === false,
    },

    // 14. 404 Route handling (Unknown route)
    {
      name: 'GET /api/unknown-endpoint (Routing: unknown route handling)',
      url: `${baseUrl}/api/unknown-endpoint`,
      method: 'GET',
      expectedStatus: 404,
      verify: () => true,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const options = {
        method: test.method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const res = await fetch(test.url, options);
      let data = {};
      try {
        data = await res.json();
      } catch {
        // non-JSON response
      }

      const statusMatch = res.status === test.expectedStatus;
      const verifyMatch = test.verify ? test.verify(data, res) : true;

      if (statusMatch && verifyMatch) {
        console.log(`✅ PASS: ${test.name} -> HTTP ${res.status}`);
        passed++;
      } else {
        console.error(`❌ FAIL: ${test.name} -> Expected ${test.expectedStatus}, got ${res.status}`);
        console.error('Response data:', data);
        failed++;
      }
    } catch (err) {
      console.error(`❌ ERROR: ${test.name} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed out of ${tests.length} tests`);
  console.log(`======================================================\n`);

  server.close();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
