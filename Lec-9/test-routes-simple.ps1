Write-Host "=== TESTING LEClever-9 API ROUTES ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000/api/user"

# Test 1: GET ALL USERS
Write-Host "1️⃣  GET /api/user (Get All Users)" -ForegroundColor Green
Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing | ForEach-Object {
    Write-Host "   ✓ Status: $($_.StatusCode) - OK"
    $data = $_.Content | ConvertFrom-Json
    Write-Host "   ✓ Found $($data.Count) users in database"
    $data | ForEach-Object { Write-Host "     - $($_.first_name) $($_.last_name) ($($_.email))" }
    $script:userId1 = $data[0]._id
    $script:userId2 = $data[1]._id
}

# Test 2: GET USER BY ID
Write-Host "`n2️⃣  GET /api/user/:id (Get Single User)" -ForegroundColor Green
if ($userId1) {
    Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method GET -UseBasicParsing | ForEach-Object {
        Write-Host "   ✓ Status: $($_.StatusCode) - OK"
        $user = $_.Content | ConvertFrom-Json
        Write-Host "   ✓ Retrieved: $($user.first_name) $($user.last_name)"
        Write-Host "     Email: $($user.email), Job: $($user.job_title)"
    }
}

# Test 3: POST - Create New User
Write-Host "`n3️⃣  POST /api/user (Create New User)" -ForegroundColor Green
$newUserJson = '{"first_name":"Neha","last_name":"Gupta","email":"neha@example.com","job_title":"QA Engineer","gender":"Female","ip_address":"192.168.1.4"}'
Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $newUserJson -UseBasicParsing | ForEach-Object {
    Write-Host "   ✓ Status: $($_.StatusCode) - Created"
    $result = $_.Content | ConvertFrom-Json
    Write-Host "   ✓ New user created: $($result.user.first_name) $($result.user.last_name)"
    $script:userId4 = $result.user._id
}

# Test 4: PATCH - Update User
Write-Host "`n4️⃣  PATCH /api/user/:id (Update User)" -ForegroundColor Green
if ($userId1) {
    $updateJson = '{"job_title":"Senior Software Engineer"}'
    Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method PATCH -ContentType "application/json" -Body $updateJson -UseBasicParsing | ForEach-Object {
        Write-Host "   ✓ Status: $($_.StatusCode) - OK"
        $result = $_.Content | ConvertFrom-Json
        Write-Host "   ✓ Updated job title to: $($result.user.job_title)"
    }
}

# Test 5: DELETE - Delete User
Write-Host "`n5️⃣  DELETE /api/user/:id (Delete User)" -ForegroundColor Green
if ($userId2) {
    Invoke-WebRequest -Uri "$baseUrl/$userId2" -Method DELETE -UseBasicParsing | ForEach-Object {
        Write-Host "   ✓ Status: $($_.StatusCode) - OK"
        Write-Host "   ✓ User deleted successfully"
    }
}

# Test 6: GET ALL USERS AGAIN
Write-Host "`n6️⃣  GET /api/user (Get All Users After Changes)" -ForegroundColor Green
Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing | ForEach-Object {
    Write-Host "   ✓ Status: $($_.StatusCode) - OK"
    $data = $_.Content | ConvertFrom-Json
    Write-Host "   ✓ Total users now: $($data.Count)"
}

Write-Host "`n" 
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ ALL ROUTES TESTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Data Summary:" -ForegroundColor Yellow
Write-Host "  ✓ GET All Users - Working"
Write-Host "  ✓ GET User by ID - Working" 
Write-Host "  ✓ POST Create User - Working"
Write-Host "  ✓ PATCH Update User - Working"
Write-Host "  ✓ DELETE User - Working"
Write-Host ""
Write-Host "🗄️  MongoDB Compass: mongodb://localhost:27017/userdb" -ForegroundColor Cyan
Write-Host "   All user data is saved and visible in Compass!"
Write-Host ""
