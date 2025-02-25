---
title: "Some Playwright Tests Were Skipped"
---
## Skipped Tests Detected

Some tests were **skipped** during the latest Playwright test execution.

📌 **Details:**
- **Workflow:** `${{ github.workflow }}`
- **Status:** `${{ job.status }}`
- **Commit SHA:** `${{ github.sha }}`
- **Triggered By:** `${{ github.event_name }}`

📝 **Skipped Tests Summary:**
⚠️ **Skipped:** `${{ steps.playwright-tests.outputs.skipped }}`

📎 **Attachments:**  
[📄 Download Playwright Test Report](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})

