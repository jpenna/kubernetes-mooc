export function buildPage(applicationHash: string, requestHash: string, imageUrl: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
    img { max-width: 100%; height: auto; display: block; margin-top: 1rem; border-radius: 4px; }
  </style>
</head>
<body>
  <p>Application ${applicationHash}. Request ${requestHash}</p>
  <img src="${imageUrl}" alt="Random image from Lorem Picsum" width="1200">
</body>
</html>`;
}
