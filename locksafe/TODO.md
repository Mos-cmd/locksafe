# LockSafe — outcome checklist

- [ ] **Owner authentication and action protection**
  - The rightful owner can authenticate to the web portal from another device.
  - Sensitive device actions require step-up verification.
  - Recovery keeps the portal-requested lock state active through ordinary unlock attempts and lets the verified owner request restored access using strong re-authentication.

- [x] **Pre-sign-in read-only demo**
  - From the signed-out screen, allow a visitor to inspect Overview, My devices, Activity, and Recovery guide without authenticating.
  - Clearly label all demo device, location, and activity content as sample-only; the demo must not track or control real devices.
  - Let a visitor return to sign-in without creating an account session or weakening server/API authentication.

- [ ] **Enrolled-device dashboard**
  - List previously enrolled phones and laptops.
  - For each device, show platform, setup readiness, connectivity, and last-seen status.

- [ ] **Lost-device location**
  - Show the latest available position, timestamp, and accuracy.
  - Clearly identify stale or offline location when live location is unavailable.

- [ ] **Lost mode and lock requests**
  - Let the owner mark a selected device as missing and present prerequisites and platform limitations.
  - Before a lock request, show supported-platform checks and require explicit confirmation.
  - Record request timestamps and distinguish pending, delivered, failed, and unsupported states.

- [ ] **Security activity history**
  - Show lock commands, location updates, device-reported unlock attempts or tamper signals, and recovery actions in a security timeline.

- [x] **Honest capability and privacy messaging**
  - Explain that location and remote actions require prior setup, permissions, platform support, connectivity, and cooperation from the device operating system.
  - Do not claim an absolute unbreakable or permanent lock, or present sample/simulated telemetry as live device data.

- [x] **Responsive, accessible urgent-use experience**
  - Support mobile and desktop browsers.
  - Use clear landmarks, headings, labels, keyboard navigation, visible focus, sufficient contrast, and readable status text that does not depend on color alone.
