# Specification: CV Download Command

Implementation plan for a new terminal command to download the CV with a progress animation.

## Commands
- `cv`
- `curriculum`

## Behavior
1. User types `cv` or `curriculum`.
2. A progress bar animation starts, simulating an `npm install` style progress.
3. The animation lasts approximately 2.5 seconds.
4. Upon reaching 100%, the browser opens the download dialog for `/profile.pdf`.
5. A success message is displayed in the terminal.

## Technical Details
- **Component**: `DownloadAnimation` inside `TerminalWindow.tsx`.
- **State Management**: Local state for progress (0-100) and status messages.
- **Trigger**: `useEffect` with `setInterval` to increment progress.
- **File Source**: `/public/profile.pdf`.
- **Download Name**: `curriculo-clodoaldo-dantas.pdf`.

## Visual Design
- Progress bar: `[##########----------] 50%`
- Colors: `dracula-cyan` for the progress, `dracula-comment` for the background.
- Status messages:
    - "Fetching curriculum..."
    - "Verifying integrity..."
    - "Starting download..."
    - "Success! Your download should start shortly."
