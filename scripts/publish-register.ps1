param(
    [switch]$Push
)

try {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
    $repoRoot = Resolve-Path (Join-Path $scriptDir '..')
    Set-Location $repoRoot
} catch {
    Write-Error "No se pudo determinar la carpeta del repositorio. Ejecuta el script desde la raíz del repo."; exit 1
}

$frontend = Join-Path $repoRoot 'frontend'
$public = Join-Path $frontend 'public'
$register = Join-Path $frontend 'register'

if (-not (Test-Path $register)) {
    Write-Error "No se encontró la carpeta de registro: $register. Comprueba la estructura del proyecto."; exit 1
}

if (-not (Test-Path $public)) {
    New-Item -ItemType Directory -Path $public | Out-Null
}

Write-Host "Limpiando el contenido actual de: $public" -ForegroundColor Yellow
Get-ChildItem -Path $public -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Copiando carpeta de registro: $register → $public" -ForegroundColor Cyan
Copy-Item -Path (Join-Path $register '*') -Destination $public -Recurse -Force

$candidate1 = Join-Path $public 'register\index.html'
$candidate2 = Join-Path $register 'index.html'
$destIndex = Join-Path $public 'index.html'

if (Test-Path $candidate1) {
    Copy-Item -Path $candidate1 -Destination $destIndex -Force
    Write-Host "Copiado: register/index.html → frontend/public/index.html" -ForegroundColor Green
} elseif (Test-Path $candidate2) {
    Copy-Item -Path $candidate2 -Destination $destIndex -Force
    Write-Host "Copiado: register/index.html → frontend/public/index.html" -ForegroundColor Green
} else {
    Write-Host "No se encontró un index.html dentro de register. Asegúrate de tener un archivo de entrada." -ForegroundColor Yellow
}

New-Item -Path (Join-Path $public '.nojekyll') -ItemType File -Force | Out-Null

Write-Host "Contenido final en: $public" -ForegroundColor Cyan
Get-ChildItem -Path $public -Recurse | Select-Object FullName, Length

if ($Push) {
    Write-Host "Realizando git add/commit/push..." -ForegroundColor Cyan
    git add frontend/public
    try {
        git commit -m "Deploy: publicar solo la página de registro en frontend/public" --quiet
    } catch {
        Write-Host "No se creó commit (posible: no hay cambios)." -ForegroundColor Yellow
    }
    git push origin main
    Write-Host "Push finalizado. Revisa Actions/Pages en GitHub." -ForegroundColor Green
} else {
    Write-Host "No se realizó push. Ejecuta el script con -Push para commitear y subir automáticamente." -ForegroundColor Yellow
}
