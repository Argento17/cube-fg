$outDir = Join-Path $PSScriptRoot "..\public\partners"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$sources = @{
  "harel.png"       = "https://companieslogo.com/img/orig/HARL.TA_BIG.png"
  "phoenix.png"     = "https://companieslogo.com/img/orig/PHOE.TA_BIG.png"
  "menorah.png"     = "https://companieslogo.com/img/orig/MMHD.TA_BIG.png"
  "migdal.png"      = "https://companieslogo.com/img/orig/MGDL.TA_BIG.png"
  "clal.png"        = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Clal-bit.png/320px-Clal-bit.png"
  "clal.svg"        = "https://upload.wikimedia.org/wikipedia/commons/2/2f/%D7%9C%D7%95%D7%92%D7%95_%D7%9B%D7%9C%D7%9C_%D7%91%D7%99%D7%98%D7%95%D7%97.svg"
  "menorah-wm.jpg"  = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Menora_Mivtachim_Ltd._Logo.jpg/640px-Menora_Mivtachim_Ltd._Logo.jpg"
  "hachshara.png"   = "https://companieslogo.com/img/orig/HACH.TA_BIG.png"
  "meitav.png"      = "https://companieslogo.com/img/orig/MTDS.TA_BIG.png"
  "more.png"        = "https://companieslogo.com/img/orig/MORE.TA_BIG.png"
  "ibi.png"         = "https://companieslogo.com/img/orig/IBI.TA_BIG.png"
  "altshuler.png"   = "https://companieslogo.com/img/orig/ALTF.TA_BIG.png"
  "analyst.png"     = "https://companieslogo.com/img/orig/ANLT.TA_BIG.png"
  "yelin-lapidot.png" = "https://companieslogo.com/img/orig/YLPD.TA_BIG.png"
}

foreach ($entry in $sources.GetEnumerator()) {
  $dest = Join-Path $outDir $entry.Key
  try {
    Invoke-WebRequest -Uri $entry.Value -OutFile $dest -UseBasicParsing -TimeoutSec 30
    $size = (Get-Item $dest).Length
    Write-Host "OK $($entry.Key) ($size bytes)"
  } catch {
    Write-Host "FAIL $($entry.Key): $($_.Exception.Message)"
    if (Test-Path $dest) { Remove-Item $dest -Force }
  }
}
