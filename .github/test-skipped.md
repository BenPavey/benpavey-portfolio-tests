## ⚠️ Playwright Tests Skipped!

Some Playwright tests were **skipped**.

📌 **Details:**
- **Workflow:** `${{ github.workflow }}`
- **Status:** `${{ job.status }}`
- **Commit SHA:** `${{ github.sha }}`
- **Triggered By:** `${{ github.event_name }}`
- **Duration:** `${{ steps.playwright-tests.outputs.duration }}`

📝 **Summary:**
✅ **Pass:** `${{ steps.playwright-tests.outputs.passed }}`
⚠️ **Skipped:** `${{ steps.playwright-tests.outputs.skipped }}`

📎 **Attachments:**
[Download Playwright Test Report](../../actions/artifacts)
