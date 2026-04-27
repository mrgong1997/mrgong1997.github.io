# 在能访问 GitHub 时执行：多次重试 push，缓解偶发 reset / 超时
# 可选：先设置代理再运行，例如
#   $env:HTTPS_PROXY = "http://127.0.0.1:7890"
#   .\scripts\push-github-retry.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$max = 8
$sleepSec = 6

# 缓解大包传输中断（若尚未设置）
git config http.version HTTP/1.1 2>$null | Out-Null
git config http.postBuffer 524288000 2>$null | Out-Null

Write-Host "git pull --rebase origin main ..."
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
  Write-Warning "Pull --rebase failed (exit $LASTEXITCODE). Resolve conflicts or check network, then re-run."
  exit $LASTEXITCODE
}

for ($i = 1; $i -le $max; $i++) {
  Write-Host "[$i/$max] git push origin main ..."
  git push origin main
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Push succeeded."
    exit 0
  }
  Write-Warning "Push failed (exit $LASTEXITCODE). Retrying in ${sleepSec}s..."
  Start-Sleep -Seconds $sleepSec
}

Write-Error "Push failed after $max attempts."
exit 1
