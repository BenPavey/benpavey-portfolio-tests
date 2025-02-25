---
title: "✅ Playwright Tests Passed!"
labels: ["automated-test"]
assignees: ["BenPavey"]
---

## ✅ Playwright Tests Passed!

The scheduled Playwright test run has **successfully completed**.

📌 **Details:**
- **Workflow:** `${{ github.workflow }}`
- **Status:** `${{ job.status }}`
- **Commit SHA:** `${{ github.sha }}`
- **Triggered By:** `${{ github.event_name }}`

📝 **Summary:**
✅ **Pass:** `${{ steps.playwright-tests.outputs.passed }}`
⚠️ **Skipped:** `${{ steps.playwright-tests.outputs.skipped }}`

📎 **Attachments:**  
[📄 Download Playwright Test Report](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}/artifacts)

---
